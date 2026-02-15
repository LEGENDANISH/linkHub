import prisma from '../config/database.js';

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
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { clicks: true }
        }
      }
    });

    res.json({
      success: true,
      data: links
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

    const link = await prisma.link.findUnique({
      where: { id },
      include: {
        profile: {
          select: { userId: true }
        },
        _count: {
          select: { clicks: true }
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
      data: link
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
      title,
      url,
      icon,
      thumbnail,
      linkType,
      buttonStyle,
      buttonColor,
      textColor,
      borderColor,
      borderWidth,
      isActive,
      isScheduled,
      scheduleStart,
      scheduleEnd
    } = req.body;

    const profile = await prisma.profile.findUnique({
      where: { userId: req.user.id },
      include: {
        links: {
          where: { isActive: true }
        }
      }
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    // Get the next order number
    const maxOrder = await prisma.link.findFirst({
      where: { profileId: profile.id },
      orderBy: { order: 'desc' },
      select: { order: true }
    });

    const nextOrder = maxOrder ? maxOrder.order + 1 : 0;

    const link = await prisma.link.create({
      data: {
        profileId: profile.id,
        title,
        url,
        icon,
        thumbnail,
        linkType: linkType || 'STANDARD',
        buttonStyle: buttonStyle || 'rounded',
        buttonColor,
        textColor,
        borderColor,
        borderWidth: borderWidth || 0,
        order: nextOrder,
        isActive: isActive !== undefined ? isActive : true,
        isScheduled: isScheduled || false,
        scheduleStart: scheduleStart ? new Date(scheduleStart) : null,
        scheduleEnd: scheduleEnd ? new Date(scheduleEnd) : null
      }
    });

    res.status(201).json({
      success: true,
      message: 'Link created successfully',
      data: link
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
    const updateData = req.body;

    // Check ownership
    const existingLink = await prisma.link.findUnique({
      where: { id },
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

    // Update link
    const link = await prisma.link.update({
      where: { id },
      data: {
        ...(updateData.title && { title: updateData.title }),
        ...(updateData.url && { url: updateData.url }),
        ...(updateData.icon !== undefined && { icon: updateData.icon }),
        ...(updateData.thumbnail !== undefined && { thumbnail: updateData.thumbnail }),
        ...(updateData.linkType && { linkType: updateData.linkType }),
        ...(updateData.buttonStyle && { buttonStyle: updateData.buttonStyle }),
        ...(updateData.buttonColor !== undefined && { buttonColor: updateData.buttonColor }),
        ...(updateData.textColor !== undefined && { textColor: updateData.textColor }),
        ...(updateData.borderColor !== undefined && { borderColor: updateData.borderColor }),
        ...(updateData.borderWidth !== undefined && { borderWidth: updateData.borderWidth }),
        ...(updateData.isActive !== undefined && { isActive: updateData.isActive }),
        ...(updateData.isScheduled !== undefined && { isScheduled: updateData.isScheduled }),
        ...(updateData.scheduleStart !== undefined && { 
          scheduleStart: updateData.scheduleStart ? new Date(updateData.scheduleStart) : null 
        }),
        ...(updateData.scheduleEnd !== undefined && { 
          scheduleEnd: updateData.scheduleEnd ? new Date(updateData.scheduleEnd) : null 
        })
      }
    });

    res.json({
      success: true,
      message: 'Link updated successfully',
      data: link
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

    // Check ownership
    const existingLink = await prisma.link.findUnique({
      where: { id },
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
      where: { id }
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
 * @desc    Reorder links
 * @access  Private
 */
export const reorderLinks = async (req, res) => {
  try {
    const { linkOrders } = req.body; // Array of { id, order }

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

    // Update all link orders in a transaction
    await prisma.$transaction(
      linkOrders.map(({ id, order }) =>
        prisma.link.update({
          where: { id },
          data: { order }
        })
      )
    );

    res.json({
      success: true,
      message: 'Links reordered successfully'
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

    const link = await prisma.link.findUnique({
      where: { id }
    });

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Link not found'
      });
    }

    // Increment click count
    await prisma.link.update({
      where: { id },
      data: { clickCount: { increment: 1 } }
    });

    // Track detailed click analytics
    await prisma.linkClick.create({
      data: {
        linkId: id,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        referer: req.headers.referer,
        device: req.headers['user-agent']?.includes('Mobile') ? 'mobile' : 'desktop'
      }
    });

    res.json({
      success: true,
      message: 'Click tracked',
      redirectUrl: link.url
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
    const { days = 30 } = req.query;

    const link = await prisma.link.findUnique({
      where: { id },
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
        linkId: id,
        clickedAt: { gte: startDate }
      },
      orderBy: { clickedAt: 'desc' }
    });

    res.json({
      success: true,
      data: {
        totalClicks: link.clickCount,
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
