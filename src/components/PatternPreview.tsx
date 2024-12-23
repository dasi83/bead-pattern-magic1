import { useEffect, useRef } from "react";
import { ColorPalette } from "@/lib/colorPalettes";

interface PatternPreviewProps {
  image: string;
  settings: {
    size: number;
    colors: number;
    palette: ColorPalette;
  };
}

export const PatternPreview = ({ image, settings }: PatternPreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const reduceColors = (imageData: ImageData, palette: string[]) => {
    const data = imageData.data;
    
    // Konvertiere Hex-Farben zu RGB
    const rgbPalette = palette.slice(0, settings.colors).map(hex => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
    });
    
    // Ordne jedem Pixel die nächstgelegene Farbe aus der Palette zu
    for (let i = 0; i < data.length; i += 4) {
      const color = [data[i], data[i + 1], data[i + 2]];
      let minDist = Infinity;
      let closestColor = rgbPalette[0];
      
      rgbPalette.forEach(paletteColor => {
        const dist = Math.sqrt(
          Math.pow(color[0] - paletteColor[0], 2) +
          Math.pow(color[1] - paletteColor[1], 2) +
          Math.pow(color[2] - paletteColor[2], 2)
        );
        if (dist < minDist) {
          minDist = dist;
          closestColor = paletteColor;
        }
      });
      
      data[i] = closestColor[0];
      data[i + 1] = closestColor[1];
      data[i + 2] = closestColor[2];
    }
    
    return imageData;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = image;
    img.onload = () => {
      canvas.width = settings.size;
      canvas.height = settings.size;
      
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, settings.size, settings.size);
      
      // Farbreduktion anwenden
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const reducedImageData = reduceColors(imageData, settings.palette.colors);
      ctx.putImageData(reducedImageData, 0, 0);
    };
  }, [image, settings]);

  return (
    <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-lg p-4">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
};