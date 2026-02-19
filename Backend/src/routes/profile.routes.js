import express from 'express';
import { body, param } from 'express-validator';
import {
  getPublicProfile,
  getMyProfile,
  updateProfile,
  getProfileAnalytics,
  checkSlugAvailability
} from '../controllers/profile.controller.js';
import { authenticate, optionalAuth } from '../middleware/auth.middleware.js';
import { requireFeature } from '../middleware/subscription.middleware.js';
import { validate } from '../middleware/validation.middleware.js';

const router = express.Router();

/**
 * @route   GET /api/profile/:slug
 * @desc    Get public profile by slug
 * @access  Public
 */

router.get(
  '/:slug',
  [
    param('slug')
      .trim()
      .notEmpty()
      .matches(/^[a-zA-Z0-9_-]+$/)
      .withMessage('Invalid slug format')
  ],
  validate,
  getPublicProfile
);

/**
 * @route   GET /api/profile/me
 * @desc    Get current user's profile
 * @access  Private
 */
router.get('/me/profile', authenticate, getMyProfile);

/**
 * @route   PUT /api/profile/update
 * @desc    Update profile
 * @access  Private
 */
router.put(
  '/update',
  authenticate,
  [
    body('slug')
      .optional()
      .trim()
      .isLength({ min: 3, max: 30 })
      .matches(/^[a-zA-Z0-9_-]+$/)
      .withMessage('Slug must be 3-30 characters and contain only letters, numbers, hyphens, and underscores'),

    body('bio')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Bio must be less than 500 characters'),

    body('titleType')
      .optional()
      .isIn(['TEXT', 'LOGO'])
      .withMessage('Invalid title type'),

    // 🔥 ADD SANITIZER HERE
    body('profileLayout')
      .optional()
      .customSanitizer(v => v?.toUpperCase())
      .isIn(['CLASSIC', 'HERO'])
      .withMessage('Invalid profile layout'),

    body('profileSize')
      .optional()
      .isIn(['SMALL', 'MEDIUM', 'LARGE'])
      .withMessage('Invalid profile size'),

    // 🔥 ADD SANITIZER HERE
    body('wallpaperStyle')
      .optional()
      .customSanitizer(v => v?.toUpperCase())
      .isIn(['SOLID', 'GRADIENT', 'IMAGE', 'VIDEO', 'PATTERN'])
      .withMessage('Invalid wallpaper style'),

    body('backgroundPattern')
      .optional()
      .customSanitizer(v => v?.toUpperCase())
      .isIn(['DOTS', 'GRID', 'LINES', 'WAVES', 'DIAGONAL', 'CIRCLES'])
      .withMessage('Invalid pattern type')
  ],
  validate,
  updateProfile
);


/**
 * @route   GET /api/profile/analytics
 * @desc    Get profile analytics
 * @access  Private (requires analytics feature)
 */
router.get(
  '/me/analytics',
  authenticate,
  requireFeature('analytics'),
  getProfileAnalytics
);

/**
 * @route   GET /api/profile/check-slug/:slug
 * @desc    Check slug availability
 * @access  Public
 */
router.get(
  '/check-slug/:slug',
  [
    param('slug')
      .trim()
      .notEmpty()
      .matches(/^[a-zA-Z0-9_-]+$/)
      .withMessage('Invalid slug format')
  ],
  validate,
  checkSlugAvailability
);

export default router;