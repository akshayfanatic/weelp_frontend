import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useProductFormStore = create(
  persist(
    (set) => ({
      formData: null,
      setFormData: (data) => set({ formData: data }),
    }),
    {
      name: 'product-form-store', // Key for localStorage
    }
  )
);

export default useProductFormStore;
