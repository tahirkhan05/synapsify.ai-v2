
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutGrid,
  PanelLeft,
  PanelTop,
  PanelsTopLeft,
} from "lucide-react";

interface PanelToggleProps {
  panelCount: number;
  onPanelCountChange: (count: number) => void;
  layout: 1 | 2 | 4;
  onLayoutChange: (layout: 1 | 2 | 4) => void;
}

export function PanelToggle({
  panelCount,
  onPanelCountChange,
  layout,
  onLayoutChange,
}: PanelToggleProps) {
  const togglePanel = (count: number) => {
    onPanelCountChange(count);
    
    // Automatically adjust layout based on panel count
    if (count === 1) onLayoutChange(1);
    else if (count === 2) onLayoutChange(2);
    else onLayoutChange(4);
  };

  return (
    <div className="flex items-center space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={panelCount === 1 ? "default" : "outline"}
              size="icon"
              onClick={() => togglePanel(1)}
            >
              <PanelLeft className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Single panel</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={panelCount === 2 ? "default" : "outline"}
              size="icon"
              onClick={() => togglePanel(2)}
            >
              <PanelTop className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Two panels</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={panelCount === 4 ? "default" : "outline"}
              size="icon"
              onClick={() => togglePanel(4)}
            >
              <PanelsTopLeft className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Four panels</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                if (layout === 1) onLayoutChange(2);
                else if (layout === 2) onLayoutChange(4);
                else onLayoutChange(1);
              }}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Change grid layout</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
