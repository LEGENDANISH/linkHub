// utils/linksDataManager.js

/**
 * Utility functions to manage links data between localStorage and backend
 */

// Platform configuration with icons and default settings
export const platformConfig = {
  instagram: { 
    name: 'Instagram', 
    icon: '📷',
    urlPattern: 'instagram.com/',
    layout: 'pill' 
  },
  whatsapp: { 
    name: 'WhatsApp', 
    icon: '💬',
    urlPattern: 'wa.me/',
    layout: 'classic' 
  },
  tiktok: { 
    name: 'TikTok', 
    icon: '🎵',
    urlPattern: 'tiktok.com/@',
    layout: 'pill' 
  },
  youtube: { 
    name: 'YouTube', 
    icon: '▶️',
    urlPattern: 'youtube.com/',
    layout: 'classic' 
  },
  website: { 
    name: 'Website', 
    icon: '🌐',
    urlPattern: '',
    layout: 'classic' 
  },
  spotify: { 
    name: 'Spotify', 
    icon: '🎧',
    urlPattern: 'open.spotify.com/',
    layout: 'pill' 
  },
  threads: { 
    name: 'Threads', 
    icon: '🧵',
    urlPattern: 'threads.net/@',
    layout: 'pill' 
  },
  facebook: { 
    name: 'Facebook', 
    icon: '👥',
    urlPattern: 'facebook.com/',
    layout: 'classic' 
  },
  twitter: { 
    name: 'X / Twitter', 
    icon: '🐦',
    urlPattern: 'x.com/',
    layout: 'pill' 
  },
  linkedin: { 
    name: 'LinkedIn', 
    icon: '💼',
    urlPattern: 'linkedin.com/in/',
    layout: 'classic' 
  },
  twitch: { 
    name: 'Twitch', 
    icon: '🎮',
    urlPattern: 'twitch.tv/',
    layout: 'pill' 
  },
  snapchat: { 
    name: 'Snapchat', 
    icon: '👻',
    urlPattern: 'snapchat.com/add/',
    layout: 'classic' 
  },
};

/**
 * Format links for localStorage (matches your app's format)
 */
export const formatLinksForLocalStorage = (links) => {
  return {
    state: {
      links: links.map(link => ({
        id: link.id || Date.now() + Math.random(),
        name: link.name,
        url: ensureHttps(link.url),
        active: link.active !== undefined ? link.active : true,
        clicks: link.clicks || 0,
        layout: link.layout || 'classic',
        thumbnail: link.thumbnail || null,
        animation: link.animation || 'none',
        locked: link.locked || false,
        schedule: link.schedule || null,
        redirect: link.redirect || null,
        createdAt: link.createdAt || new Date().toISOString(),
        updatedAt: link.updatedAt || new Date().toISOString(),
      })),
      isLoaded: true
    },
    version: 0
  };
};

/**
 * Format links for backend API (matches Prisma schema)
 */
export const formatLinksForBackend = (selectedPlatforms, platformLinks, userGoal = 'personal') => {
  return selectedPlatforms.map((platformId, index) => {
    const config = platformConfig[platformId];
    const url = platformLinks[platformId] || '';
    
    return {
      name: config?.name || platformId.charAt(0).toUpperCase() + platformId.slice(1),
      url: ensureHttps(url),
      iconType: 'auto', // Let backend auto-detect or use 'emoji'
      thumbnail: null,
      layout: determineLayout(userGoal, platformId),
      animation: 'none',
      active: true,
      locked: false,
      schedule: null,
      redirect: null,
    };
  });
};

/**
 * Ensure URL has https:// prefix
 */
export const ensureHttps = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
};

/**
 * Determine layout based on user goal and platform
 */
export const determineLayout = (userGoal, platformId) => {
  const config = platformConfig[platformId];
  
  // Creator goal prefers pill layout for social platforms
  if (userGoal === 'creator') {
    return config?.layout || 'pill';
  }
  
  // Business prefers classic
  if (userGoal === 'business') {
    return 'classic';
  }
  
  // Personal can use platform defaults
  return config?.layout || 'classic';
};

/**
 * Save links to localStorage
 */
