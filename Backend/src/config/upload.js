import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize S3 Client — Supabase Storage is S3-compatible
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-northeast-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  endpoint: process.env.AWS_S3_ENDPOINT, // e.g. https://xyz.supabase.co/storage/v1/s3
  forcePathStyle: true, // REQUIRED for Supabase Storage (and MinIO)
});

// File filter for images
const imageFileFilter = (req, file, cb) => {
  const allowedTypes = (process.env.ALLOWED_IMAGE_TYPES || 'image/jpeg,image/png,image/gif,image/webp').split(',');
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'), false);
  }
};

// File filter for videos
const videoFileFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only MP4, WebM, and OGG are allowed.'), false);
  }
};

// Generate unique filename
const generateFilename = (req, file) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = path.extname(file.originalname);
  return `${file.fieldname}-${uniqueSuffix}${ext}`;
};

// S3/Supabase Upload Configuration
const s3Upload = (folder) =>
  multerS3({
    s3: s3Client,
    bucket: process.env.AWS_S3_BUCKET || 'linkhub-uploads',
    metadata: (req, file, cb) => {
      cb(null, {
        fieldName: file.fieldname,
        userId: req.user?.id || 'anonymous',
      });
    },
    key: (req, file, cb) => {
      const filename = generateFilename(req, file);
      cb(null, `${folder}/${filename}`);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
  });

// Local Storage Configuration
const localStorage = (folder) => {
  const uploadDir = path.join(__dirname, '../../', process.env.UPLOAD_DIR || 'uploads', folder);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, generateFilename(req, file)),
  });
};

// Choose storage based on environment
const getStorage = (folder) =>
  process.env.UPLOAD_STORAGE === 's3' ? s3Upload(folder) : localStorage(folder);

// Profile Image Upload
export const profileImageUpload = multer({
  storage: getStorage('profiles'),
  fileFilter: imageFileFilter,
  limits: { fileSize: parseInt(process.env.MAX_IMAGE_SIZE) || 5 * 1024 * 1024 },
}).single('profileImage');

// Logo Upload
export const logoUpload = multer({
  storage: getStorage('logos'),
  fileFilter: imageFileFilter,
  limits: { fileSize: parseInt(process.env.MAX_IMAGE_SIZE) || 5 * 1024 * 1024 },
}).single('logo');

// Background Image Upload
export const backgroundImageUpload = multer({
  storage: getStorage('backgrounds/images'),
  fileFilter: imageFileFilter,
  limits: { fileSize: parseInt(process.env.MAX_IMAGE_SIZE) || 5 * 1024 * 1024 },
}).single('backgroundImage');

// Background Video Upload
export const backgroundVideoUpload = multer({
  storage: getStorage('backgrounds/videos'),
  fileFilter: videoFileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
}).single('backgroundVideo');

// Link Thumbnail Upload
export const linkThumbnailUpload = multer({
  storage: getStorage('thumbnails'),
  fileFilter: imageFileFilter,
  limits: { fileSize: parseInt(process.env.MAX_IMAGE_SIZE) || 5 * 1024 * 1024 },
}).single('thumbnail');

/**
 * Get public URL for an uploaded file.
 *
 * Supabase public URL format:
 *   https://<project-ref>.supabase.co/storage/v1/object/public/<bucket>/<key>
 *
 * The S3 endpoint env var is:
 *   https://<project-ref>.supabase.co/storage/v1/s3
 *
 * So we swap /s3 → /object/public/<bucket>/<key>
 */
export const getFileUrl = (filePath) => {
  if (process.env.UPLOAD_STORAGE === 's3') {
    const bucket = process.env.AWS_S3_BUCKET || 'linkhub-uploads';
    const endpoint = process.env.AWS_S3_ENDPOINT;

    if (endpoint) {
      // Supabase Storage (or MinIO): build public object URL
      const base = endpoint.replace(/\/s3$/, ''); // strip trailing /s3
      return `${base}/object/public/${bucket}/${filePath}`;
    } else {
      // Plain AWS S3 fallback
      const region = process.env.AWS_REGION || 'us-east-1';
      return `https://${bucket}.s3.${region}.amazonaws.com/${filePath}`;
    }
  } else {
    // Local storage
    const publicUrl = process.env.PUBLIC_URL || 'http://localhost:5000';
    return `${publicUrl}/uploads/${filePath}`;
  }
};

export { s3Client };