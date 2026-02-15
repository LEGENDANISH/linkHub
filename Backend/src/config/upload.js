import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize S3 Client (works with MinIO too)
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  endpoint: process.env.AWS_S3_ENDPOINT || undefined, // MinIO endpoint
  forcePathStyle: !!process.env.AWS_S3_ENDPOINT, // Required for MinIO
});

// File filter for images
const imageFileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  
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
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const ext = path.extname(file.originalname);
  return `${file.fieldname}-${uniqueSuffix}${ext}`;
};

// S3/MinIO Upload Configuration
const s3Upload = (folder) => multerS3({
  s3: s3Client,
  bucket: process.env.AWS_S3_BUCKET || 'linkhub-uploads',
  metadata: (req, file, cb) => {
    cb(null, { 
      fieldName: file.fieldname,
      userId: req.user?.id || 'anonymous'
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
  
  // Ensure directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const filename = generateFilename(req, file);
      cb(null, filename);
    }
  });
};

// Choose storage based on environment
const getStorage = (folder) => {
  return process.env.UPLOAD_STORAGE === 's3' 
    ? s3Upload(folder) 
    : localStorage(folder);
};

// Profile Image Upload
export const profileImageUpload = multer({
  storage: getStorage('profiles'),
  fileFilter: imageFileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_IMAGE_SIZE) || 5 * 1024 * 1024, // 5MB
  }
}).single('profileImage');

// Logo Upload
export const logoUpload = multer({
  storage: getStorage('logos'),
  fileFilter: imageFileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_IMAGE_SIZE) || 5 * 1024 * 1024,
  }
}).single('logo');

// Background Image Upload
export const backgroundImageUpload = multer({
  storage: getStorage('backgrounds/images'),
  fileFilter: imageFileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_IMAGE_SIZE) || 5 * 1024 * 1024,
  }
}).single('backgroundImage');

// Background Video Upload
export const backgroundVideoUpload = multer({
  storage: getStorage('backgrounds/videos'),
  fileFilter: videoFileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB for videos
  }
}).single('backgroundVideo');

// Link Thumbnail Upload
export const linkThumbnailUpload = multer({
  storage: getStorage('thumbnails'),
  fileFilter: imageFileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_IMAGE_SIZE) || 5 * 1024 * 1024,
  }
}).single('thumbnail');

// Get public URL for uploaded file
export const getFileUrl = (filePath) => {
  if (process.env.UPLOAD_STORAGE === 's3') {
    const bucket = process.env.AWS_S3_BUCKET || 'linkhub-uploads';
    const endpoint = process.env.AWS_S3_ENDPOINT;
    
    if (endpoint) {
      // MinIO or custom S3
      return `${endpoint}/${bucket}/${filePath}`;
    } else {
      // AWS S3
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
