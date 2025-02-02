import { useCarStore } from "@/entities/brand/store.ts";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BrandCard } from "@/features/brand-card/ui.tsx";
import { SocialLinks } from "@/features/social-links/ui.tsx";
import { brandSchema, Brand } from "@/entities/brand/types.ts";

export function BrandList() {
  const {
    brands,
    fetchBrands,
    addCar,
    isLoading,
    isAuthenticated,
    isAdmin,
    loginAsGuest,
    loginAsAdmin,
    logout,
  } = useCarStore();

  const [showAdminInput, setShowAdminInput] = useState(false);
  const [code, setCode] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Brand, "id">>({
    resolver: zodResolver(brandSchema.omit({ id: true })),
    defaultValues: {
      brand_name: "",
      country: "",
      founded: 1800,
      popular_model: "",
      luxury_division: "None",
      createdAt: new Date().toISOString(),
    },
  });

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const onSubmit = async (data: Omit<Brand, "id">) => {
    try {
      await addCar(data);
      reset();
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
        <button onClick={loginAsGuest}>Continue as User</button>
        {!showAdminInput && (
          <button onClick={() => setShowAdminInput(true)}>
            Continue as Admin
          </button>
        )}
        {showAdminInput && (
          <>
            <input
              type="password"
              placeholder="Enter Admin Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="input"
            />
            <button onClick={() => loginAsAdmin(code)}>Login</button>
          </>
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center p-6">
        <p className="text-white text-lg font-semibold animate-pulse mb-4">
          Fetching brands...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-7xl p-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Car Brands
        </h2>

        {isAdmin && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-8 space-y-4 w-full max-w-lg"
          >
            <div>
              <input
                {...register("brand_name")}
                placeholder="Brand Name"
                className="input"
              />
              {errors.brand_name && (
                <p className="text-red-400">{errors.brand_name.message}</p>
              )}
            </div>
            <div>
              <input
                {...register("country")}
                placeholder="Country"
                className="input"
              />
              {errors.country && (
                <p className="text-red-400">{errors.country.message}</p>
              )}
            </div>
            <div>
              <input
                {...register("founded", { valueAsNumber: true })}
                type="number"
                placeholder="Founded Year"
                className="input"
              />
              {errors.founded && (
                <p className="text-red-400">{errors.founded.message}</p>
              )}
            </div>
            <div>
              <input
                {...register("popular_model")}
                placeholder="Popular Model"
                className="input"
              />
              {errors.popular_model && (
                <p className="text-red-400">{errors.popular_model.message}</p>
              )}
            </div>
            <div>
              <input
                {...register("luxury_division")}
                placeholder="Luxury Division"
                className="input"
              />
              {errors.luxury_division && (
                <p className="text-red-400">{errors.luxury_division.message}</p>
              )}
            </div>
            <div className="flex justify-between gap-4">
              <button type="submit" className="w-full">
                Add Car
              </button>
              <button type="button" className="w-full" onClick={logout}>
                Logout
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {brands
            .slice()
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((brand) => (
              <BrandCard
                key={brand.id}
                brand={brand}
                showDeleteButton={isAdmin}
              />
            ))}
        </div>
      </div>
      <SocialLinks />
    </div>
  );
}
