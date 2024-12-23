import { useState } from "react";
import { ImageUpload } from "./ImageUpload";
import { PatternPreview } from "./PatternPreview";
import { PatternSettings } from "./PatternSettings";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { colorPalettes } from "@/lib/colorPalettes";

export const BeadPattern = () => {
  const [image, setImage] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    size: 32,
    colors: 16,
    palette: colorPalettes[0],
  });

  const handleImageUpload = (imageUrl: string) => {
    setImage(imageUrl);
    toast.success("Bild erfolgreich hochgeladen!");
  };

  const handleDownload = () => {
    // Implementation für Download-Funktion kommt in der nächsten Version
    toast.info("Download-Funktion kommt bald!");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {!image ? (
        <ImageUpload onUpload={handleImageUpload} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-lg">
              <img
                src={image}
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
            <PatternSettings
              settings={settings}
              onChange={setSettings}
            />
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