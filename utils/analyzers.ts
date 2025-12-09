import { bonusMap } from "@/utils/constants";
import { City, Crop, ItemSaleData } from "./types";

export const computeAveragePrice = (data: ItemSaleData[]): number => {
  return data[0].avg_price;
};

export const isBonus = (city: City, crop: Crop): boolean => {
  return bonusMap[city]?.includes(crop) ?? false;
};

export const getSeedPrice = (itemId: Crop): number => {
  const seedPrices = {
    T1_CARROT: 2312,
    T2_BEAN: 2468,
    T3_WHEAT: 5780,
    T4_TURNIP: 8670,
    T5_CABBAGE: 11560,
    T6_POTATO: 17340,
    T7_CORN: 26010,
    T8_PUMPKIN: 34680,
    T2_AGARIC: 2468,
    T3_COMFREY: 5780,
    T4_BURDOCK: 8670,
    T5_TEASEL: 11560,
    T6_FOXGLOVE: 17340,
    T7_MULLEIN: 26010,
    T8_YARROW: 34680,
  };

  return seedPrices[itemId];
};

export const getSeedYield = (itemId: Crop): number => {
  const seedYields = {
    T1_CARROT: 0.0,
    T2_BEAN: 0.33,
    T3_WHEAT: 0.6,
    T4_TURNIP: 0.73,
    T5_CABBAGE: 0.8,
    T6_POTATO: 0.87,
    T7_CORN: 0.91,
    T8_PUMPKIN: 0.93,
    T2_AGARIC: 0.33,
    T3_COMFREY: 0.6,
    T4_BURDOCK: 0.73,
    T5_TEASEL: 0.8,
    T6_FOXGLOVE: 0.87,
    T7_MULLEIN: 0.91,
    T8_YARROW: 0.93,
  };

  return seedYields[itemId];
};

export const computeEstProfit = (
  crop: Crop,
  city: City,
  salePrice: number,
  plotCount: number
): number => {
  const seedPrice = getSeedPrice(crop);
  const seedYield = getSeedYield(crop);
  const bonus = isBonus(city, crop) ? 1.1 : 1.0;

  // Compute estimated profit per plot
  const cropYieldPerSquare = 9 * bonus;
  const seedCostPerSquare = (1 - seedYield) * seedPrice;
  const squareEstProfit = cropYieldPerSquare * salePrice - seedCostPerSquare;
  const plotEstProfit = squareEstProfit * 9;
  return plotEstProfit * plotCount;
};
