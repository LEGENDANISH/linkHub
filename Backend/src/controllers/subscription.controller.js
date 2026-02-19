import prisma from '../config/database.js';

/**
 * @route   GET /api/subscriptions/plans
 * @desc    Get all available plans
 * @access  Public
 */
export const getPlans = async (req, res) => {
  try {
    const plans = await prisma.plan.findMany({
      where: { isActive: true },
      orderBy: { price: 'asc' }
    });

    res.json({
      success: true,
      data: plans
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching plans',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/subscriptions/plans/:id
 * @desc    Get single plan details
 * @access  Public
 */
export const getPlan = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await prisma.plan.findUnique({
      where: { id }
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }

    res.json({
      success: true,
      data: plan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching plan',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/subscriptions/my-subscription
 * @desc    Get current user's subscription
 * @access  Private
 */
export const getMySubscription = async (req, res) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.user.id },
      include: {
        plan: true,
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'No subscription found'
      });
    }

    res.json({
      success: true,
      data: subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching subscription',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/subscriptions/subscribe
 * @desc    Subscribe to a plan
 * @access  Private
 */
export const subscribeToPlan = async (req, res) => {
  try {
    const { planId, paymentMethod } = req.body;

    // Check if plan exists
    const plan = await prisma.plan.findUnique({
      where: { id: planId }
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }

    // Check existing subscription
    const existingSubscription = await prisma.subscription.findUnique({
      where: { userId: req.user.id }
    });

    const now = new Date();
    const periodEnd = new Date();
    
    // Set period based on interval
    if (plan.interval === 'month') {
      periodEnd.setMonth(periodEnd.getMonth() + 1);
    } else if (plan.interval === 'year') {
      periodEnd.setFullYear(periodEnd.getFullYear() + 1);
    }

    if (existingSubscription) {
      // Update existing subscription
      const subscription = await prisma.subscription.update({
        where: { id: existingSubscription.id },
        data: {
          planId,
          status: 'ACTIVE',
          currentPeriodStart: now,
          currentPeriodEnd: periodEnd,
          cancelAtPeriodEnd: false
        },
        include: { plan: true }
      });

      // Create payment record
      if (plan.price > 0) {
        await prisma.payment.create({
          data: {
            subscriptionId: subscription.id,
            amount: plan.price,
            currency: plan.currency,
            status: 'SUCCEEDED',
            paidAt: now
          }
        });
      }

      res.json({
        success: true,
        message: 'Subscription updated successfully',
        data: subscription
      });
    } else {
      // Create new subscription
      const subscription = await prisma.subscription.create({
        data: {
          userId: req.user.id,
          planId,
          status: 'ACTIVE',
          currentPeriodStart: now,
          currentPeriodEnd: periodEnd
        },
        include: { plan: true }
      });

      // Create payment record
      if (plan.price > 0) {
        await prisma.payment.create({
          data: {
            subscriptionId: subscription.id,
            amount: plan.price,
            currency: plan.currency,
            status: 'SUCCEEDED',
            paidAt: now
          }
        });
      }

      res.status(201).json({
        success: true,
        message: 'Subscription created successfully',
        data: subscription
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating subscription',
      error: error.message
    });
  }
};

/**
 * @route   PUT /api/subscriptions/upgrade
 * @desc    Upgrade subscription plan
 * @access  Private
 */
export const upgradePlan = async (req, res) => {
  try {
    const { planId } = req.body;

    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.user.id },
      include: { plan: true }
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'No active subscription found'
      });
    }

    const newPlan = await prisma.plan.findUnique({
      where: { id: planId }
    });

    if (!newPlan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }

    // Check if it's actually an upgrade
    if (newPlan.price <= subscription.plan.price) {
      return res.status(400).json({
        success: false,
        message: 'New plan must be higher tier than current plan'
      });
    }

    // Calculate prorated amount (simplified - in production use Stripe's proration)
    const remainingDays = Math.ceil(
      (subscription.currentPeriodEnd - new Date()) / (1000 * 60 * 60 * 24)
    );
    const proratedAmount = (newPlan.price - subscription.plan.price) * (remainingDays / 30);

    // Update subscription
    const updatedSubscription = await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        planId: newPlan.id
      },
      include: { plan: true }
    });

    // Create prorated payment
    await prisma.payment.create({
      data: {
        subscriptionId: updatedSubscription.id,
        amount: proratedAmount,
        currency: newPlan.currency,
        status: 'SUCCEEDED',
        paidAt: new Date()
      }
    });

    res.json({
      success: true,
      message: 'Plan upgraded successfully',
      data: updatedSubscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error upgrading plan',
      error: error.message
    });
  }
};

/**
 * @route   PUT /api/subscriptions/downgrade
 * @desc    Downgrade subscription plan
 * @access  Private
 */
export const downgradePlan = async (req, res) => {
  try {
    const { planId } = req.body;

    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.user.id },
      include: { plan: true }
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'No active subscription found'
      });
    }

    const newPlan = await prisma.plan.findUnique({
      where: { id: planId }
    });

    if (!newPlan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }

    // Downgrade happens at end of current period
    const updatedSubscription = await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        planId: newPlan.id,
        // Plan change takes effect at next billing cycle
      },
      include: { plan: true }
    });

    res.json({
      success: true,
      message: 'Plan will be downgraded at the end of current billing period',
      data: updatedSubscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error downgrading plan',
      error: error.message
    });
  }
};

