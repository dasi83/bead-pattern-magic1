// Hilfsfunktionen für die Bildverarbeitung
export const calculateAverageColor = (imageData: ImageData, x: number, y: number, width: number, height: number, cellWidth: number, cellHeight: number) => {
  let r = 0, g = 0, b = 0;
  let count = 0;
  
  for (let i = y; i < Math.min(y + cellHeight, height); i++) {
    for (let j = x; j < Math.min(x + cellWidth, width); j++) {
      const idx = (i * width + j) * 4;
      r += imageData.data[idx];
      g += imageData.data[idx + 1];
      b += imageData.data[idx + 2];
      count++;
    }
  }
  
  return {
    r: Math.round(r / count),
    g: Math.round(g / count),
    b: Math.round(b / count)
  };
};

export const findClosestColor = (r: number, g: number, b: number, palette: any, colors: number, webSafeColors: string[]) => {
  // Zuerst finde die nächstgelegene websichere Farbe
  let minDistance = Infinity;
  let closestWebSafeColor = webSafeColors[0];
  
  webSafeColors.forEach(hex => {
    const wr = parseInt(hex.slice(1, 3), 16);
    const wg = parseInt(hex.slice(3, 5), 16);
    const wb = parseInt(hex.slice(5, 7), 16);
    
    const distance = Math.sqrt(
      Math.pow(r - wr, 2) +
      Math.pow(g - wg, 2) +
      Math.pow(b - wb, 2)
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      closestWebSafeColor = hex;
    }
  });
  
  // Dann mappe diese auf die aktive Perlenpalette
  const activeColors = palette.colors.filter((_, index: number) => palette.activeColors[index]);
  minDistance = Infinity;
  let closestPaletteColor = activeColors[0];
  
  activeColors.slice(0, colors).forEach(hex => {
    const pr = parseInt(hex.slice(1, 3), 16);
    const pg = parseInt(hex.slice(3, 5), 16);
    const pb = parseInt(hex.slice(5, 7), 16);
    
    const wr = parseInt(closestWebSafeColor.slice(1, 3), 16);
    const wg = parseInt(closestWebSafeColor.slice(3, 5), 16);
    const wb = parseInt(closestWebSafeColor.slice(5, 7), 16);
    
    const distance = Math.sqrt(
      Math.pow(wr - pr, 2) +
      Math.pow(wg - pg, 2) +
      Math.pow(wb - pb, 2)
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      closestPaletteColor = hex;
    }
  });
  
  return { closestWebSafeColor, closestPaletteColor };
};

export const rgbToHex = (r: number, g: number, b: number) => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

export const reduceColors = (colorCounts: Map<string, number>): string[] => {
  return Array.from(colorCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 216) // Reduziere auf 216 Farben (websichere Farben)
    .map(([color]) => color);
};