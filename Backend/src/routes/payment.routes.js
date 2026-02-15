import express from 'express';
import { body } from 'express-validator';
import {
  createCheckout,
  createPortal,
  stripeWebhook
} from '../controllers/payment.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/payments/create-checkout-session
 * @desc    Create Stripe checkout session
 * @access  Private
 */
router.post(
  '/create-checkout-session',
  authenticate,
  [
    body('planId')
      .notEmpty()
      .withMessage('Plan ID is required'),
    body('billingInterval')
      .optional()
      .isIn(['monthly', 'annual'])
      .withMessage('Billing interval must be either "monthly" or "annual"')
  ],
  validate,
  createCheckout
);

/**
 * @route   POST /api/payments/create-portal-session
 * @desc    Create Stripe customer portal session
 * @access  Private
 */
router.post(
  '/create-portal-session',
  authenticate,
  createPortal
);

/**
 * @route   POST /api/payments/webhook
 * @desc    Stripe webhook endpoint
 * @access  Public (verified by Stripe signature)
 * @note    This route needs raw body, configured in server.js
 */
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhook
);

export default router;
