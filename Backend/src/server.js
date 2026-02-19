import 'dotenv/config'  // ← Must be first!

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';
import passport from './config/passport.js';
import { errorHandler, notFound } from './middleware/error.middleware.js';

// Load environment variables
// require('dotenv').config()

// Initialize Express app
const app = express();

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// MIDDLEWARE
// ============================================

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin:  'http://localhost:5173',
  credentials: true
}));

// Stripe webhook endpoint needs raw body
app.post('/api/payments/webhook', express.raw({ type: 'application/json' }));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser
app.use(cookieParser());

// Passport initialization
app.use(passport.initialize());

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Serve uploaded files (for local storage)
if (process.env.UPLOAD_STORAGE === 'local' || !process.env.UPLOAD_STORAGE) {
  const uploadDir = path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads');
  app.use('/uploads', express.static(uploadDir));
  console.log(`📁 Serving static files from: ${uploadDir}`);
}

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// app.use('/api', limiter);

// ============================================
// ROUTES
// ============================================

// Welcome route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to LinkHub API',
    version: '1.0.0',
    documentation: '/api/docs'
  });
});

// API routes
app.use('/api', routes);

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// ============================================
// SERVER
// ============================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════╗
║       LinkHub API Server Started 🚀              ║
╠═══════════════════════════════════════════════════╣
║  Environment: ${process.env.NODE_ENV || 'development'}${' '.repeat(32 - (process.env.NODE_ENV || 'development').length)}║
║  Port: ${PORT}${' '.repeat(40 - PORT.toString().length)}║
║  URL: http://localhost:${PORT}${' '.repeat(27 - PORT.toString().length)}║
║                                                   ║
║  Features Enabled:                                ║
║  ✅ Google OAuth Login                            ║
║  ✅ Stripe Payments (INR)                         ║
║  ✅ File Upload (${process.env.UPLOAD_STORAGE === 's3' ? 'S3/MinIO' : 'Local'})${' '.repeat(26 - (process.env.UPLOAD_STORAGE === 's3' ? 9 : 5))}║
║  ✅ 3-Tier Subscription (Free/Starter/Pro)        ║
╚═══════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

export default app;
