import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';

/**
 * Generate JWT tokens
 */
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d' }
  );

  return { accessToken, refreshToken };
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
export const register = async (req, res) => {
  try {
    const { email, username, password, name } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: existingUser.email === email 
          ? 'Email already registered' 
          : 'Username already taken'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with profile and free plan subscription
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        name,
        profile: {
          create: {
            slug: username.toLowerCase(),
          }
        }
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        createdAt: true,
        profile: {
          select: {
            id: true,
            slug: true
          }
        }
      }
    });

    // Assign FREE plan
    const freePlan = await prisma.plan.findUnique({
      where: { name: 'FREE' }
    });

    if (freePlan) {
      await prisma.subscription.create({
        data: {
          userId: user.id,
          planId: freePlan.id,
          status: 'ACTIVE',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
        }
      });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user,
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt for:', email); // 👈 ADD THIS

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        subscription: {
          include: {
            plan: true
          }
        }
      }
    });

    console.log('User found:', user ? 'YES' : 'NO'); // 👈 ADD THIS
    console.log('User ID:', user?.id); // 👈 ADD THIS

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    console.log('Comparing passwords...'); // 👈 ADD THIS
    console.log('Input password:', password); // 👈 ADD THIS
    console.log('Stored hash:', user.password); // 👈 ADD THIS

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log('Password valid:', isPasswordValid); // 👈 ADD THIS

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
};
/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token required'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Generate new tokens
    const tokens = generateTokens(decoded.userId);

    res.json({
      success: true,
      data: tokens
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
};

/**
 * @route   GET /api/auth/me
 * @desc    Get current user
 * @access  Private
 */
export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        image: true,
        emailVerified: true,
        createdAt: true,
        profile: {
          select: {
            id: true,
            slug: true,
            profileImage: true,
            bio: true
          }
        },
        subscription: {
          include: {
            plan: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user data',
      error: error.message
    });
  }
};

/**
 * @route   PUT /api/auth/update
 * @desc    Update user profile
 * @access  Private
 */
export const updateUser = async (req, res) => {
  try {
    const { name, email, username } = req.body;

    // Check if email/username is taken by another user
    if (email || username) {
      const existing = await prisma.user.findFirst({
        where: {
          AND: [
            { id: { not: req.user.id } },
            {
              OR: [
                ...(email ? [{ email }] : []),
                ...(username ? [{ username }] : [])
              ]
            }
          ]
        }
      });

      if (existing) {
        return res.status(409).json({
          success: false,
          message: existing.email === email 
            ? 'Email already in use' 
            : 'Username already taken'
        });
      }
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(username && { username })
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        image: true
      }
    });

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
};

/**
 * @route   PUT /api/auth/change-password
 * @desc    Change user password
 * @access  Private
 */
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedPassword }
    });

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error changing password',
      error: error.message
    });
  }
};

/**
 * @route   DELETE /api/auth/delete
 * @desc    Delete user account
 * @access  Private
 */
export const deleteAccount = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.user.id }
    });

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting account',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/auth/google/callback
 * @desc    Google OAuth callback
 * @access  Public
 */
export const googleCallback = async (req, res) => {
  try {
    // User is available in req.user from passport
    const user = req.user;

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    // Redirect to frontend with tokens
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
res.redirect(`${frontendUrl}/auth?token=${accessToken}&refresh=${refreshToken}`);
  } catch (error) {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/auth/error?message=${error.message}`);
  }
};
