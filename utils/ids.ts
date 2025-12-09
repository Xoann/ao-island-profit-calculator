import { Crop } from "./types";

export const getCropName = (itemId: Crop): string => {
  const names: Record<Crop, string> = {
    T1_CARROT: "Carrot",
    T2_BEAN: "Beans",
    T3_WHEAT: "Wheat",
    T4_TURNIP: "Turnips",
    T5_CABBAGE: "Cabbage",
    T6_POTATO: "Potatoes",
    T7_CORN: "Corn",
    T8_PUMPKIN: "Pumpkin",
    T2_AGARIC: "Arcane Agaric",
    T3_COMFREY: "Brightleaf Comfrey",
    T4_BURDOCK: "Crenellated Burdock",
    T5_TEASEL: "Dragon Teasel",
    T6_FOXGLOVE: "Elusive Foxglove",
    T7_MULLEIN: "Firetouch Mullein",
    T8_YARROW: "Ghoul Yarrow",
  };

  return names[itemId];
};

export const getSilver = (amount: number): string => {
  return Math.round(amount).toLocaleString();
};
