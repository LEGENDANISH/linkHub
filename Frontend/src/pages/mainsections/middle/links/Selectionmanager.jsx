import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ✅ KEY INSIGHT: Freeze the storage key at module load time.
// It reads whatever user is in localStorage RIGHT NOW (at app boot / after login).
// On logout we only remove auth keys — this key stays valid until next page load.
const STORAGE_KEY =
  `Linkhub_links_data_${JSON.parse(localStorage.getItem("user"))?.id || "guest"}`;

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

export const useSelection = create(
  persist(
    (set, get) => ({
      links: [],
      isLoaded: true,

     syncLink: (link) => {
  const normalized = normalizeLink(link);
  set((state) => {
    const currentLinks = Array.isArray(state.links) ? state.links : [];
    const exists = currentLinks.find(l => l.id === link.id);
    if (exists) {
      return { links: currentLinks.map(l => l.id === link.id ? normalized : l) };
    } else {
      return { links: [...currentLinks, normalized] };
    }
  });
},

      syncLinks: (linksArray) => {
        const normalized = linksArray.map(normalizeLink);
        set({ links: normalized });
      },

     getLink: (linkId) => {
  const links = get().links;
  return Array.isArray(links) ? links.find(link => link.id === linkId) : undefined;
},

  updateLink: (linkId, updates) => {
  set((state) => ({
    links: Array.isArray(state.links) ? state.links.map(link =>
      link.id === linkId
        ? { ...link, ...updates, updatedAt: new Date().toISOString() }
        : link
    ) : []
  }));
},

deleteLink: (linkId) => {
  set((state) => ({
    links: Array.isArray(state.links) ? state.links.filter(link => link.id !== linkId) : []
  }));
},

      toggleLinkActive: (linkId) => {
const links = get().links;
const link = Array.isArray(links) && links.find(l => l.id === linkId);
        if (link) {
          get().updateLink(linkId, { active: !link.active });
        }
      },

      updateLayout: (linkId, layout) => {
        get().updateLink(linkId, { layout });
      },

      updateAnimation: (linkId, animation) => {
        get().updateLink(linkId, { animation });
      },

      updateThumbnail: (linkId, thumbnail) => {
        get().updateLink(linkId, { thumbnail });
      },

      toggleLinkLocked: (linkId) => {
const links = get().links;
const link = Array.isArray(links) && links.find(l => l.id === linkId);        if (link) {
          get().updateLink(linkId, { locked: !link.locked });
        }
      },

   
getActiveLinks: () => {
  const links = get().links;
  return Array.isArray(links) ? links.filter(link => link.active) : [];
},

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

// ✅ Call after localStorage.setItem('user', ...) on login
// Reads saved links for that userId and mounts them into the store.
// If userId doesn't match any saved data (new or different user) → resets to empty.
export const rehydrateLinksForUser = (userId) => {
  try {
    const key = `Linkhub_links_data_${userId}`;
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.state?.links) {
        useSelection.setState({ links: parsed.state.links });
        console.log("✅ Links rehydrated for user:", userId);
        return;
      }
    }
    useSelection.setState({ links: [] });
    console.log("ℹ️ No saved links for user:", userId, "— starting fresh");
  } catch (e) {
    console.error("Failed to rehydrate links:", e);
    useSelection.setState({ links: [] });
  }
};  