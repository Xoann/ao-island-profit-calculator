export type FarmingDataEntry = {
  item_id: Crop;
  location: City;
  quality: number;
  data: ItemSaleData[];
};

export type ItemSaleData = {
  item_count: string;
  avg_price: number;
  timestamp: string;
};

export type Crop =
  | "T1_CARROT"
  | "T2_BEAN"
  | "T3_WHEAT"
  | "T4_TURNIP"
  | "T5_CABBAGE"
  | "T6_POTATO"
  | "T7_CORN"
  | "T8_PUMPKIN"
  | "T2_AGARIC"
  | "T3_COMFREY"
  | "T4_BURDOCK"
  | "T5_TEASEL"
  | "T6_FOXGLOVE"
  | "T7_MULLEIN"
  | "T8_YARROW";

export type City =
  | "Lymhurst"
  | "Bridgewatch"
  | "Martlock"
  | "Fort Sterling"
  | "Thetford"
  | "Caerleon"
  | "Brecilien";

export type PlotCounts = Record<City, number>;
