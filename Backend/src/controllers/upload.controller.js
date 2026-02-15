import { getFileUrl } from '../config/upload.js';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../config/upload.js';
import fs from 'fs';
import path from 'path';

/**
 * @route   POST /api/upload/profile-image
 * @desc    Upload profile image
 * @access  Private
 */
export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const fileUrl = process.env.UPLOAD_STORAGE === 's3'
      ? getFileUrl(req.file.key)
      : getFileUrl(`profiles/${req.file.filename}`);

    res.json({
      success: true,
      message: 'Profile image uploaded successfully',
      data: {
        url: fileUrl,
        filename: req.file.filename || req.file.key
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading profile image',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/upload/logo
 * @desc    Upload logo
 * @access  Private
 */
export const uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const fileUrl = process.env.UPLOAD_STORAGE === 's3'
      ? getFileUrl(req.file.key)
      : getFileUrl(`logos/${req.file.filename}`);

    res.json({
      success: true,
      message: 'Logo uploaded successfully',
      data: {
        url: fileUrl,
        filename: req.file.filename || req.file.key
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading logo',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/upload/background-image
 * @desc    Upload background image
 * @access  Private
 */
export const uploadBackgroundImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const fileUrl = process.env.UPLOAD_STORAGE === 's3'
      ? getFileUrl(req.file.key)
      : getFileUrl(`backgrounds/images/${req.file.filename}`);

    res.json({
      success: true,
      message: 'Background image uploaded successfully',
      data: {
        url: fileUrl,
        filename: req.file.filename || req.file.key
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading background image',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/upload/background-video
 * @desc    Upload background video (Pro/Premium feature)
 * @access  Private
 */
export const uploadBackgroundVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const fileUrl = process.env.UPLOAD_STORAGE === 's3'
      ? getFileUrl(req.file.key)
      : getFileUrl(`backgrounds/videos/${req.file.filename}`);

    res.json({
      success: true,
      message: 'Background video uploaded successfully',
      data: {
        url: fileUrl,
        filename: req.file.filename || req.file.key
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading background video',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/upload/link-thumbnail
 * @desc    Upload link thumbnail
 * @access  Private
 */
export const uploadLinkThumbnail = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const fileUrl = process.env.UPLOAD_STORAGE === 's3'
      ? getFileUrl(req.file.key)
      : getFileUrl(`thumbnails/${req.file.filename}`);

    res.json({
      success: true,
      message: 'Thumbnail uploaded successfully',
      data: {
        url: fileUrl,
        filename: req.file.filename || req.file.key
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading thumbnail',
      error: error.message
    });
  }
};

/**
 * @route   DELETE /api/upload/:folder/:filename
 * @desc    Delete uploaded file
 * @access  Private
 */
export const deleteFile = async (req, res) => {
  try {
    const { folder, filename } = req.params;
    
    if (process.env.UPLOAD_STORAGE === 's3') {
      // Delete from S3/MinIO
      const key = `${folder}/${filename}`;
      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET || 'linkhub-uploads',
        Key: key,
      });
      
      await s3Client.send(command);
    } else {
      // Delete from local storage
      const filePath = path.join(
        process.cwd(),
        process.env.UPLOAD_DIR || 'uploads',
        folder,
        filename
      );
      
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting file',
      error: error.message
    });
  }
};
