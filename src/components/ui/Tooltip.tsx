import {
  Tooltip as _Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@stanfordspezi/spezi-web-design-system";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

const Tooltip = ({ className, ...props }: ComponentProps<typeof _Tooltip>) => {
  return (
    <_Tooltip
      className={cn(
        "bg-fill-inverted! text-text-inverted-on-fill border-none px-1! py-0.5! text-xs shadow-md",
        className,
      )}
      {...props}
    />
  );
};

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
