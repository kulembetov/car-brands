export type Brand = {
  id: number;
  brand_name: string;
  country: string;
  founded: number;
  popular_model: string;
  luxury_division: string;
};

export type CarStore = {
  brands: Brand[];
  isLoading: boolean;
  fetchBrands: () => Promise<void>;
};
