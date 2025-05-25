import {
  Link,
  type RegisteredRouter,
  type ValidateLinkOptions,
} from "@tanstack/react-router";
import { ChevronsUpDown, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { cn } from "@/utils/cn";

export const HeaderSelectorMenuLabel = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <DropdownMenuLabel className="text-xs">{children}</DropdownMenuLabel>;
};

export const HeaderSelectorMenuItem = <
  TRouter extends RegisteredRouter = RegisteredRouter,
  TOptions = unknown,
>({
  children,
  icon: LucideIcon,
  linkOptions,
}: {
  children: React.ReactNode;
  icon?: LucideIcon;
  linkOptions: ValidateLinkOptions<TRouter, TOptions>;
}) => {
  return (
    <DropdownMenuItem className="gap-2 p-2!" asChild>
      <Link {...linkOptions}>
        {LucideIcon && (
          <div className="flex size-6 items-center justify-center rounded-sm border">
            <LucideIcon className="size-4 shrink-0" />
          </div>
        )}
        {children}
      </Link>
    </DropdownMenuItem>
  );
};

export const HeaderSelector = ({
  selectedItem,
  children,
}: {
  selectedItem: { title: string; icon?: LucideIcon };
  children: React.ReactNode;
}) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex h-8 items-center gap-3 rounded-md p-2.5 text-left text-sm outline-hidden transition-colors",
            "hover:bg-bg-hover",
            "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
            "focus-visible:ring-border-focus focus-visible:ring-2",
            "[&>span:last-child]:truncate",
            "[&>svg]:size-3.5 [&>svg]:shrink-0",
          )}
        >
          {selectedItem.icon && (
            <div className="bg-surface ring-border-shadow -ml-1.5 flex aspect-square size-6 items-center justify-center rounded-md shadow-xs ring">
              <selectedItem.icon className="size-3.5" strokeWidth={2} />
            </div>
          )}
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate">{selectedItem.title}</span>
          </div>
          <ChevronsUpDown className="text-icon-tertiary ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        // I need to add the "important" flag because the Spezi components don't allow
        // you to overwrite tailwind classes
        className="min-w-60! rounded-lg"
        align="start"
        side="bottom"
        sideOffset={4}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
