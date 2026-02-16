import prisma from '../config/database.js';

/**
 * Format link for response (converts BigInt to Number)
 */
const formatLink = (link) => ({
  id: Number(link.id),
  name: link.name,
  url: link.url,
  active: link.active,
  clicks: link.clicks,
  layout: link.layout,
  thumbnail: link.thumbnail,
  animation: link.animation,
  locked: link.locked,
  schedule: link.schedule,
  redirect: link.redirect,
  createdAt: link.createdAt,
  updatedAt: link.updatedAt,
  iconType: link.iconType,
  thumbnailCrop: link.thumbnailCrop
});

/**
 * @route   GET /api/links
 * @desc    Get all links for current user
 * @access  Private
 */
export const getLinks = async (req, res) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: req.user.id },
      select: { id: true }
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    const links = await prisma.link.findMany({
      where: { profileId: profile.id },
      orderBy: { createdAt: 'asc' }
    });

    res.json({
      links: links.map(formatLink),
      isLoaded: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching links',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/links/:id
 * @desc    Get single link
 * @access  Private
 */
export const getLink = async (req, res) => {
  try {
    const { id } = req.params;
    const linkId = BigInt(id);

    const link = await prisma.link.findUnique({
      where: { id: linkId },
      include: {
        profile: {
          select: { userId: true }
        }
      }
    });

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Link not found'
      });
    }

    // Check ownership
    if (link.profile.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access'
      });
    }

    res.json({
      success: true,
      data: formatLink(link)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching link',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/links
 * @desc    Create new link
 * @access  Private
 */
export const createLink = async (req, res) => {
  try {
    const {
      name,
      url,
      active,
      layout,
      thumbnail,
      animation,
      locked,
      schedule,
      redirect,
      iconType,
      thumbnailCrop
    } = req.body;

    const profile = await prisma.profile.findUnique({
      where: { userId: req.user.id },
      select: { id: true }
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    const link = await prisma.link.create({
      data: {
        profileId: profile.id,
        name,
        url,
        active: active !== undefined ? active : true,
        layout: layout || 'classic',
        thumbnail: thumbnail || null,
        animation: animation || 'none',
        locked: locked || false,
        schedule: schedule || null,
        redirect: redirect || null,
        iconType: iconType || 'auto',
        thumbnailCrop: thumbnailCrop || null,
        clicks: 0
      }
    });

    res.status(201).json({
      success: true,
      message: 'Link created successfully',
      data: formatLink(link)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating link',
      error: error.message
    });
  }
};

/**
 * @route   PUT /api/links/:id
 * @desc    Update link
 * @access  Private
 */
export const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const linkId = BigInt(id);
    const updateData = req.body;

    // Check ownership
    const existingLink = await prisma.link.findUnique({
      where: { id: linkId },
      include: {
        profile: {
          select: { userId: true }
        }
      }
    });

    if (!existingLink) {
      return res.status(404).json({
        success: false,
        message: 'Link not found'
      });
    }

    if (existingLink.profile.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access'
      });
    }

    // Build update object
    const dataToUpdate = {};
    if (updateData.name !== undefined) dataToUpdate.name = updateData.name;
    if (updateData.url !== undefined) dataToUpdate.url = updateData.url;
    if (updateData.active !== undefined) dataToUpdate.active = updateData.active;
    if (updateData.layout !== undefined) dataToUpdate.layout = updateData.layout;
    if (updateData.thumbnail !== undefined) dataToUpdate.thumbnail = updateData.thumbnail;
    if (updateData.animation !== undefined) dataToUpdate.animation = updateData.animation;
    if (updateData.locked !== undefined) dataToUpdate.locked = updateData.locked;
    if (updateData.schedule !== undefined) dataToUpdate.schedule = updateData.schedule;
    if (updateData.redirect !== undefined) dataToUpdate.redirect = updateData.redirect;
    if (updateData.iconType !== undefined) dataToUpdate.iconType = updateData.iconType;
    if (updateData.thumbnailCrop !== undefined) dataToUpdate.thumbnailCrop = updateData.thumbnailCrop;

    // Update link
    const link = await prisma.link.update({
      where: { id: linkId },
      data: dataToUpdate
    });

    res.json({
      success: true,
      message: 'Link updated successfully',
      data: formatLink(link)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating link',
      error: error.message
    });
  }
};

/**
 * @route   DELETE /api/links/:id
 * @desc    Delete link
 * @access  Private
 */
export const deleteLink = async (req, res) => {
  try {
    const { id } = req.params;
    const linkId = BigInt(id);

    // Check ownership
    const existingLink = await prisma.link.findUnique({
      where: { id: linkId },
      include: {
        profile: {
          select: { userId: true }
        }
      }
    });

    if (!existingLink) {
      return res.status(404).json({
        success: false,
        message: 'Link not found'
      });
    }

    if (existingLink.profile.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access'
      });
    }

    await prisma.link.delete({
      where: { id: linkId }
    });

    res.json({
      success: true,
      message: 'Link deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting link',
      error: error.message
    });
  }
};

/**
 * @route   PUT /api/links/reorder
 * @desc    Reorder links (deprecated - no order field anymore)
 * @access  Private
 */
export const reorderLinks = async (req, res) => {
  try {
    res.status(400).json({
      success: false,
      message: 'Reordering is deprecated. Links are ordered by creation date.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reordering links',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/links/:id/click
 * @desc    Track link click
 * @access  Public
 */
export const trackClick = async (req, res) => {
  try {
    const { id } = req.params;
    const linkId = BigInt(id);

    const link = await prisma.link.findUnique({
      where: { id: linkId }
    });

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Link not found'
      });
    }

    // Increment click count
    await prisma.link.update({
      where: { id: linkId },
      data: { clicks: { increment: 1 } }
    });

    // Track detailed click analytics
    await prisma.linkClick.create({
      data: {
        linkId: linkId,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        referer: req.headers.referer,
        device: req.headers['user-agent']?.includes('Mobile') ? 'mobile' : 'desktop'
      }
    });

    res.json({
      success: true,
      message: 'Click tracked',
      redirectUrl: link.redirect || link.url
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error tracking click',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/links/:id/analytics
 * @desc    Get link analytics
 * @access  Private
 */
export const getLinkAnalytics = async (req, res) => {
  try {
    const { id } = req.params;
    const linkId = BigInt(id);
    const { days = 30 } = req.query;

    const link = await prisma.link.findUnique({
      where: { id: linkId },
      include: {
        profile: {
          select: { userId: true }
        }
      }
    });

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Link not found'
      });
    }

    if (link.profile.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access'
      });
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const clicks = await prisma.linkClick.findMany({
      where: {
        linkId: linkId,
        clickedAt: { gte: startDate }
      },
      orderBy: { clickedAt: 'desc' }
    });

    res.json({
      success: true,
      data: {
        totalClicks: link.clicks,
        recentClicks: clicks.length,
        clicks
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching link analytics',
      error: error.message
    });
  }
};