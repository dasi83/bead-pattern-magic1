import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ColorPalette } from "@/lib/colorPalettes";
import { ColorPaletteSelector } from "./ColorPaletteSelector";
import { useState, KeyboardEvent } from "react";

interface PatternSettingsProps {
  settings: {
    width: number;
    height: number;
    colors: number;
    palette: ColorPalette;
    showGrid: boolean;
  };
  onChange: (settings: {
    width: number;
    height: number;
    colors: number;
    palette: ColorPalette;
    showGrid: boolean;
  }) => void;
  className?: string;
}

export const PatternSettings = ({ settings, onChange, className }: PatternSettingsProps) => {
  const [tempWidth, setTempWidth] = useState(settings.width.toString());
  const [tempHeight, setTempHeight] = useState(settings.height.toString());

  const validateAndUpdateDimension = (value: string, dimension: 'width' | 'height') => {
    const numValue = parseInt(value) || 8;
    const validValue = Math.min(128, Math.max(8, numValue));
    
    if (dimension === 'width') {
      setTempWidth(validValue.toString());
      onChange({ ...settings, width: validValue });
    } else {
      setTempHeight(validValue.toString());
      onChange({ ...settings, height: validValue });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, dimension: 'width' | 'height') => {
    if (e.key === 'Enter') {
      validateAndUpdateDimension(dimension === 'width' ? tempWidth : tempHeight, dimension);
    }
  };

  return (
    <Card className={`bg-white/80 backdrop-blur-sm ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg">Einstellungen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Breite: {settings.width} Perlen
          </label>
          <div className="flex gap-2">
            <Slider
              value={[settings.width]}
              onValueChange={(value) =>
                onChange({ ...settings, width: value[0] })
              }
              min={8}
              max={128}
              step={1}
              className="flex-1"
            />
            <Input
              type="number"
              value={tempWidth}
              onChange={(e) => setTempWidth(e.target.value)}
              onBlur={() => validateAndUpdateDimension(tempWidth, 'width')}
              onKeyDown={(e) => handleKeyDown(e, 'width')}
              className="w-20"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Höhe: {settings.height} Perlen
          </label>
          <div className="flex gap-2">
            <Slider
              value={[settings.height]}
              onValueChange={(value) =>
                onChange({ ...settings, height: value[0] })
              }
              min={8}
              max={128}
              step={1}
              className="flex-1"
            />
            <Input
              type="number"
              value={tempHeight}
              onChange={(e) => setTempHeight(e.target.value)}
              onBlur={() => validateAndUpdateDimension(tempHeight, 'height')}
              onKeyDown={(e) => handleKeyDown(e, 'height')}
              className="w-20"
            />
          </div>
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
            maxColors={settings.colors}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Raster anzeigen</label>
          <Switch
            checked={settings.showGrid}
            onCheckedChange={(checked) =>
              onChange({ ...settings, showGrid: checked })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};