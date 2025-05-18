
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutGrid,
  Columns2,
  Columns3,
  Grid2x2,
} from "lucide-react";

interface PanelToggleProps {
  panelCount: number;
  onPanelCountChange: (count: number) => void;
  layout: 1 | 2 | 3 | 4;
  onLayoutChange: (layout: 1 | 2 | 3 | 4) => void;
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
    else if (count === 3) onLayoutChange(3);
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
              className="border-zinc-400 dark:border-zinc-600"
            >
              <LayoutGrid className="h-4 w-4" />
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
              className="border-zinc-400 dark:border-zinc-600"
            >
              <Columns2 className="h-4 w-4" />
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
              variant={panelCount === 3 ? "default" : "outline"}
              size="icon"
              onClick={() => togglePanel(3)}
              className="border-zinc-400 dark:border-zinc-600"
            >
              <Columns3 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Three panels</p>
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
              className="border-zinc-400 dark:border-zinc-600"
            >
              <Grid2x2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Four panels</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
