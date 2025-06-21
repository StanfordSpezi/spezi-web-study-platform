import { type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface IconContainerProps {
  children: ReactNode;
  className?: string;
}

export const IconContainer = ({ children, className }: IconContainerProps) => {
  return (
    <div
      className={cn(
        "[--container-padding:--spacing(0.5)] [--container-radius:var(--radius-xl)]",
        "rounded-(--container-radius) p-(--container-padding)",
        "bg-surface size-12 border bg-clip-padding shadow",
        className,
      )}
    >
      <div className="size-full overflow-hidden rounded-[calc(var(--container-radius)-var(--container-padding))]">
        {children}
      </div>
    </div>
  );
};
