import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ColorPalette } from "@/lib/colorPalettes";
import { ColorPaletteSelector } from "./ColorPaletteSelector";

interface PatternSettingsProps {
  settings: {
    size: number;
    colors: number;
    palette: ColorPalette;
  };
  onChange: (settings: {
    size: number;
    colors: number;
    palette: ColorPalette;
  }) => void;
  className?: string;
}

export const PatternSettings = ({ settings, onChange, className }: PatternSettingsProps) => {
  return (
    <Card className={`bg-white/80 backdrop-blur-sm ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg">Einstellungen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Rastergröße: {settings.size}x{settings.size}
          </label>
          <Slider
            value={[settings.size]}
            onValueChange={(value) =>
              onChange({ ...settings, size: value[0] })
            }
            min={16}
            max={64}
            step={8}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Anzahl Farben: {settings.colors}
          </label>
          <Slider
            value={[settings.colors]}
            onValueChange={(value) =>
              onChange({ ...settings, colors: value[0] })
            }
            min={2}
            max={32}
            step={2}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Farbpalette</label>
          <ColorPaletteSelector
            selectedPalette={settings.palette}
            onPaletteChange={(palette) =>
              onChange({ ...settings, palette })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};