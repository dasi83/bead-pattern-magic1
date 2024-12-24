export type ColorPalette = {
  name: string;
  manufacturer: string;
  colors: string[];
  activeColors: boolean[];
};

export const colorPalettes: ColorPalette[] = [
  {
    name: "Hama Standard",
    manufacturer: "Hama",
    colors: [
      "#FFFFFF", "#000000", "#FF0000", "#FFD700",
      "#FFA500", "#FFFF00", "#90EE90", "#008000",
      "#87CEEB", "#0000FF", "#4B0082", "#800080",
      "#FFC0CB", "#8B4513", "#808080", "#A0522D",
    ],
    activeColors: Array(16).fill(true)
  },
  {
    name: "Perler Original",
    manufacturer: "Perler",
    colors: [
      "#FFFFFF", "#000000", "#FF0000", "#FFA500",
      "#FFD700", "#FFFF00", "#32CD32", "#008000",
      "#00FFFF", "#0000FF", "#800080", "#FF69B4",
      "#8B4513", "#A0522D", "#C0C0C0", "#808080",
    ],
    activeColors: Array(16).fill(true)
  },
  {
    name: "Artkal Mini",
    manufacturer: "Artkal",
    colors: [
      "#FFFFFF", "#000000", "#FF0000", "#FFA500",
      "#FFD700", "#FFFF00", "#90EE90", "#008000",
      "#00FFFF", "#0000FF", "#4B0082", "#800080",
      "#FF69B4", "#8B4513", "#C0C0C0", "#808080",
    ],
    activeColors: Array(16).fill(true)
  }
];