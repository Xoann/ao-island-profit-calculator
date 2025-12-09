import { getCropName, getSilver } from "@/utils/ids";
import { City, Crop } from "@/utils/types";

type Props = {
  results: Record<City, { crop: Crop; profit: number } | undefined>;
};

export default function BestCropDisplay({ results }: Props) {
  const cities = Object.keys(results) as City[];

  // Compute total profit across all cities
  const totalProfit = cities.reduce((sum, city) => {
    const entry = results[city];
    return entry ? sum + entry.profit : sum;
  }, 0);

  return (
    <div className="flex flex-col gap-6 p-4 w-full">
      {/* City Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cities.map((city) => {
          const entry = results[city];
          if (!entry) return null;

          return (
            <div
              key={city}
              className="
                bg-gray-800 border border-gray-700 rounded-xl
                p-4 flex flex-col gap-1 shadow-md
              "
            >
              <h2 className="text-lg font-semibold text-white">{city}</h2>

              <p className="text-sm text-gray-300">
                <span className="font-medium">Best Crop:</span>{" "}
                {getCropName(entry.crop)}
              </p>

              <p className="text-sm text-gray-300">
                <span className="font-medium">Profit:</span>{" "}
                {getSilver(entry.profit)} silver
              </p>
            </div>
          );
        })}
      </div>

      {/* Total Profit Row */}
      <div
        className="
          bg-gray-900 border border-gray-700 rounded-xl
          p-5 shadow-lg text-center
        "
      >
        <h2 className="text-xl font-bold text-white mb-1">
          Total Account Profit
        </h2>

        <p className="text-lg text-gray-300">{getSilver(totalProfit)} silver</p>
      </div>
    </div>
  );
}
