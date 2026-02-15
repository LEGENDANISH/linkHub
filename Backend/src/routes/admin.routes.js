import express from 'express';
import { body } from 'express-validator';
import {
  updatePlanStripeIds,
  bulkUpdateStripeIds
} from '../controllers/admin.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.middleware.js';

const router = express.Router();

// TODO: Add admin role check middleware
// For now, just require authentication

/**
 * @route   PUT /api/admin/plans/:id/stripe
 * @desc    Update plan Stripe IDs
 * @access  Private (Admin only)
 */
router.put(
  '/plans/:id/stripe',
  authenticate,
  [
    body('stripePriceId')
      .optional()
      .isString()
      .withMessage('Stripe Price ID must be a string'),
    body('stripeProductId')
      .optional()
      .isString()
      .withMessage('Stripe Product ID must be a string')
  ],
  validate,
  updatePlanStripeIds
);

/**
 * @route   PUT /api/admin/plans/bulk-update-stripe
 * @desc    Bulk update Stripe IDs for multiple plans
 * @access  Private (Admin only)
 */
router.put(
  '/plans/bulk-update-stripe',
  authenticate,
  [
    body('plans')
      .isArray({ min: 1 })
      .withMessage('Plans must be an array'),
    body('plans.*.name')
      .notEmpty()
      .withMessage('Plan name is required'),
    body('plans.*.stripePriceId')
      .optional()
      .isString(),
    body('plans.*.stripeProductId')
      .optional()
      .isString()
  ],
  validate,
  bulkUpdateStripeIds
);

export default router;