export const saveLinksToLocalStorage = (links) => {
  try {
    const formatted = formatLinksForLocalStorage(links);
    localStorage.setItem('links-storage', JSON.stringify(formatted));
    return true;
  } catch (error) {
    console.error('Error saving links to localStorage:', error);
    return false;
  }
};

/**
 * Get links from localStorage
 */
export const getLinksFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('links-storage');
    if (!data) return [];
    
    const parsed = JSON.parse(data);
    return parsed?.state?.links || [];
  } catch (error) {
    console.error('Error reading links from localStorage:', error);
    return [];
  }
};

/**
 * Merge backend response with local IDs
 */
export const mergeBackendResponseWithLocal = (localLinks, backendLinks) => {
  return backendLinks.map((backendLink, index) => {
    const localLink = localLinks[index];
    return {
      ...localLink,
      id: backendLink.data?.id || backendLink.id || localLink.id,
      createdAt: backendLink.data?.createdAt || backendLink.createdAt || localLink.createdAt,
      updatedAt: backendLink.data?.updatedAt || backendLink.updatedAt || localLink.updatedAt,
    };
  });
};

/**
 * Complete onboarding data sync
 */
export const syncOnboardingData = async (onboardingData, apiService) => {
  const { selectedPlatforms, platformLinks, userGoal, authToken, profileData } = onboardingData;
  
  try {
    // 1. Format links for backend
    const backendLinks = formatLinksForBackend(selectedPlatforms, platformLinks, userGoal);
    
    // 2. Format links for localStorage (with temporary IDs)
    const localLinks = backendLinks.map((link, index) => ({
      id: Date.now() + index,
      ...link,
      clicks: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    
    // 3. Save to localStorage immediately (offline-first)
    saveLinksToLocalStorage(localLinks);
    
    // 4. If we have auth token, sync with backend
    if (authToken) {
      try {
        // Create links on backend
        const createdLinks = await apiService.createMultipleLinks(authToken, backendLinks);
        
        // Merge backend IDs with local data
        const mergedLinks = mergeBackendResponseWithLocal(localLinks, createdLinks);
        
        // Update localStorage with backend IDs
        saveLinksToLocalStorage(mergedLinks);
        
        // Update profile if needed
        if (profileData?.bio || profileData?.username) {
          await apiService.updateProfile(authToken, {
            bio: profileData.bio,
            titleType: 'TEXT',
            titleText: profileData.username,
            profileLayout: userGoal === 'creator' ? 'HERO' : 'CLASSIC',
            wallpaperStyle: userGoal === 'creator' ? 'GRADIENT' : 'SOLID',
          });
        }
        
        return { success: true, links: mergedLinks, synced: true };
      } catch (apiError) {
        console.error('Backend sync failed:', apiError);
        return { success: true, links: localLinks, synced: false, error: apiError };
      }
    }
    
    return { success: true, links: localLinks, synced: false };
  } catch (error) {
    console.error('Error in syncOnboardingData:', error);
    return { success: false, error };
  }
};

/**
 * Get user's goal-based theme
 */
export const getThemeForGoal = (userGoal) => {
  const themes = {
    creator: {
      profileLayout: 'HERO',
      wallpaperStyle: 'GRADIENT',
      gradientFrom: '#667eea',
      gradientTo: '#764ba2',
      defaultLayout: 'pill',
    },
    business: {
      profileLayout: 'CLASSIC',
      wallpaperStyle: 'SOLID',
      backgroundColor: '#ffffff',
      defaultLayout: 'classic',
    },
    personal: {
      profileLayout: 'CLASSIC',
      wallpaperStyle: 'GRADIENT',
      gradientFrom: '#f093fb',
      gradientTo: '#f5576c',
      defaultLayout: 'classic',
    }
  };
  
  return themes[userGoal] || themes.personal;
};

export default {
  platformConfig,
  formatLinksForLocalStorage,
  formatLinksForBackend,
  ensureHttps,
  determineLayout,
  saveLinksToLocalStorage,
  getLinksFromLocalStorage,
  mergeBackendResponseWithLocal,
  syncOnboardingData,
  getThemeForGoal,
};