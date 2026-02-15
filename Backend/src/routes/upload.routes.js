import express from 'express';
import {
  uploadProfileImage,
  uploadLogo,
  uploadBackgroundImage,
  uploadBackgroundVideo,
  uploadLinkThumbnail,
  deleteFile
} from '../controllers/upload.controller.js';
import {
  profileImageUpload,
  logoUpload,
  backgroundImageUpload,
  backgroundVideoUpload,
  linkThumbnailUpload
} from '../config/upload.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireFeature } from '../middleware/subscription.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/upload/profile-image
 * @desc    Upload profile image
 * @access  Private
 */
router.post(
  '/profile-image',
  authenticate,
  profileImageUpload,
  uploadProfileImage
);

/**
 * @route   POST /api/upload/logo
 * @desc    Upload logo
 * @access  Private
 */
router.post(
  '/logo',
  authenticate,
  logoUpload,
  uploadLogo
);

/**
 * @route   POST /api/upload/background-image
 * @desc    Upload background image
 * @access  Private
 */
router.post(
  '/background-image',
  authenticate,
  backgroundImageUpload,
  uploadBackgroundImage
);

/**
 * @route   POST /api/upload/background-video
 * @desc    Upload background video (requires Pro/Premium)
 * @access  Private
 */
router.post(
  '/background-video',
  authenticate,
  requireFeature('videoBackground'),
  backgroundVideoUpload,
  uploadBackgroundVideo
);

/**
 * @route   POST /api/upload/link-thumbnail
 * @desc    Upload link thumbnail
 * @access  Private
 */
router.post(
  '/link-thumbnail',
  authenticate,
  linkThumbnailUpload,
  uploadLinkThumbnail
);

/**
 * @route   DELETE /api/upload/:folder/:filename
 * @desc    Delete uploaded file
 * @access  Private
 */
router.delete(
  '/:folder/:filename',
  authenticate,
  deleteFile
);

export default router;
