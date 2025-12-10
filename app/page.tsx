"use client";
import { useEffect, useState } from "react";
import {
  City,
  Crop,
  FarmingDataEntry,
  PlotCounts,
  CityResult,
} from "@/utils/types";
import {
  computeAveragePrice,
  computeEstCropCount,
  computeEstProfit,
  getSeedPrice,
  getSeedYield,
} from "@/utils/analyzers";
import PlotCountInputs from "@/components/PlotCountInputs";
import BestCropDisplay from "@/components/BestCropDisplay";

const EMPTY_CITY_RESULTS: Record<City, CityResult[]> = {
  Lymhurst: [],
  Bridgewatch: [],
  Martlock: [],
  "Fort Sterling": [],
  Thetford: [],
  Caerleon: [],
  Brecilien: [],
};

export default function Home() {
  const [farmingData, setFarmingData] = useState<FarmingDataEntry[]>([]);
  const [hasPremium, setHasPremium] = useState<boolean>(true);

  const [plotCounts, setPlotCounts] = useState<PlotCounts>({
    Lymhurst: 16,
    Bridgewatch: 16,
    Martlock: 16,
    "Fort Sterling": 16,
    Thetford: 16,
    Caerleon: 16,
    Brecilien: 16,
  });

  function updatePlotCount(city: City, value: number) {
    setPlotCounts((prev) => ({ ...prev, [city]: value }));
  }

  const [cityResults, setCityResults] =
    useState<Record<City, CityResult[]>>(EMPTY_CITY_RESULTS);

  useEffect(() => {
    const fetchFarmingData = async () => {
      try {
        const res = await fetch("/api/farming");
        if (!res.ok) {
          console.error("Failed to fetch farming data");
          return;
        }
        const data: FarmingDataEntry[] = await res.json();
        setFarmingData(data);
      } catch (err) {
        console.error("Error fetching farming data:", err);
      }
    };

    fetchFarmingData();
  }, []);

  // Compute all crops + profit per city
  useEffect(() => {
    const allByCity: Record<City, CityResult[]> = {
      Lymhurst: [],
      Bridgewatch: [],
      Martlock: [],
      "Fort Sterling": [],
      Thetford: [],
      Caerleon: [],
      Brecilien: [],
    };

    for (const entry of farmingData) {
      const { item_id, location, data } = entry;
      const price = computeAveragePrice(data);

      const estProfit = computeEstProfit(
        item_id,
        location,
        price,
        plotCounts[location],
        hasPremium
      );

      const estCropCount = computeEstCropCount(
        item_id,
        location,
        plotCounts[location]
      );

      const estSeedLoss =
        9 * plotCounts[location] * (1 - getSeedYield(item_id));

      allByCity[location].push({
        crop: item_id,
        profit: estProfit,
        estSellPrice: price,
        estCropCount,
        estSeedLoss,
        seedCost: getSeedPrice(item_id),
      });
    }

    (Object.keys(allByCity) as City[]).forEach((city) => {
      allByCity[city].sort((a, b) => b.profit - a.profit);
    });

    setCityResults(allByCity);
  }, [farmingData, plotCounts, hasPremium]);

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 dark:bg-black p-6">
      <div className="w-full max-w-5xl space-y-8">
        {/* Title card + premium toggle */}
        <div
          className="
            rounded-xl border border-amber-900/70 
            bg-slate-950/80 shadow-[0_0_28px_rgba(0,0,0,0.7)]
            px-6 py-5 relative overflow-hidden
          "
        >
          {/* Accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-700 via-amber-400 to-orange-700" />

          <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-amber-300 tracking-wide mb-1">
                Albion Farming Profit Calculator
              </h1>

              <p className="text-sm text-amber-200/80 tracking-wide">
                See the best crop to farm in each city based on market data
              </p>
            </div>

            {/* Premium toggle */}
            <button
              type="button"
              onClick={() => setHasPremium((prev) => !prev)}
              className={`
                self-center sm:self-auto
                inline-flex items-center gap-2
                rounded-full border px-3 py-1.5 text-xs
                uppercase tracking-[0.16em]
                shadow-[0_0_14px_rgba(0,0,0,0.7)]
                transition
                ${
                  hasPremium
                    ? "border-emerald-400/80 bg-emerald-500/15 text-emerald-200"
                    : "border-amber-900/80 bg-slate-950/90 text-amber-200/80 hover:border-amber-400/80"
                }
              `}
            >
              <span>Premium</span>
              <div
                className={`
                  flex items-center h-4 w-9 rounded-full px-0.5
                  transition-colors
                  ${hasPremium ? "bg-emerald-400/80" : "bg-slate-600"}
                `}
              >
                <div
                  className={`
                    h-3 w-3 rounded-full bg-slate-950 shadow
                    transform transition-transform
                    ${hasPremium ? "translate-x-5" : "translate-x-px"}
                  `}
                />
              </div>
              <span className="hidden sm:inline text-[10px] normal-case tracking-normal text-slate-300/80">
                {hasPremium
                  ? "Using 4% tax + 2.5% fee"
                  : "Using 8% tax + 2.5% fee"}
              </span>
            </button>
          </div>
        </div>

        {/* Plot configuration */}
        <PlotCountInputs plotCounts={plotCounts} onChange={updatePlotCount} />

        {/* Best crop cards + detail panel */}
        <BestCropDisplay allCityData={cityResults} />
      </div>
    </div>
  );
}
