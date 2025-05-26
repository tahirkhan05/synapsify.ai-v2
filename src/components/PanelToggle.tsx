
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
  Square,
  Grid2X2,
  Grid3X3,
  LayoutDashboard,
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
  return (
    <div className="flex items-center space-x-4">
      {/* Panel Count Controls */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-muted-foreground">Panels:</span>
        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={panelCount === 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPanelCountChange(1)}
                  className="h-8 w-8 p-0"
                >
                  <Square className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>1 Panel</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={panelCount === 2 ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPanelCountChange(2)}
                  className="h-8 w-8 p-0"
                >
                  <Grid2X2 className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>2 Panels</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={panelCount === 3 ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPanelCountChange(3)}
                  className="h-8 w-8 p-0"
                >
                  <Grid3X3 className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>3 Panels</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={panelCount === 4 ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPanelCountChange(4)}
                  className="h-8 w-8 p-0"
                >
                  <LayoutDashboard className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>4 Panels</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Grid Layout Controls */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-muted-foreground">Layout:</span>
        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={layout === 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => onLayoutChange(1)}
                  className="h-8 w-8 p-0"
                >
                  <LayoutGrid className="h-3 w-3" />
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
                  variant={layout === 2 ? "default" : "outline"}
                  size="sm"
                  onClick={() => onLayoutChange(2)}
                  className="h-8 w-8 p-0"
                >
                  <Columns2 className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Double column</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
