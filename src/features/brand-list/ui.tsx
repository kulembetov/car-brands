import { useCarStore } from "@/entities/brand/store.ts";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useEffect } from "react";

export const BrandList: React.FC = () => {
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
          {brands.map((brand) => (
            <ul
              key={brand.id}
              className="p-6 rounded-xl bg-white/20 hover:bg-white/30 transition-all shadow-lg w-full text-white text-center backdrop-blur-lg transform hover:scale-105 duration-300"
            >
              <li>
                <h3 className="text-xl font-semibold">{brand.brand_name}</h3>
                <p className="text-gray-300">
                  Founded: <span className="font-medium">{brand.founded}</span>
                </p>
                <p className="text-gray-300">
                  Country: <span className="font-medium">{brand.country}</span>
                </p>
                <p className="text-gray-300">
                  Popular Model:{" "}
                  <span className="font-medium">{brand.popular_model}</span>
                </p>
                <p className="text-gray-300">
                  Luxury Division:{" "}
                  <span className="font-medium">
                    {brand.luxury_division ? brand.luxury_division : "None"}
                  </span>
                </p>
              </li>
            </ul>
          ))}
        </div>
      </div>
      <footer className="fixed left-0 top-0 h-full hidden lg:flex flex-col justify-between items-center p-4">
        <div className="flex flex-col justify-center items-center gap-6 flex-grow">
          <ul className="flex flex-col gap-5">
            <li>
              <a href="https://github.com/kulembetov" target="_blank">
                <FaGithub
                  size={30}
                  className="text-purple-300 hover:scale-125 transition-transform duration-300"
                />
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/kulembetov" target="_blank">
                <FaLinkedin
                  size={30}
                  className="text-purple-300 hover:scale-125 transition-transform duration-300"
                />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/arturkulembetov" target="_blank">
                <FaTwitter
                  size={30}
                  className="text-purple-300 hover:scale-125 transition-transform duration-300"
                />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};
