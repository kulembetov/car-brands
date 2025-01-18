import { supabase } from '@/app/supabase.ts';
import { Brand } from '@/entities/brand/types.ts';

export const fetchBrands = async (): Promise<Brand[]> => {
  const { data, error } = await supabase.from('brands').select('*');
  if (error) throw error;
  return data as Brand[];
};