/**
 * @route   PUT /api/subscriptions/cancel
 * @desc    Cancel subscription
 * @access  Private
 */
export const cancelSubscription = async (req, res) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.user.id }
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'No active subscription found'
      });
    }

    const updatedSubscription = await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        cancelAtPeriodEnd: true,
        canceledAt: new Date()
      },
      include: { plan: true }
    });

    res.json({
      success: true,
      message: 'Subscription will be canceled at the end of current billing period',
      data: updatedSubscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error canceling subscription',
      error: error.message
    });
  }
};

/**
 * @route   PUT /api/subscriptions/resume
 * @desc    Resume canceled subscription
 * @access  Private
 */
export const resumeSubscription = async (req, res) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.user.id }
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'No subscription found'
      });
    }

    if (!subscription.cancelAtPeriodEnd) {
      return res.status(400).json({
        success: false,
        message: 'Subscription is not set to cancel'
      });
    }

    const updatedSubscription = await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        cancelAtPeriodEnd: false,
        canceledAt: null
      },
      include: { plan: true }
    });

    res.json({
      success: true,
      message: 'Subscription resumed successfully',
      data: updatedSubscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error resuming subscription',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/subscriptions/payment-history
 * @desc    Get payment history
 * @access  Private
 */
export const getPaymentHistory = async (req, res) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.user.id }
    });

    if (!subscription) {
      return res.json({
        success: true,
        data: []
      });
    }

    const payments = await prisma.payment.findMany({
      where: { subscriptionId: subscription.id },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, data: { payments } });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching payment history',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/subscriptions/features
 * @desc    Get available features based on subscription
 * @access  Private
 */
export const getFeatures = async (req, res) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.user.id },
      include: { plan: true }
    });

    let features = {
      maxLinks: 5,
      customDomain: false,
      removeBranding: false,
      analytics: false,
      scheduledLinks: false,
      prioritySupport: false,
      customThemes: false,
      videoBackground: false
    };

    if (subscription && subscription.plan) {
      features = {
        maxLinks: subscription.plan.maxLinks,
        customDomain: subscription.plan.customDomain,
        removeBranding: subscription.plan.removeBranding,
        analytics: subscription.plan.analytics,
        scheduledLinks: subscription.plan.scheduledLinks,
        prioritySupport: subscription.plan.prioritySupport,
        customThemes: subscription.plan.customThemes,
        videoBackground: subscription.plan.videoBackground
      };
    }

    res.json({
      success: true,
      data: features
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching features',
      error: error.message
    });
  }
};
