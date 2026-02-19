import prisma from '../config/database.js';

/**
 * @route   GET /api/profile/:slug
 * @desc    Get public profile by slug
 * @access  Public
 */
export const getPublicProfile = async (req, res) => {
  try {
    const { slug } = req.params;

    const profile = await prisma.profile.findUnique({
      where: { slug },
      include: {
        links: {
          where: {
            active: true,
          },
          orderBy: { createdAt: 'asc' },
          select: {
            id: true,
            name: true,
            url: true,
            iconType: true,
            thumbnail: true,
            layout: true,
            animation: true,
            schedule: true,
            active: true,
            clicks: true,
            locked: true,
            redirect: true,
          }
        },
        user: {
          select: {
            name: true,
            username: true
          }
        }
      }
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    // Filter scheduled links in application code
    const now = new Date();
    const filteredLinks = profile.links.filter(link => {
      if (!link.schedule) return true; // No schedule = always visible

      const { start, end } = link.schedule;

      if (!start && !end) return true; // No dates set = always visible

      const afterStart = start ? new Date(start) <= now : true;
      const beforeEnd = end ? new Date(end) >= now : true;

      return afterStart && beforeEnd;
    });

    // Serialize BigInt ids to Number
    const serializedLinks = filteredLinks.map(link => ({
      ...link,
      id: Number(link.id)
    }));

    // Increment view count
    await prisma.profile.update({
      where: { id: profile.id },
      data: { viewCount: { increment: 1 } }
    });

    // Track analytics
    await prisma.analytics.create({
      data: {
        profileId: profile.id,
        views: 1,
        uniqueViews: 1,
        device: req.headers['user-agent']?.includes('Mobile') ? 'mobile' : 'desktop',
        referer: req.headers.referer
      }
    });

    res.json({
      success: true,
      data: {
        ...profile,
        links: serializedLinks
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
};
/**
 * @route   GET /api/profile/me
 * @desc    Get current user's profile
 * @access  Private
 */
export const getMyProfile = async (req, res) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: req.user.id },
      include: {
        user: {                     // 👈 add this relation
          select: {
            name: true,
            username: true,
            email: true,
            image: true
          }
        },
        links: {
           orderBy: { createdAt: 'asc' }
        },
        _count: {
          select: {
            links: true,
            analytics: true
          }
        }
      }
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    const formattedProfile = {
  ...profile,
  links: profile.links?.map(link => ({
    ...link,
    id: Number(link.id)
  }))
};

res.json({
  success: true,
  data: formattedProfile
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
};

/**
 * @route   PUT /api/profile/update
 * @desc    Update profile design and content
 * @access  Private
 */
export const updateProfile = async (req, res) => {
  try {
    const {
      slug,
      profileImage,
      bio,
      titleType,
      titleText,
      title,        // frontend sends 'title', maps to titleText
      logoUrl,
      titleAlignment,
      titleFontSize,
      titleFontWeight,
      titleColor,
      titleFont,
      titleStyle,
      titleSize,
      profileLayout,
      profileSize,
      profileShape,
      wallpaperStyle,
      backgroundColor,
      gradientFrom,
      gradientTo,
      gradientAngle,
      gradientColor,
      gradientDirection,
      backgroundImage,
      backgroundVideo,
      backgroundPattern,
      blurEffect,
      blurIntensity,
      noiseEffect,
      noiseOpacity,
      noise,
      imageEffects,
      imageEffect,
      imageTint,
      footerText,
      footerVisible,
      metaTitle,
      metaDescription,
      buttonStyle,
      cornerRoundness,
      buttonColor,
      buttonTextColor,
      buttonShadow,
      pageTextFont,
      pageTextColor,
      theme,
    } = req.body;

    // Check if slug is taken by another user
    if (slug) {
      const existing = await prisma.profile.findFirst({
        where: {
          AND: [
            { slug },
            { userId: { not: req.user.id } }
          ]
        }
      });

      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'Slug already taken'
        });
      }
    }

    const profile = await prisma.profile.update({
      where: { userId: req.user.id },
      data: {
        // Basic
        ...(slug && { slug }),
        ...(profileImage !== undefined && { profileImage }),
        ...(bio !== undefined && { bio }),

        // Title
        ...(titleType && { titleType }),
        ...(titleText !== undefined && { titleText }),
        ...(title !== undefined && { titleText: title }), // map frontend 'title' → 'titleText'
        ...(logoUrl !== undefined && { logoUrl }),
        ...(titleAlignment && { titleAlignment }),
        ...(titleFontSize && { titleFontSize }),
        ...(titleFontWeight && { titleFontWeight }),
        ...(titleColor && { titleColor }),
        ...(titleFont !== undefined && { titleFont }),
        ...(titleStyle !== undefined && { titleStyle }),
        ...(titleSize !== undefined && { titleSize }),

        // Profile Style
        ...(profileLayout && { profileLayout }),
        ...(profileSize && { profileSize }),
        ...(profileShape && { profileShape }),

        // Background
        ...(wallpaperStyle && { wallpaperStyle }),
        ...(backgroundColor !== undefined && { backgroundColor }),
        ...(gradientFrom !== undefined && { gradientFrom }),
        ...(gradientTo !== undefined && { gradientTo }),
        ...(gradientAngle !== undefined && { gradientAngle }),
        ...(gradientColor !== undefined && { gradientColor }),
        ...(gradientDirection !== undefined && { gradientDirection }),
        ...(backgroundImage !== undefined && { backgroundImage }),
        ...(backgroundVideo !== undefined && { backgroundVideo }),
        ...(backgroundPattern !== undefined && { backgroundPattern }),

        // Effects
        ...(blurEffect !== undefined && { blurEffect }),
        ...(blurIntensity !== undefined && { blurIntensity }),
        ...(noiseEffect !== undefined && { noiseEffect }),
        ...(noiseOpacity !== undefined && { noiseOpacity }),
        ...(noise !== undefined && { noise }),
        ...(imageEffects !== undefined && { imageEffects }),
        ...(imageEffect !== undefined && { imageEffect }),
        ...(imageTint !== undefined && { imageTint }),

        // Footer
        ...(footerText !== undefined && { footerText }),
        ...(footerVisible !== undefined && { footerVisible }),

        // SEO
        ...(metaTitle !== undefined && { metaTitle }),
        ...(metaDescription !== undefined && { metaDescription }),

        // Buttons
        ...(buttonStyle !== undefined && { buttonStyle }),
        ...(cornerRoundness !== undefined && { cornerRoundness }),
        ...(buttonColor !== undefined && { buttonColor }),
        ...(buttonTextColor !== undefined && { buttonTextColor }),
        ...(buttonShadow !== undefined && { buttonShadow }),

        // Text
        ...(pageTextFont !== undefined && { pageTextFont }),
        ...(pageTextColor !== undefined && { pageTextColor }),

        // Theme
        ...(theme !== undefined && { theme }),
      }
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: profile
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/profile/analytics
 * @desc    Get profile analytics
 * @access  Private
 */
export const getProfileAnalytics = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    
    const profile = await prisma.profile.findUnique({
      where: { userId: req.user.id }
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const analytics = await prisma.analytics.findMany({
      where: {
        profileId: profile.id,
        date: { gte: startDate }
      },
      orderBy: { date: 'desc' }
    });

    // Aggregate stats
    const totalViews = analytics.reduce((sum, a) => sum + a.views, 0);
    const totalClicks = analytics.reduce((sum, a) => sum + a.clicks, 0);
    
    // Get link clicks
    const linkClicks = await prisma.linkClick.findMany({
      where: {
        link: {
          profileId: profile.id
        },
        clickedAt: { gte: startDate }
      },
      include: {
        link: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });

    // Group by link
    const clicksByLink = linkClicks.reduce((acc, click) => {
      const linkId = click.link.id;
      if (!acc[linkId]) {
        acc[linkId] = {
          linkId,
          linkTitle: click.link.title,
          clicks: 0
        };
      }
      acc[linkId].clicks++;
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        overview: {
          totalViews,
          totalClicks,
          clickThroughRate: totalViews > 0 ? (totalClicks / totalViews * 100).toFixed(2) : 0
        },
        timeline: analytics,
        topLinks: Object.values(clicksByLink).sort((a, b) => b.clicks - a.clicks).slice(0, 10)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/profile/check-slug/:slug
 * @desc    Check if slug is available
 * @access  Public
 */
export const checkSlugAvailability = async (req, res) => {
  try {
    const { slug } = req.params;

    const exists = await prisma.profile.findUnique({
      where: { slug },
      select: { id: true }
    });

    res.json({
      success: true,
      available: !exists
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking slug',
      error: error.message
    });
  }
};
