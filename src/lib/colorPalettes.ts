export type ColorPalette = {
  name: string;
  manufacturer: string;
  colors: string[];
};

export const colorPalettes: ColorPalette[] = [
  {
    name: "Hama Standard",
    manufacturer: "Hama",
    colors: [
      "#FFFFFF", // Weiß
      "#000000", // Schwarz
      "#FF0000", // Rot
      "#FFD700", // Gold
      "#FFA500", // Orange
      "#FFFF00", // Gelb
      "#90EE90", // Hellgrün
      "#008000", // Grün
      "#87CEEB", // Himmelblau
      "#0000FF", // Blau
      "#4B0082", // Indigo
      "#800080", // Lila
      "#FFC0CB", // Rosa
      "#8B4513", // Braun
      "#808080", // Grau
      "#A0522D", // Sienna
    ]
  },
  {
    name: "Perler Original",
    manufacturer: "Perler",
    colors: [
      "#FFFFFF", // Weiß
      "#000000", // Schwarz
      "#FF0000", // Rot
      "#FFA500", // Orange
      "#FFD700", // Gold
      "#FFFF00", // Gelb
      "#32CD32", // Limette
      "#008000", // Grün
      "#00FFFF", // Cyan
      "#0000FF", // Blau
      "#800080", // Lila
      "#FF69B4", // Pink
      "#8B4513", // Braun
      "#A0522D", // Sienna
      "#C0C0C0", // Silber
      "#808080", // Grau
    ]
  },
  {
    name: "Artkal Mini",
    manufacturer: "Artkal",
    colors: [
      "#FFFFFF", // Weiß
      "#000000", // Schwarz
      "#FF0000", // Rot
      "#FFA500", // Orange
      "#FFD700", // Gold
      "#FFFF00", // Gelb
      "#90EE90", // Hellgrün
      "#008000", // Grün
      "#00FFFF", // Cyan
      "#0000FF", // Blau
      "#4B0082", // Indigo
      "#800080", // Lila
      "#FF69B4", // Pink
      "#8B4513", // Braun
      "#C0C0C0", // Silber
      "#808080", // Grau
    ]
  }
];