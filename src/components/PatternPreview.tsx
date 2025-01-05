import { useEffect, useRef, useState } from "react";
import { ColorPalette, webSafeColors } from "@/lib/colorPalettes";
import { ColorMapping } from "./ColorMapping";
import { calculateAverageColor, findClosestColor, rgbToHex, reduceColors } from "@/lib/imageProcessing";

interface PatternPreviewProps {
  image: string;
  settings: {
    width: number;
    height: number;
    colors: number;
    palette: ColorPalette;
    showGrid: boolean;
  };
}

export const PatternPreview = ({ image, settings }: PatternPreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [colorMapping, setColorMapping] = useState<{ original: string; mapped: string }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = image;
    img.onload = () => {
      canvas.width = settings.width;
      canvas.height = settings.height;
      
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;
      
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      tempCtx.drawImage(img, 0, 0);
      
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const cellWidth = Math.ceil(tempCanvas.width / settings.width);
      const cellHeight = Math.ceil(tempCanvas.height / settings.height);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Erste Phase: Sammle alle Farben und ihre Häufigkeit
      const colorCounts = new Map<string, number>();
      const allColors = new Map<string, { r: number; g: number; b: number }>();
      
      for (let y = 0; y < settings.height; y++) {
        for (let x = 0; x < settings.width; x++) {
          const avgColor = calculateAverageColor(
            imageData,
            x * cellWidth,
            y * cellHeight,
            tempCanvas.width,
            tempCanvas.height,
            cellWidth,
            cellHeight
          );
          
          const originalHex = rgbToHex(avgColor.r, avgColor.g, avgColor.b);
          colorCounts.set(originalHex, (colorCounts.get(originalHex) || 0) + 1);
          allColors.set(originalHex, avgColor);
        }
      }
      
      // Reduziere auf die häufigsten Farben
      const topColors = reduceColors(colorCounts);
      const colorMap = new Map<string, { web: string; pearl: string }>();
      
      // Mappe die reduzierten Farben auf die Perlenpalette
      topColors.forEach(originalHex => {
        const color = allColors.get(originalHex)!;
        const { closestWebSafeColor, closestPaletteColor } = findClosestColor(
          color.r,
          color.g,
          color.b,
          settings.palette,
          settings.colors,
          webSafeColors
        );
        colorMap.set(originalHex, { web: closestWebSafeColor, pearl: closestPaletteColor });
      });
      
      // Zeichne das finale Bild
      for (let y = 0; y < settings.height; y++) {
        for (let x = 0; x < settings.width; x++) {
          const avgColor = calculateAverageColor(
            imageData,
            x * cellWidth,
            y * cellHeight,
            tempCanvas.width,
            tempCanvas.height,
            cellWidth,
            cellHeight
          );
          
          const originalHex = rgbToHex(avgColor.r, avgColor.g, avgColor.b);
          let mappedColor = colorMap.get(originalHex);
          
          if (!mappedColor) {
            const { closestWebSafeColor, closestPaletteColor } = findClosestColor(
              avgColor.r,
              avgColor.g,
              avgColor.b,
              settings.palette,
              settings.colors,
              webSafeColors
            );
            mappedColor = { web: closestWebSafeColor, pearl: closestPaletteColor };
          }
          
          ctx.fillStyle = mappedColor.pearl;
          ctx.fillRect(x, y, 1, 1);
        }
      }
      
      // Aktualisiere das Farbmapping für die Anzeige
      const uniqueColorMapping = Array.from(colorMap.entries()).map(([original, mapped]) => ({
        original,
        mapped: mapped.pearl
      }));
      setColorMapping(uniqueColorMapping);
    };
  }, [image, settings]);

  return (
    <div className="space-y-4">
      <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-lg p-4">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
      <ColorMapping
        originalImage={image}
        mappedColors={colorMapping}
      />
    </div>
  );
};