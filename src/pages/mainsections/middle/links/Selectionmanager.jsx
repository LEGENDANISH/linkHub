import { useState, useEffect } from 'react';

/**
 * SelectionManager - Centralized state management for all link data
 * Works silently in the background - components don't need to change!
 */

const STORAGE_KEY = 'linktree_links_data';

// Ensure link has all required fields
const normalizeLink = (link) => ({
  id: link.id,
  name: link.name || '',
  url: link.url || '',
  active: link.active !== undefined ? link.active : true,
  clicks: link.clicks || 0,
  layout: link.layout || 'classic',
  thumbnail: link.thumbnail || null,
  animation: link.animation || 'none',
  locked: link.locked || false,
  schedule: link.schedule || null,
  redirect: link.redirect || null,
  createdAt: link.createdAt || new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

/**
 * Custom hook for managing links with localStorage persistence
 */
export const useSelectionManager = () => {
  const [links, setLinks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load links from localStorage on mount
  useEffect(() => {
    loadLinksFromStorage();
  }, []);

  // Save to localStorage whenever links change
  useEffect(() => {
    if (isLoaded && links.length > 0) {
      saveLinksToStorage(links);
    }
  }, [links, isLoaded]);

  const loadLinksFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setLinks(parsed.map(normalizeLink));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  };

  const saveLinksToStorage = (linksData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(linksData));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // Sync external link updates to SelectionManager
  const syncLink = (link) => {
    const normalized = normalizeLink(link);
    setLinks(prevLinks => {
      const exists = prevLinks.find(l => l.id === link.id);
      if (exists) {
        // Update existing link
        return prevLinks.map(l => l.id === link.id ? normalized : l);
      } else {
        // Add new link
        return [...prevLinks, normalized];
      }
    });
  };

  // Sync multiple links
  const syncLinks = (linksArray) => {
    const normalized = linksArray.map(normalizeLink);
    setLinks(normalized);
  };

  const getLink = (linkId) => {
    return links.find(link => link.id === linkId);
  };

  const updateLink = (linkId, updates) => {
    setLinks(prevLinks =>
      prevLinks.map(link =>
        link.id === linkId
          ? { ...link, ...updates, updatedAt: new Date().toISOString() }
          : link
      )
    );
  };

  const deleteLink = (linkId) => {
    setLinks(prevLinks => prevLinks.filter(link => link.id !== linkId));
  };

  const toggleLinkActive = (linkId) => {
    const link = links.find(l => l.id === linkId);
    if (link) {
      updateLink(linkId, { active: !link.active });
    }
  };

  const updateLayout = (linkId, layout) => {
    updateLink(linkId, { layout });
  };

  const updateAnimation = (linkId, animation) => {
    updateLink(linkId, { animation });
  };

  const updateThumbnail = (linkId, thumbnail) => {
    updateLink(linkId, { thumbnail });
  };

  const toggleLinkLocked = (linkId) => {
    const link = links.find(l => l.id === linkId);
    if (link) {
      updateLink(linkId, { locked: !link.locked });
    }
  };

  const getActiveLinks = () => {
    return links.filter(link => link.active);
  };

  return {
    links,
    isLoaded,
    syncLink,
    syncLinks,
    getLink,
    updateLink,
    deleteLink,
    toggleLinkActive,
    updateLayout,
    updateAnimation,
    updateThumbnail,
    toggleLinkLocked,
    getActiveLinks,
  };
};

// Context provider (optional)
import React, { createContext, useContext } from 'react';

const SelectionContext = createContext(null);

export const SelectionProvider = ({ children }) => {
  const selectionManager = useSelectionManager();
  
  return (
    <SelectionContext.Provider value={selectionManager}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within SelectionProvider');
  }
  return context;
};

export default useSelectionManager;