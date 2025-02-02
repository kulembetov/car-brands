import { supabase } from '@/app/supabase.ts';
import { create } from 'zustand';
import { Brand, CarStore } from '@/entities/brand/types.ts';
import { cacheBrands, getCachedBrands } from '@/entities/brand/model.ts';

export const useCarStore = create<CarStore>((set) => ({
  brands: [],
  isLoading: false,
  isAuthenticated: localStorage.getItem('isAuthenticated') !== null,
  isAdmin:
    localStorage.getItem('isAuthenticated') ===
    import.meta.env.VITE_SECRET_CODE,

  fetchBrands: async (): Promise<void> => {
    set({ isLoading: true });

    try {
      console.time('Supabase Fetch Time');
      const { data, error } = await supabase.from('brands').select('*');
      console.timeEnd('Supabase Fetch Time');

      if (error) throw error;

      console.time('IndexedDB Store Time');
      await cacheBrands(data as Brand[]);
      console.timeEnd('IndexedDB Store Time');

      set({ brands: data as Brand[] });
    } catch (error) {
      console.error('Error fetching brands from Supabase:', error);

      console.time('IndexedDB Fetch Time');
      const cachedBrands = await getCachedBrands();
      console.timeEnd('IndexedDB Fetch Time');

      set({ brands: cachedBrands });
    }

    set({ isLoading: false });
  },

  addCar: async (brand: Omit<Brand, 'id'>): Promise<void> => {
    set({ isLoading: true });

    try {
      const { data, error } = await supabase
        .from('brands')
        .insert([brand])
        .select('*')
        .single();

      if (error) throw error;

      if (data) {
        set((state) => ({
          brands: [
            ...state.brands,
            { ...data, createdAt: new Date(data.createdAt) },
          ],
        }));
      }
    } catch (error) {
      console.error('Error adding new car:', error);
    }

    set({ isLoading: false });
  },

  removeCar: async (id: number): Promise<void> => {
    set({ isLoading: true });

    try {
      const { error } = await supabase.from('brands').delete().eq('id', id);

      if (error) throw error;

      set((state) => ({
        brands: state.brands.filter((brand) => brand.id !== id),
      }));
    } catch (error) {
      console.error('Error removing car:', error);
    }

    set({ isLoading: false });
  },

  loginAsGuest: () => {
    localStorage.setItem('isAuthenticated', 'guest');
    set({ isAuthenticated: true });
  },

  loginAsAdmin: (code: string) => {
    if (code === import.meta.env.VITE_SECRET_CODE) {
      localStorage.setItem('isAuthenticated', code!);
      set({ isAuthenticated: true, isAdmin: true });
    } else {
      alert('Incorrect Code!');
    }
  },

  logout: () => {
    localStorage.removeItem('isAuthenticated');
    set({ isAuthenticated: false, isAdmin: false });
  },
}));
