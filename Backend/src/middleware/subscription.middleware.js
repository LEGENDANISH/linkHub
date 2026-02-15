import prisma from '../config/database.js';

/**
 * Check if user has an active subscription
 */
export const requireSubscription = (requiredPlans = ['PRO', 'PREMIUM']) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      const subscription = await prisma.subscription.findUnique({
        where: { userId: req.user.id },
        include: { plan: true }
      });

      // Check if subscription exists and is active
      if (!subscription || subscription.status !== 'ACTIVE') {
        return res.status(403).json({
          success: false,
          message: 'Active subscription required',
          code: 'SUBSCRIPTION_REQUIRED'
        });
      }

      // Check if subscription is expired
      if (new Date() > subscription.currentPeriodEnd) {
        return res.status(403).json({
          success: false,
          message: 'Subscription expired. Please renew your plan.',
          code: 'SUBSCRIPTION_EXPIRED'
        });
      }

      // Check if user's plan is in the required plans list
      if (!requiredPlans.includes(subscription.plan.name)) {
        return res.status(403).json({
          success: false,
          message: `This feature requires ${requiredPlans.join(' or ')} plan`,
          currentPlan: subscription.plan.name,
          requiredPlans,
          code: 'UPGRADE_REQUIRED'
        });
      }

      // Attach subscription to request
      req.subscription = subscription;
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error checking subscription',
        error: error.message
      });
    }
  };
};

/**
 * Check if user has access to a specific feature
 */
export const requireFeature = (featureName) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      const subscription = await prisma.subscription.findUnique({
        where: { userId: req.user.id },
        include: { plan: true }
      });

      // Free users get basic features
      if (!subscription) {
        const freePlan = await prisma.plan.findUnique({
          where: { name: 'FREE' }
        });
        
        if (!freePlan || !freePlan[featureName]) {
          return res.status(403).json({
            success: false,
            message: `This feature requires a paid subscription`,
            feature: featureName,
            code: 'FEATURE_NOT_AVAILABLE'
          });
        }
        
        req.subscription = { plan: freePlan };
        return next();
      }

      // Check if plan has the feature
      if (!subscription.plan[featureName]) {
        return res.status(403).json({
          success: false,
          message: `This feature is not available in your ${subscription.plan.displayName} plan`,
          feature: featureName,
          currentPlan: subscription.plan.name,
          code: 'FEATURE_NOT_AVAILABLE'
        });
      }

      req.subscription = subscription;
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error checking feature access',
        error: error.message
      });
    }
  };
};

/**
 * Check link limit based on subscription plan
 */
export const checkLinkLimit = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: req.user.id },
      include: {
        links: {
          where: { isActive: true }
        }
      }
    });

    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.user.id },
      include: { plan: true }
    });

    // Get max links from plan (default to FREE plan if no subscription)
    let maxLinks = 5; // Default for FREE plan
    
    if (subscription && subscription.plan) {
      maxLinks = subscription.plan.maxLinks;
    }

    const currentLinkCount = profile?.links?.length || 0;

    if (currentLinkCount >= maxLinks) {
      return res.status(403).json({
        success: false,
        message: `Link limit reached. You can have maximum ${maxLinks} links in your current plan.`,
        currentCount: currentLinkCount,
        maxLinks,
        code: 'LINK_LIMIT_REACHED'
      });
    }

    req.linkLimit = {
      current: currentLinkCount,
      max: maxLinks,
      remaining: maxLinks - currentLinkCount
    };

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error checking link limit',
      error: error.message
    });
  }
};

/**
 * Middleware to attach subscription info to request
 */
export const attachSubscription = async (req, res, next) => {
  try {
    if (req.user) {
      const subscription = await prisma.subscription.findUnique({
        where: { userId: req.user.id },
        include: { plan: true }
      });
      
      req.subscription = subscription;
    }
    next();
  } catch (error) {
    next();
  }
};
