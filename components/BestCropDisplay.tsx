import { useState } from "react";
import { getCropName, getSilver } from "@/utils/ids";
import { City, CityResult } from "@/utils/types";
import CityDetailsPanel from "@/components/CityDetailsPanel";

type Props = {
  allCityData: Record<City, CityResult[]>;
};

export default function BestCropDisplay({ allCityData }: Props) {
  const cities = Object.keys(allCityData) as City[];

  const totalProfit = cities.reduce((sum, city) => {
    const rows = allCityData[city] || [];
    const best = rows[0];
    return best ? sum + best.profit : sum;
  }, 0);

  const [activeCity, setActiveCity] = useState<City | null>(null);

  const handleCityClick = (city: City) => {
    setActiveCity((prev) => (prev === city ? null : city));
  };

  const activeCityRows =
    activeCity != null ? allCityData[activeCity] ?? [] : [];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Title + tooltip */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-amber-300 tracking-wide">
            City Profit Overview
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Click a city to inspect all crops and their estimated profits.
          </p>
        </div>

        {/* Tooltip (how profit is calculated) */}
        <div className="relative group inline-flex items-center justify-end text-xs text-slate-300">
          <button
            type="button"
            className="
              inline-flex items-center gap-1
              rounded-full border border-amber-900/70 bg-slate-950/80
              px-2.5 py-1
              text-[11px] uppercase tracking-[0.16em] text-amber-200/80
              shadow-[0_0_10px_rgba(0,0,0,0.7)]
            "
          >
            <span>Profit Formula</span>
            <span
              className="
                flex h-4 w-4 items-center justify-center
                rounded-full bg-amber-400/90 text-[10px] font-bold text-slate-950
              "
            >
              ?
            </span>
          </button>

          {/* Tooltip bubble */}
          <div
            className="
              pointer-events-none absolute right-0 top-full z-10 mt-2
              w-80 rounded-md border border-amber-900/80 bg-slate-950/95
              px-3 py-2 text-[11px] text-slate-200 shadow-[0_0_18px_rgba(0,0,0,0.8)]
              opacity-0 translate-y-1
              transition-opacity transition-transform duration-150
              group-hover:opacity-100 group-hover:translate-y-0
            "
          >
            <p className="font-semibold text-amber-300 mb-1">
              How profits are calculated
            </p>
            <p className="mb-1">
              For each crop in a city, profit is estimated with:
            </p>
            <p className="font-mono text-[10px] leading-snug mb-2 text-amber-100">
              Profit = ( [ 9 × bonus × cropPrice − (1 − seedYield) × seedPrice ]
              × 9 × plotCount ) × (1 − tax − setupFee)
            </p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>
                <span className="font-medium">9</span> = average harvest per
                plot.
              </li>
              <li>
                <span className="font-medium">bonus</span> = city farming bonus
                multiplier (e.g. 1.10 in bonus cities).
              </li>
              <li>
                <span className="font-medium">cropPrice</span> = estimated sell
                price per crop with buy orders.
              </li>
              <li>
                <span className="font-medium">seedYield</span> = expected seed
                return rate.
              </li>
              <li>
                <span className="font-medium">seedPrice</span> = market price
                per seed.
              </li>
              <li>
                <span className="font-medium">plotCount</span> = number of
                island plots you configured for that city.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* City Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cities.map((city) => {
          const rows = allCityData[city] || [];
          if (rows.length === 0) return null;

          const best = rows[0];
          const isActive = activeCity === city;

          return (
            <button
              key={city}
              type="button"
              onClick={() => handleCityClick(city)}
              className={`
                group relative overflow-hidden rounded-xl text-left
                bg-slate-950/80 border shadow-md
                transition-all
                ${
                  isActive
                    ? "border-amber-400/90 shadow-[0_0_30px_rgba(0,0,0,0.9)]"
                    : "border-amber-900/60 hover:border-amber-400/80 hover:shadow-[0_0_26px_rgba(0,0,0,0.85)]"
                }
              `}
            >
              {/* top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-orange-700 via-amber-400 to-orange-700" />

              <div className="px-4 py-3 space-y-2">
                <header className="flex items-center justify-between gap-2">
                  <h2 className="text-base font-semibold text-amber-300">
                    {city}
                  </h2>
                  <span className="rounded-md border border-amber-900/70 bg-slate-900/70 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-amber-200/80">
                    Best Crop
                  </span>
                </header>

                <p className="text-sm text-slate-200">
                  {getCropName(best.crop)}
                </p>

                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Profit
                  </span>
                  <span className="font-medium text-emerald-300">
                    {getSilver(best.profit)}{" "}
                    <span className="text-xs text-amber-200/80">silver</span>
                  </span>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  {isActive
                    ? "Click to hide all crops"
                    : "Click to view all crops & profits"}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Total Profit Row */}
      <div
        className="
          bg-slate-950/90 border border-amber-900/70 rounded-xl
          p-5 shadow-lg text-center relative overflow-hidden
        "
      >
        <div className="pointer-events-none absolute inset-x-0 -top-16 h-20 bg-gradient-to-b from-amber-400/20 to-transparent" />
        <div className="relative space-y-1.5">
          <h2 className="text-xl font-bold text-amber-300">
            Total Account Profit
          </h2>

          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Sum of best crop per city
          </p>

          <p className="text-lg sm:text-2xl text-emerald-300 font-semibold">
            {getSilver(totalProfit)}{" "}
            <span className="text-sm text-amber-200/80">silver</span>
          </p>
        </div>
      </div>

      <CityDetailsPanel activeCity={activeCity} rows={activeCityRows} />
    </div>
  );
}
