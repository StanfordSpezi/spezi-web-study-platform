import { cn } from "@/utils/cn";

export const Header = () => {
  return (
    <header
      className={cn(
        "fixed top-0 z-10",
        "flex h-14 w-full items-center justify-between gap-2 pr-3 pl-2",
        "bg-bg border-border border-b",
      )}
    >
      <div className="flex items-center gap-3">
        <div>team</div>
        <div className="bg-border h-5 w-px rotate-12 rounded-full"></div>
        <div>study</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-muted-foreground text-sm">User Name</div>
        <div className="bg-fill-brand h-8 w-8 rounded-full"></div>
      </div>
    </header>
  );
};
