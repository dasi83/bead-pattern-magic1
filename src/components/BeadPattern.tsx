import { useState, useEffect } from "react";
import { ImageUpload } from "./ImageUpload";
import { PatternPreview } from "./PatternPreview";
import { PatternSettings } from "./PatternSettings";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { colorPalettes } from "@/lib/colorPalettes";

const defaultSettings = {
  width: 32,
  height: 32,
  colors: 16,
  palette: colorPalettes[0],
  showGrid: false,
};

export const BeadPattern = () => {
  const [image, setImage] = useState<string | null>(null);
  const [settings, setSettings] = useState(defaultSettings);
  const [displayImage, setDisplayImage] = useState<string | null>(null);

  const handleImageUpload = (imageUrl: string) => {
    setImage(imageUrl);
    setDisplayImage(imageUrl);
    toast.success("Bild erfolgreich hochgeladen!");
  };

  const handleDownload = () => {
    // Implementation für Download-Funktion kommt in der nächsten Version
    toast.info("Download-Funktion kommt bald!");
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    toast.success("Einstellungen zurückgesetzt!");
  };

  const drawGridOnImage = (imageUrl: string, showGrid: boolean) => {
    return new Promise<string>((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        if (!ctx) return resolve(imageUrl);
        
        // Bild zeichnen
        ctx.drawImage(img, 0, 0);
        
        if (showGrid) {
          // Raster zeichnen
          const cellWidth = img.width / settings.width;
          const cellHeight = img.height / settings.height;
          
          ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)'; // Kräftigeres Rot
          ctx.lineWidth = 2; // Dickere Linie
          
          // Vertikale Linien
          for (let x = 0; x <= img.width; x += cellWidth) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, img.height);
            ctx.stroke();
          }
          
          // Horizontale Linien
          for (let y = 0; y <= img.height; y += cellHeight) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(img.width, y);
            ctx.stroke();
          }
        }
        
        resolve(canvas.toDataURL());
      };
      
      img.src = imageUrl;
    });
  };

  // Effekt für das Raster-Update
  const updateGridImage = async () => {
    if (image) {
      const gridImage = await drawGridOnImage(image, settings.showGrid);
      setDisplayImage(gridImage);
    }
  };

  // Wenn sich die Grid-Einstellung oder das Bild ändert, aktualisiere das angezeigte Bild
  useEffect(() => {
    updateGridImage();
  }, [image, settings.showGrid, settings.width, settings.height]);

  return (
    <div className="space-y-8 animate-fade-in">
      {!image ? (
        <ImageUpload onUpload={handleImageUpload} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-lg">
              <img
                src={displayImage || image}
                alt="Originalbild"
                className="w-full h-full object-contain"
              />
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setImage(null)}
            >
              Anderes Bild auswählen
            </Button>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <PatternSettings
                settings={settings}
                onChange={setSettings}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleReset}
                className="mt-12"
                title="Standardeinstellungen"
              >
                ↺
              </Button>
            </div>
            <PatternPreview
              image={image}
              settings={settings}
            />
            <Button
              className="w-full bg-primary hover:bg-primary/90"
              onClick={handleDownload}
            >
              Muster herunterladen
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};