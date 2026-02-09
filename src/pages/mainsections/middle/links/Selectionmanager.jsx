import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
 * Zustand store for managing links with localStorage persistence
 */
export const useSelection = create(
  persist(
    (set, get) => ({
      links: [],
      isLoaded: true,

      // Sync external link updates
      syncLink: (link) => {
        const normalized = normalizeLink(link);
        set((state) => {
          const exists = state.links.find(l => l.id === link.id);
          if (exists) {
            return {
              links: state.links.map(l => l.id === link.id ? normalized : l)
            };
          } else {
            return {
              links: [...state.links, normalized]
            };
          }
        });
      },

      // Sync multiple links
      syncLinks: (linksArray) => {
        const normalized = linksArray.map(normalizeLink);
        set({ links: normalized });
      },

      // Get single link
      getLink: (linkId) => {
        return get().links.find(link => link.id === linkId);
      },

      // Update link
      updateLink: (linkId, updates) => {
        set((state) => ({
          links: state.links.map(link =>
            link.id === linkId
              ? { ...link, ...updates, updatedAt: new Date().toISOString() }
              : link
          )
        }));
      },

      // Delete link
      deleteLink: (linkId) => {
        set((state) => ({
          links: state.links.filter(link => link.id !== linkId)
        }));
      },

      // Toggle link active
      toggleLinkActive: (linkId) => {
        const link = get().links.find(l => l.id === linkId);
        if (link) {
          get().updateLink(linkId, { active: !link.active });
        }
      },

      // Update layout
      updateLayout: (linkId, layout) => {
        get().updateLink(linkId, { layout });
      },

      // Update animation
      updateAnimation: (linkId, animation) => {
        get().updateLink(linkId, { animation });
      },

      // Update thumbnail
      updateThumbnail: (linkId, thumbnail) => {
        get().updateLink(linkId, { thumbnail });
      },

      // Toggle locked
      toggleLinkLocked: (linkId) => {
        const link = get().links.find(l => l.id === linkId);
        if (link) {
          get().updateLink(linkId, { locked: !link.locked });
        }
      },

      // Get active links
      getActiveLinks: () => {
        return get().links.filter(link => link.active);
      },

      // Add new link
      addLink: (link) => {
        const normalized = normalizeLink({
          ...link,
          id: link.id || Date.now()
        });
        set((state) => ({
          links: [normalized, ...state.links]
        }));
      },
    }),
    {
      name: STORAGE_KEY,
    }
  )
);