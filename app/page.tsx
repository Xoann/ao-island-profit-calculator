"use client";
import { useEffect, useState } from "react";
import { City, Crop, FarmingDataEntry, PlotCounts } from "@/utils/types";
import { computeAveragePrice, computeEstProfit } from "@/utils/analyzers";
import PlotCountInputs from "@/components/PlotCountInputs";
import BestCropDisplay from "@/components/BestCropDisplay";

type BestCropInfo = { crop: Crop; profit: number };

export default function Home() {
  const [farmingData, setFarmingData] = useState<FarmingDataEntry[]>([]);

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

  // 🔹 bestCrops now stores { crop, profit } per city
  const [bestCrops, setBestCrops] = useState<
    Record<City, BestCropInfo | undefined>
  >({
    Lymhurst: undefined,
    Bridgewatch: undefined,
    Martlock: undefined,
    "Fort Sterling": undefined,
    Thetford: undefined,
    Caerleon: undefined,
    Brecilien: undefined,
  });

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

  // 🔹 Compute best crop + profit per city
  useEffect(() => {
    const bestByCity: Record<City, BestCropInfo | undefined> = {
      Lymhurst: undefined,
      Bridgewatch: undefined,
      Martlock: undefined,
      "Fort Sterling": undefined,
      Thetford: undefined,
      Caerleon: undefined,
      Brecilien: undefined,
    };

    for (const entry of farmingData) {
      const { item_id, location, data } = entry; // item_id: Crop, location: City
      const price = computeAveragePrice(data);

      const estProfit = computeEstProfit(
        item_id,
        location,
        price,
        plotCounts[location]
      );

      const current = bestByCity[location];

      if (!current || estProfit > current.profit) {
        bestByCity[location] = {
          crop: item_id,
          profit: estProfit,
        };
      }
    }

    setBestCrops(bestByCity);
  }, [farmingData, plotCounts]);

  return (
    <div className="flex min-h-screen flex-col gap-6 items-center justify-center bg-zinc-50 font-sans dark:bg-black p-6">
      <PlotCountInputs plotCounts={plotCounts} onChange={updatePlotCount} />

      <BestCropDisplay results={bestCrops} />
    </div>
  );
}
