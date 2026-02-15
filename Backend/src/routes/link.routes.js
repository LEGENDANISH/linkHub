import express from 'express';
import { body, param } from 'express-validator';
import {
  getLinks,
  getLink,
  createLink,
  updateLink,
  deleteLink,
  reorderLinks,
  trackClick,
  getLinkAnalytics
} from '../controllers/link.controller.js';
import { authenticate, optionalAuth } from '../middleware/auth.middleware.js';
import { checkLinkLimit, requireFeature } from '../middleware/subscription.middleware.js';
import { validate } from '../middleware/validation.middleware.js';

const router = express.Router();

/**
 * @route   GET /api/links
 * @desc    Get all links for current user
 * @access  Private
 */
router.get('/', authenticate, getLinks);

/**
 * @route   GET /api/links/:id
 * @desc    Get single link
 * @access  Private
 */
router.get(
  '/:id',
  authenticate,
  [
    param('id').notEmpty().withMessage('Link ID is required')
  ],
  validate,
  getLink
);

/**
 * @route   POST /api/links
 * @desc    Create new link
 * @access  Private
 */
router.post(
  '/',
  authenticate,
  checkLinkLimit,
  [
    body('title')
      .trim()
      .notEmpty()
      .isLength({ max: 100 })
      .withMessage('Title is required and must be less than 100 characters'),
    body('url')
      .trim()
      .notEmpty()
      .isURL()
      .withMessage('Valid URL is required'),
    body('linkType')
      .optional()
      .isIn(['STANDARD', 'HEADER', 'SOCIAL', 'EMBED', 'EMAIL', 'PHONE'])
      .withMessage('Invalid link type'),
    body('buttonStyle')
      .optional()
      .isIn(['rounded', 'square', 'pill'])
      .withMessage('Invalid button style'),
    body('isScheduled')
      .optional()
      .isBoolean()
      .withMessage('isScheduled must be boolean'),
    body('scheduleStart')
      .optional()
      .isISO8601()
      .withMessage('Invalid schedule start date'),
    body('scheduleEnd')
      .optional()
      .isISO8601()
      .withMessage('Invalid schedule end date')
  ],
  validate,
  createLink
);

/**
 * @route   PUT /api/links/:id
 * @desc    Update link
 * @access  Private
 */
router.put(
  '/:id',
  authenticate,
  [
    param('id').notEmpty().withMessage('Link ID is required'),
    body('title')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('Title must be less than 100 characters'),
    body('url')
      .optional()
      .trim()
      .isURL()
      .withMessage('Valid URL is required'),
    body('linkType')
      .optional()
      .isIn(['STANDARD', 'HEADER', 'SOCIAL', 'EMBED', 'EMAIL', 'PHONE'])
      .withMessage('Invalid link type'),
    body('buttonStyle')
      .optional()
      .isIn(['rounded', 'square', 'pill'])
      .withMessage('Invalid button style')
  ],
  validate,
  updateLink
);

/**
 * @route   DELETE /api/links/:id
 * @desc    Delete link
 * @access  Private
 */
router.delete(
  '/:id',
  authenticate,
  [
    param('id').notEmpty().withMessage('Link ID is required')
  ],
  validate,
  deleteLink
);

/**
 * @route   PUT /api/links/reorder
 * @desc    Reorder links
 * @access  Private
 */
router.put(
  '/bulk/reorder',
  authenticate,
  [
    body('linkOrders')
      .isArray({ min: 1 })
      .withMessage('linkOrders must be an array with at least one item'),
    body('linkOrders.*.id')
      .notEmpty()
      .withMessage('Each link must have an id'),
    body('linkOrders.*.order')
      .isInt({ min: 0 })
      .withMessage('Order must be a positive integer')
  ],
  validate,
  reorderLinks
);

/**
 * @route   POST /api/links/:id/click
 * @desc    Track link click
 * @access  Public
 */
router.post(
  '/:id/click',
  [
    param('id').notEmpty().withMessage('Link ID is required')
  ],
  validate,
  trackClick
);

/**
 * @route   GET /api/links/:id/analytics
 * @desc    Get link analytics
 * @access  Private (requires analytics feature)
 */
router.get(
  '/:id/analytics',
  authenticate,
  requireFeature('analytics'),
  [
    param('id').notEmpty().withMessage('Link ID is required')
  ],
  validate,
  getLinkAnalytics
);

export default router;
