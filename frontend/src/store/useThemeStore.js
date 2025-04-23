import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "dark",
  isChangingTheme: false,
  setTheme: async (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
