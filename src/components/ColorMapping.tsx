import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { webSafeColors } from "@/lib/colorPalettes";

interface ColorMappingProps {
  originalImage: string;
  mappedColors: { original: string; mapped: string }[];
}

const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r},${g},${b})`;
};

export const ColorMapping = ({ originalImage, mappedColors }: ColorMappingProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Wenn keine Zuordnung gefunden wird, verwenden wir die erste verfügbare gemappte Farbe
  const getDefaultMappedColor = () => {
    return mappedColors.length > 0 ? mappedColors[0].mapped : "#FFFFFF";
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="w-full flex items-center justify-between"
        >
          <span>Farbzuordnung anzeigen (216 Farben)</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">
        <Card className="p-4 space-y-4">
          <div className="text-sm space-y-2 border-b pb-2">
            <h3 className="font-medium">Berechnungsvorschrift:</h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>Für jedes Rasterelement des Originalbildes wird die durchschnittliche Farbe berechnet</li>
              <li>Diese Farbe wird der nächstgelegenen der 216 websicheren Farben zugeordnet</li>
              <li>Die websichere Farbe wird dann der ähnlichsten Farbe aus der 16-Farben Bügelperlenpalette zugeordnet</li>
            </ol>
          </div>
          <div className="space-y-2">
            {webSafeColors.map((webSafeColor, index) => {
              const mapping = mappedColors.find(c => c.original === webSafeColor);
              const mappedColor = mapping ? mapping.mapped : getDefaultMappedColor();
              
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-2 bg-white/50 rounded-lg"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: webSafeColor }}
                      title="Websichere Farbe"
                    />
                    <span className="text-xs font-mono">
                      {webSafeColor}
                      <br />
                      {hexToRgb(webSafeColor)}
                    </span>
                  </div>
                  <div className="text-xl">→</div>
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: mappedColor }}
                      title="Zugeordnete Perlenfarbe"
                    />
                    <span className="text-xs font-mono">
                      {mappedColor}
                      <br />
                      {hexToRgb(mappedColor)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};