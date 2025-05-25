import { ChevronsUpDown } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/utils/cn";

export const HeaderSelectorSkeleton = ({ hasIcon }: { hasIcon: boolean }) => {
  return (
    <div
      className={cn(
        "flex h-8 items-center gap-3 rounded-md p-2.5 text-left text-sm outline-hidden",
        "hover:bg-bg-hover",
        "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
        "focus-visible:ring-2",
        "[&>span:last-child]:truncate",
        "[&>svg]:size-3.5 [&>svg]:shrink-0",
      )}
    >
      {hasIcon && (
        <div className="bg-surface ring-border-shadow -ml-1.5 flex aspect-square size-6 items-center justify-center rounded-md shadow-xs ring">
          <div className="size-3.5" />
        </div>
      )}
      <div className="grid h-4 w-20 flex-1">
        <Skeleton className="bg-fill-tertiary size-full rounded-sm" />
      </div>
      <ChevronsUpDown className="ml-auto" />
    </div>
  );
};
