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
      
      // Hier würde in der nächsten Version die Farbreduktion implementiert
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