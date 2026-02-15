import express from 'express';
import { body, param } from 'express-validator';
import {
  getPlans,
  getPlan,
  getMySubscription,
  subscribeToPlan,
  upgradePlan,
  downgradePlan,
  cancelSubscription,
  resumeSubscription,
  getPaymentHistory,
  getFeatures
} from '../controllers/subscription.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.middleware.js';

const router = express.Router();

/**
 * @route   GET /api/subscriptions/plans
 * @desc    Get all available plans
 * @access  Public
 */
router.get('/plans', getPlans);

/**
 * @route   GET /api/subscriptions/plans/:id
 * @desc    Get single plan details
 * @access  Public
 */
router.get(
  '/plans/:id',
  [
    param('id').notEmpty().withMessage('Plan ID is required')
  ],
  validate,
  getPlan
);

/**
 * @route   GET /api/subscriptions/my-subscription
 * @desc    Get current user's subscription
 * @access  Private
 */
router.get('/my-subscription', authenticate, getMySubscription);

/**
 * @route   POST /api/subscriptions/subscribe
 * @desc    Subscribe to a plan
 * @access  Private
 */
router.post(
  '/subscribe',
  authenticate,
  [
    body('planId')
      .notEmpty()
      .withMessage('Plan ID is required'),
    body('paymentMethod')
      .optional()
      .isString()
      .withMessage('Payment method must be a string')
  ],
  validate,
  subscribeToPlan
);

/**
 * @route   PUT /api/subscriptions/upgrade
 * @desc    Upgrade subscription plan
 * @access  Private
 */
router.put(
  '/upgrade',
  authenticate,
  [
    body('planId')
      .notEmpty()
      .withMessage('Plan ID is required')
  ],
  validate,
  upgradePlan
);

/**
 * @route   PUT /api/subscriptions/downgrade
 * @desc    Downgrade subscription plan
 * @access  Private
 */
router.put(
  '/downgrade',
  authenticate,
  [
    body('planId')
      .notEmpty()
      .withMessage('Plan ID is required')
  ],
  validate,
  downgradePlan
);

/**
 * @route   PUT /api/subscriptions/cancel
 * @desc    Cancel subscription
 * @access  Private
 */
router.put('/cancel', authenticate, cancelSubscription);

/**
 * @route   PUT /api/subscriptions/resume
 * @desc    Resume canceled subscription
 * @access  Private
 */
router.put('/resume', authenticate, resumeSubscription);

/**
 * @route   GET /api/subscriptions/payment-history
 * @desc    Get payment history
 * @access  Private
 */
router.get('/payment-history', authenticate, getPaymentHistory);

/**
 * @route   GET /api/subscriptions/features
 * @desc    Get available features based on subscription
 * @access  Private
 */
router.get('/features', authenticate, getFeatures);

export default router;
