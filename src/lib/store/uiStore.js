import { create } from "zustand";
import { persist } from "zustand/middleware";
import { log } from "../utils";

export const useUIStore = create(
  persist(
    (set) => ({
      // Initial state
      theme: "light",
      font: "Inter",

      // Actions
      setTheme: (newTheme) => {
        set({ theme: newTheme });
      },
      
      setFont: (newFont) => {
        set({ font: newFont });
      },

    }),
    {
      name: "ui-settings", // Key in localStorage
      getStorage: () => localStorage, // Correct way to use localStorage
    }
  )
);
