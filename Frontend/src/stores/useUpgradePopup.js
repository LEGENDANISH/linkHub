import { create } from "zustand";

export const useUpgradePopup = create((set) => ({
  open: false,
  feature: null,

  showPopup: (feature) => set({ open: true, feature }),
  closePopup: () => set({ open: false, feature: null }),
}));
