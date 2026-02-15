import Stripe from 'stripe';

// Initialize Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

/**
 * Create Stripe customer
 */
export const createStripeCustomer = async (user) => {
  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name,
    metadata: {
      userId: user.id,
      username: user.username
    }
  });
  
  return customer;
};

/**
 * Create Stripe checkout session for subscription
 */
export const createCheckoutSession = async ({ customerId, priceId, userId, planName, successUrl, cancelUrl }) => {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    subscription_data: {
      metadata: {
        userId,
        planName
      },
      trial_period_days: planName === 'PRO' ? 7 : undefined, // 7-day trial for PRO
    },
    metadata: {
      userId,
      planName
    }
  });
  
  return session;
};

/**
 * Create Stripe payment intent for one-time payment
 */
export const createPaymentIntent = async ({ amount, customerId, metadata }) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to paise (for INR)
    currency: process.env.STRIPE_CURRENCY || 'inr',
    customer: customerId,
    metadata,
    automatic_payment_methods: {
      enabled: true,
    },
  });
  
  return paymentIntent;
};

/**
 * Cancel Stripe subscription
 */
export const cancelStripeSubscription = async (subscriptionId) => {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true
  });
  
  return subscription;
};

/**
 * Resume Stripe subscription
 */
export const resumeStripeSubscription = async (subscriptionId) => {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false
  });
  
  return subscription;
};

/**
 * Update Stripe subscription plan
 */
export const updateStripeSubscription = async (subscriptionId, newPriceId) => {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  
  const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: newPriceId,
      },
    ],
    proration_behavior: 'create_prorations',
  });
  
  return updatedSubscription;
};

/**
 * Get Stripe subscription
 */
export const getStripeSubscription = async (subscriptionId) => {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  return subscription;
};

/**
 * Get customer portal URL
 */
export const createCustomerPortalSession = async (customerId, returnUrl) => {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  
  return session;
};

/**
 * Construct webhook event
 */
export const constructWebhookEvent = (payload, signature) => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    webhookSecret
  );
  
  return event;
};
