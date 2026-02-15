import express from 'express';
import authRoutes from './auth.routes.js';
import profileRoutes from './profile.routes.js';
import linkRoutes from './link.routes.js';
import subscriptionRoutes from './subscription.routes.js';
import uploadRoutes from './upload.routes.js';
import paymentRoutes from './payment.routes.js';
import adminRoutes from './admin.routes.js';

const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'LinkHub API is running',
    timestamp: new Date().toISOString(),
    storage: process.env.UPLOAD_STORAGE || 'local'
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/links', linkRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/upload', uploadRoutes);
router.use('/payments', paymentRoutes);
router.use('/admin', adminRoutes);

export default router;
