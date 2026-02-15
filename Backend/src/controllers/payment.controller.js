import prisma from '../config/database.js';
import {
  createStripeCustomer,
  createCheckoutSession,
  cancelStripeSubscription,
  resumeStripeSubscription,
  createCustomerPortalSession,
  constructWebhookEvent
} from '../config/stripe.js';

/**
 * @route   POST /api/payments/create-checkout-session
 * @desc    Create Stripe checkout session
 * @access  Private
 */
export const createCheckout = async (req, res) => {
  try {
    const { planId, billingInterval } = req.body; // billingInterval: 'monthly' or 'annual'

    // Get plan details
    const plan = await prisma.plan.findUnique({
      where: { id: planId }
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }

    // Determine which Stripe Price ID to use
    let stripePriceId;
    if (billingInterval === 'monthly') {
      stripePriceId = plan.stripePriceIdMonthly;
    } else {
      stripePriceId = plan.stripePriceId; // Annual by default
    }

    if (!stripePriceId) {
      return res.status(400).json({
        success: false,
        message: `Plan does not have Stripe ${billingInterval || 'annual'} price ID configured`
      });
    }

    // Get or create Stripe customer
    let subscription = await prisma.subscription.findUnique({
      where: { userId: req.user.id }
    });

    let customerId = subscription?.stripeCustomerId;

    if (!customerId) {
      const customer = await createStripeCustomer(req.user);
      customerId = customer.id;
    }

    // Create checkout session
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const session = await createCheckoutSession({
      customerId,
      priceId: stripePriceId,
      userId: req.user.id,
      planName: plan.name,
      successUrl: `${frontendUrl}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${frontendUrl}/subscription/cancel`
    });

    res.json({
      success: true,
      data: {
        sessionId: session.id,
        url: session.url
      }
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating checkout session',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/payments/create-portal-session
 * @desc    Create Stripe customer portal session
 * @access  Private
 */
export const createPortal = async (req, res) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.user.id }
    });

    if (!subscription || !subscription.stripeCustomerId) {
      return res.status(404).json({
        success: false,
        message: 'No subscription found'
      });
    }

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const session = await createCustomerPortalSession(
      subscription.stripeCustomerId,
      `${frontendUrl}/subscription`
    );

    res.json({
      success: true,
      data: {
        url: session.url
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating portal session',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/payments/webhook
 * @desc    Handle Stripe webhooks
 * @access  Public (verified by Stripe signature)
 */
export const stripeWebhook = async (req, res) => {
  const signature = req.headers['stripe-signature'];

  try {
    const event = constructWebhookEvent(req.body, signature);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Webhook handler functions
async function handleCheckoutCompleted(session) {
  const userId = session.metadata.userId;
  const planName = session.metadata.planName;

  const plan = await prisma.plan.findUnique({
    where: { name: planName }
  });

  if (!plan) return;

  // Update or create subscription
  await prisma.subscription.upsert({
    where: { userId },
    update: {
      planId: plan.id,
      status: 'ACTIVE',
      stripeCustomerId: session.customer,
      stripeSubscriptionId: session.subscription,
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
    },
    create: {
      userId,
      planId: plan.id,
      status: 'ACTIVE',
      stripeCustomerId: session.customer,
      stripeSubscriptionId: session.subscription,
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    }
  });
}

async function handleSubscriptionCreated(subscription) {
  const userId = subscription.metadata.userId;
  
  if (!userId) return;

  const plan = await prisma.plan.findFirst({
    where: { stripePriceId: subscription.items.data[0].price.id }
  });

  if (!plan) return;

  await prisma.subscription.upsert({
    where: { userId },
    update: {
      status: 'ACTIVE',
      stripeSubscriptionId: subscription.id,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000)
    },
    create: {
      userId,
      planId: plan.id,
      status: 'ACTIVE',
      stripeCustomerId: subscription.customer,
      stripeSubscriptionId: subscription.id,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000)
    }
  });
}

async function handleSubscriptionUpdated(subscription) {
  const dbSubscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: subscription.id }
  });

  if (!dbSubscription) return;

  const status = subscription.status === 'active' ? 'ACTIVE' :
                 subscription.status === 'canceled' ? 'CANCELED' :
                 subscription.status === 'past_due' ? 'PAST_DUE' :
                 'EXPIRED';

  await prisma.subscription.update({
    where: { id: dbSubscription.id },
    data: {
      status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end
    }
  });
}

async function handleSubscriptionDeleted(subscription) {
  const dbSubscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: subscription.id }
  });

  if (!dbSubscription) return;

  // Move to FREE plan
  const freePlan = await prisma.plan.findUnique({
    where: { name: 'FREE' }
  });

  if (freePlan) {
    await prisma.subscription.update({
      where: { id: dbSubscription.id },
      data: {
        planId: freePlan.id,
        status: 'CANCELED',
        stripeSubscriptionId: null
      }
    });
  }
}

async function handlePaymentSucceeded(invoice) {
  const subscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: invoice.subscription }
  });

  if (!subscription) return;

  // Create payment record
  await prisma.payment.create({
    data: {
      subscriptionId: subscription.id,
      amount: invoice.amount_paid / 100, // Convert from paise to rupees
      currency: invoice.currency.toUpperCase(),
      status: 'SUCCEEDED',
      stripePaymentId: invoice.payment_intent,
      stripeInvoiceId: invoice.id,
      paidAt: new Date(invoice.status_transitions.paid_at * 1000)
    }
  });
}

async function handlePaymentFailed(invoice) {
  const subscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: invoice.subscription }
  });

  if (!subscription) return;

  // Update subscription status
  await prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      status: 'PAST_DUE'
    }
  });

  // Create failed payment record
  await prisma.payment.create({
    data: {
      subscriptionId: subscription.id,
      amount: invoice.amount_due / 100,
      currency: invoice.currency.toUpperCase(),
      status: 'FAILED',
      stripeInvoiceId: invoice.id
    }
  });
}