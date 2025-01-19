import { Brand } from "@/entities/brand/types.ts";
import { formattedDate } from "@/utils/date.ts";

export function BrandCard({ brand }: { brand: Brand }) {
  return (
    <ul
      key={brand.id}
      className="p-6 rounded-xl bg-white/20 hover:bg-white/30 transition-all shadow-lg w-full text-white text-center backdrop-blur-lg transform hover:scale-105 duration-300 flex flex-col h-full justify-between min-h-[250px] sm:min-h-[280px] lg:min-h-[300px]"
    >
      <li className="flex flex-col gap-1 whitespace-nowrap overflow-hidden text-ellipsis">
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
      <p className="text-sm text-gray-300 font-bold mt-auto whitespace-nowrap">
        {formattedDate(brand.createdAt)}
      </p>
    </ul>
  );
}
