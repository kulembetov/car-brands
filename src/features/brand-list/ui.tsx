import { useCarStore } from "@/entities/brand/store.ts";
import { useEffect } from "react";
import { BrandCard } from "@/features/brand-card/ui.tsx";
import { SocialLinks } from "@/features/social-links/ui.tsx";

export function BrandList() {
  const { brands, isLoading, fetchBrands } = useCarStore();

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading brands...</p>;
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6 bg-gradient-to-br">
      <div className="w-full max-w-7xl bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl border border-white/20 p-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Car Brands
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {brands
            .slice()
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
        </div>
      </div>
      <SocialLinks />
    </div>
  );
}
