import { ColorPalette, colorPalettes } from "@/lib/colorPalettes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ColorPaletteSelectorProps {
  selectedPalette: ColorPalette;
  onPaletteChange: (palette: ColorPalette) => void;
}

export const ColorPaletteSelector = ({
  selectedPalette,
  onPaletteChange,
}: ColorPaletteSelectorProps) => {
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
              onPaletteChange(palette);
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wähle eine Farbpalette" />
          </SelectTrigger>
          <SelectContent>
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
          <div
            key={index}
            className="aspect-square rounded-sm border border-gray-200"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
};