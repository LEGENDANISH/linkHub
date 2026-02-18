import prisma from '../config/database.js';
import {
  createStripeCustomer,
  createCheckoutSession,
  cancelStripeSubscription,
  resumeStripeSubscription,
  createCustomerPortalSession,
  constructWebhookEvent
} from '../config/stripe.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
 * @route   GET /api/payments/verify-session/:sessionId
 * @desc    Verify checkout session
 * @access  Private
 */
export const verifySession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      res.json({
        success: true,
        data: {
          status: 'paid',
          customerEmail: session.customer_email,
          amountTotal: session.amount_total / 100,
          currency: session.currency
        }
      });
    } else {
      res.json({
        success: false,
        message: 'Payment not completed',
        data: {
          status: session.payment_status
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying session',
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
    console.log('🔍 handleCheckoutCompleted fired');
  console.log('📋 Session metadata:', session.metadata);
  console.log('💳 Customer:', session.customer);
  console.log('📦 Subscription:', session.subscription);
  const userId = session.metadata?.userId;
  const planName = session.metadata?.planName;

 console.log('👤 userId:', userId);
  console.log('📌 planName:', planName);

  if (!userId || !planName) {
    console.error('❌ Missing metadata!');
    return;
  }

  const plan = await prisma.plan.findFirst({
    where: { name: { equals: planName, mode: 'insensitive' } }
  });

  console.log('🗂️ Plan found:', plan ? plan.name : 'NOT FOUND');

  if (!plan) {
    console.error('Plan not found:', planName);
    return;
  }

  // Fetch real subscription data from Stripe to get accurate period dates
  let periodStart = new Date();
  let periodEnd = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

  if (session.subscription) {
    const stripeSub = await stripe.subscriptions.retrieve(session.subscription);
    periodStart = new Date(stripeSub.current_period_start * 1000);
    periodEnd = new Date(stripeSub.current_period_end * 1000);
  }

  await prisma.subscription.upsert({
    where: { userId },
    update: {
      planId: plan.id,
      status: 'ACTIVE',
      stripeCustomerId: session.customer,
      stripeSubscriptionId: session.subscription,
      currentPeriodStart: periodStart,
      currentPeriodEnd: periodEnd,
    },
    create: {
      userId,
      planId: plan.id,
      status: 'ACTIVE',
      stripeCustomerId: session.customer,
      stripeSubscriptionId: session.subscription,
      currentPeriodStart: periodStart,
      currentPeriodEnd: periodEnd,
    }
  });

  console.log(`✅ Subscription activated for user ${userId}`);
}

async function handleSubscriptionCreated(subscription) {
  const userId = subscription.metadata?.userId;
  if (!userId) return;

  // Fetch full subscription data to get period dates
  const fullSub = await stripe.subscriptions.retrieve(subscription.id);
  
  const priceId = fullSub.items.data[0].price.id;

  const plan = await prisma.plan.findFirst({
    where: {
      OR: [
        { stripePriceId: priceId },
        { stripePriceIdMonthly: priceId }
      ]
    }
  });

  if (!plan) {
    console.error('Plan not found for priceId:', priceId);
    return;
  }

  await prisma.subscription.upsert({
    where: { userId },
    update: {
      planId: plan.id,
      status: 'ACTIVE',
      stripeCustomerId: fullSub.customer,
      stripeSubscriptionId: fullSub.id,
      currentPeriodStart: new Date(fullSub.current_period_start * 1000),
      currentPeriodEnd: new Date(fullSub.current_period_end * 1000)
    },
    create: {
      userId,
      planId: plan.id,
      status: 'ACTIVE',
      stripeCustomerId: fullSub.customer,
      stripeSubscriptionId: fullSub.id,
      currentPeriodStart: new Date(fullSub.current_period_start * 1000),
      currentPeriodEnd: new Date(fullSub.current_period_end * 1000)
    }
  });

  console.log(`✅ Subscription created for user ${userId}`);
}

async function handleSubscriptionUpdated(subscription) {
  const dbSubscription = await prisma.subscription.findFirst({  // ✅ findFirst
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
  const dbSubscription = await prisma.subscription.findFirst({  // ✅ findFirst
    where: { stripeSubscriptionId: subscription.id }
  });

  if (!dbSubscription) return;

  // Move to FREE plan
  const freePlan = await prisma.plan.findFirst({  // ✅ findFirst (name is unique but safer)
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
  const subscription = await prisma.subscription.findFirst({  // ✅ findFirst
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
  const subscription = await prisma.subscription.findFirst({  // ✅ findFirst
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