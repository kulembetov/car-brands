import { supabase } from '@/app/supabase.ts';
import { create } from 'zustand';
import { Brand, CarStore } from '@/entities/brand/types.ts';
import { cacheBrands, getCachedBrands } from './model.ts';

export const useCarStore = create<CarStore>((set) => ({
  brands: [],
  isLoading: false,

  fetchBrands: async () => {
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
}));
