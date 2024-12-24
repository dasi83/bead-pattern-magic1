import { ColorPalette, colorPalettes } from "@/lib/colorPalettes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ColorPaletteSelectorProps {
  selectedPalette: ColorPalette;
  onPaletteChange: (palette: ColorPalette) => void;
  maxColors: number;
}

export const ColorPaletteSelector = ({
  selectedPalette,
  onPaletteChange,
  maxColors,
}: ColorPaletteSelectorProps) => {
  const [customColor, setCustomColor] = useState({ r: 128, g: 128, b: 128 });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleColorToggle = (index: number) => {
    const newPalette = { ...selectedPalette };
    const activeColorsCount = newPalette.activeColors.filter(Boolean).length;

    if (newPalette.activeColors[index] && activeColorsCount <= maxColors) {
      // Verhindere Deaktivierung, wenn Minimum erreicht
      return;
    }

    newPalette.activeColors[index] = !newPalette.activeColors[index];
    onPaletteChange(newPalette);
  };

  const addCustomColor = () => {
    const newPalette = { ...selectedPalette };
    const hexColor = `#${customColor.r.toString(16).padStart(2, '0')}${customColor.g.toString(16).padStart(2, '0')}${customColor.b.toString(16).padStart(2, '0')}`;
    
    newPalette.colors.push(hexColor);
    newPalette.activeColors.push(true);
    
    onPaletteChange(newPalette);
    setDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Select
          value={`${selectedPalette.manufacturer}-${selectedPalette.name}`}
          onValueChange={(value) => {
            const [manufacturer, name] = value.split("-");
            const palette = colorPalettes.find(
              (p) => p.manufacturer === manufacturer && p.name === name
            );
            if (palette) {
              // Initialisiere activeColors wenn nötig
              const newPalette = {
                ...palette,
                activeColors: palette.activeColors || Array(palette.colors.length).fill(true),
              };
              onPaletteChange(newPalette);
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wähle eine Farbpalette" />
          </SelectTrigger>
          <SelectContent className="bg-white border shadow-lg">
            {colorPalettes.map((palette) => (
              <SelectItem
                key={`${palette.manufacturer}-${palette.name}`}
                value={`${palette.manufacturer}-${palette.name}`}
              >
                {palette.manufacturer} - {palette.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-8 gap-1">
        {selectedPalette.colors.map((color, index) => (
          <button
            key={index}
            className={`aspect-square rounded-sm border ${
              selectedPalette.activeColors[index]
                ? "border-gray-800 shadow-sm"
                : "border-gray-200 opacity-40"
            }`}
            style={{ backgroundColor: color }}
            title={color}
            onClick={() => handleColorToggle(index)}
          />
        ))}
        {selectedPalette.colors.length < maxColors && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button className="aspect-square rounded-sm border border-dashed border-gray-300 hover:border-gray-400 flex items-center justify-center">
                +
              </button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Neue Farbe hinzufügen</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rot (R)</label>
                  <Slider
                    value={[customColor.r]}
                    onValueChange={(value) =>
                      setCustomColor({ ...customColor, r: value[0] })
                    }
                    min={0}
                    max={255}
                    step={1}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Grün (G)</label>
                  <Slider
                    value={[customColor.g]}
                    onValueChange={(value) =>
                      setCustomColor({ ...customColor, g: value[0] })
                    }
                    min={0}
                    max={255}
                    step={1}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Blau (B)</label>
                  <Slider
                    value={[customColor.b]}
                    onValueChange={(value) =>
                      setCustomColor({ ...customColor, b: value[0] })
                    }
                    min={0}
                    max={255}
                    step={1}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-sm border"
                    style={{
                      backgroundColor: `rgb(${customColor.r},${customColor.g},${customColor.b})`,
                    }}
                  />
                  <Button onClick={addCustomColor}>Farbe hinzufügen</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};