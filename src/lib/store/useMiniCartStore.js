import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useMiniCartStore = create(
  persist(
    (set) => ({
      isMiniCartOpen: false, // Default state: closed
      toggleMiniCart: () => set((state) => ({ isMiniCartOpen: !state.isMiniCartOpen })), 
      setMiniCartOpen: (value) => set({ isMiniCartOpen: value }), // Directly set state
    }),
    {
      name: 'mini-cart-store', // Key for localStorage
    }
  )
);

export default useMiniCartStore;
