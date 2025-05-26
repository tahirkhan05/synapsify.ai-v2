
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
              className="h-9 w-9 hover:bg-secondary/80 transition-colors"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Single column</p>
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
              className="h-9 w-9 hover:bg-secondary/80 transition-colors"
            >
              <Columns2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Double column</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
