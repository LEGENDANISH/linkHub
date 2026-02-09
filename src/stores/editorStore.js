import { create } from "zustand";
import { persist } from "zustand/middleware";

const defaultDesignState = {
  profileImage: null,
  profileLayout: "classic",
  title: "",
  titleStyle: "text",
  titleSize: "small",
  titleFont: "Inter",
  titleColor: "#000000",
  theme: "custom",
  wallpaper: "fill",
  backgroundColor: "#7F2AEB",
  pageTextColor: "#ffffff",
  buttonColor: "#E058D6",
  buttonTextColor: "#000000",
  buttonStyle: "rounded",
  buttonShadow: false,
  footerText: "",
  accentColor: "#000000",
};

export const useEditorStore = create(
  persist(
    (set, get) => ({
      // ---------- STATE ----------
      design: defaultDesignState,
      links: [],

      // ---------- DESIGN UPDATES ----------
      updateDesign: (key, value) =>
        set((state) => ({
          design: { ...state.design, [key]: value },
        })),

      updateDesignBatch: (updates) =>
        set((state) => ({
          design: { ...state.design, ...updates },
        })),

      resetDesign: () => set({ design: defaultDesignState }),

      getDesignValue: (key) => get().design[key],

      // ---------- LINKS ----------
      setLinks: (links) => set({ links }),

      addLink: (link) =>
        set((state) => ({
          links: [...state.links, link],
        })),

      updateLink: (id, updates) =>
        set((state) => ({
          links: state.links.map((l) =>
            l.id === id ? { ...l, ...updates } : l
          ),
        })),

      deleteLink: (id) =>
        set((state) => ({
          links: state.links.filter((l) => l.id !== id),
        })),

      // ---------- BACKEND INTEGRATION POINT ----------
      syncToBackend: async () => {
        const { design, links } = get();

        await fetch("/api/design/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ design, links }),
        });
      },
    }),
    {
      name: "linkhub-storage", // localStorage key
    }
  )
);
