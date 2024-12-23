import { useEffect, useRef } from "react";

interface PatternPreviewProps {
  image: string;
  settings: {
    size: number;
    colors: number;
  };
}

export const PatternPreview = ({ image, settings }: PatternPreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const reduceColors = (imageData: ImageData, numColors: number) => {
    const data = imageData.data;
    
    // Sammle alle einzigartigen Farben
    const colors = new Set<string>();
    for (let i = 0; i < data.length; i += 4) {
      const color = `${data[i]},${data[i + 1]},${data[i + 2]}`;
      colors.add(color);
    }

    // Konvertiere zu RGB Arrays
    const uniqueColors = Array.from(colors).map(c => c.split(',').map(Number));
    
    // K-Means Clustering für Farbreduktion
    const kMeans = (colors: number[][], k: number, maxIterations = 10) => {
      // Initialisiere Zentroide zufällig aus vorhandenen Farben
      let centroids = colors.sort(() => 0.5 - Math.random()).slice(0, k);
      
      for (let iteration = 0; iteration < maxIterations; iteration++) {
        // Zuordnung der Farben zu nächstgelegenen Zentroiden
        const clusters: number[][][] = Array(k).fill(0).map(() => []);
        
        colors.forEach(color => {
          let minDist = Infinity;
          let closestCentroid = 0;
          
          centroids.forEach((centroid, i) => {
            const dist = Math.sqrt(
              Math.pow(color[0] - centroid[0], 2) +
              Math.pow(color[1] - centroid[1], 2) +
              Math.pow(color[2] - centroid[2], 2)
            );
            if (dist < minDist) {
              minDist = dist;
              closestCentroid = i;
            }
          });
          
          clusters[closestCentroid].push(color);
        });
        
        // Aktualisiere Zentroide
        centroids = clusters.map(cluster => {
          if (cluster.length === 0) return centroids[0];
          return cluster.reduce((acc, curr) => [
            acc[0] + curr[0] / cluster.length,
            acc[1] + curr[1] / cluster.length,
            acc[2] + curr[2] / cluster.length
          ], [0, 0, 0]);
        });
      }
      
      return centroids;
    };

    // Reduziere Farben mit k-Means
    const palette = kMeans(uniqueColors, numColors);
    
    // Ordne jedem Pixel die nächstgelegene Farbe aus der Palette zu
    for (let i = 0; i < data.length; i += 4) {
      const color = [data[i], data[i + 1], data[i + 2]];
      let minDist = Infinity;
      let closestColor = palette[0];
      
      palette.forEach(paletteColor => {
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
      // Bild auf Canvas zeichnen und pixelieren
      canvas.width = settings.size;
      canvas.height = settings.size;
      
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, settings.size, settings.size);
      
      // Farbreduktion anwenden
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const reducedImageData = reduceColors(imageData, settings.colors);
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