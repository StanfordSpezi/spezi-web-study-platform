//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  Input,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  TooltipProvider,
} from "@stanfordspezi/spezi-web-design-system";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import {
  useState,
  useCallback,
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentRef,
} from "react";
import { useDebounceValue } from "usehooks-ts";
import type { iconsData } from "@/utils/iconsData";
import { IconGrid } from "./IconGrid";

export type IconData = (typeof iconsData)[number];

interface IconPickerProps
  extends Omit<
    ComponentPropsWithoutRef<typeof PopoverTrigger>,
    "onSelect" | "onOpenChange"
  > {
  value?: IconName;
  defaultValue?: IconName;
  onValueChange?: (value: IconName) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  triggerPlaceholder?: string;
  iconsList?: IconData[];
  modal?: boolean;
}

export const IconPicker = forwardRef<
  ComponentRef<typeof PopoverTrigger>,
  IconPickerProps
>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      open,
      defaultOpen = false,
      onOpenChange,
      children,
      searchable = true,
      searchPlaceholder = "Search for an icon...",
      triggerPlaceholder = "Select an icon",
      iconsList,
      modal = false,
      ...props
    },
    ref,
  ) => {
    const [selectedIcon, setSelectedIcon] = useState<IconName | undefined>(
      defaultValue,
    );
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [search, setSearch] = useDebounceValue("", 200);

    const isControlled = value !== undefined;
    const currentIcon = isControlled ? value : selectedIcon;
    const currentOpen = open ?? isOpen;

    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        setSearch("");
        if (open === undefined) {
          setIsOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [setSearch, open, onOpenChange],
    );

    const handleValueChange = useCallback(
      (icon: IconName) => {
        if (!isControlled) {
          setSelectedIcon(icon);
        }
        onValueChange?.(icon);
        setIsOpen(false);
        setSearch("");
      },
      [isControlled, onValueChange, setSearch],
    );

    return (
      <PopoverRoot
        open={currentOpen}
        onOpenChange={handleOpenChange}
        modal={modal}
      >
        <PopoverTrigger ref={ref} asChild {...props}>
          {children ?? (
            <Button variant="outline">
              {currentIcon ?
                <>
                  <DynamicIcon
                    name={currentIcon}
                    className="size-4.5 opacity-80"
                  />{" "}
                  {currentIcon}
                </>
              : triggerPlaceholder}
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-96 rounded-xl bg-clip-padding pr-2 shadow-xl shadow-black/5">
          <div className="flex flex-col gap-4">
            {searchable && (
              <div className="pr-2">
                <Input
                  type="search"
                  aria-label="Search icons"
                  placeholder={searchPlaceholder}
                  onChange={(event) => setSearch(event.target.value)}
                  className="[&::-webkit-search-cancel-button]:appearance-none"
                />
              </div>
            )}
            <TooltipProvider>
              <IconGrid
                search={search}
                iconsList={iconsList}
                onValueChange={handleValueChange}
              />
            </TooltipProvider>
          </div>
        </PopoverContent>
      </PopoverRoot>
    );
  },
);
IconPicker.displayName = "IconPicker";
