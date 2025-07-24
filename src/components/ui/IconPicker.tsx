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
  Skeleton,
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "@stanfordspezi/spezi-web-design-system";
import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { matchSorter } from "match-sorter";
import { Portal } from "radix-ui";
import {
  memo,
  useState,
  useMemo,
  useCallback,
  useEffect,
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentRef,
  useRef,
  type ChangeEvent,
} from "react";
import { useDebounceValue } from "usehooks-ts";
import type { iconsData } from "@/utils/iconsData";
import { ScrollArea } from "./ScrollArea";

const gridColumns = 8;
const visibleRows = 8;
const rowHeight = 32;

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

const IconRenderer = memo(({ name }: { name: IconName }) => {
  return <DynamicIcon name={name} className="size-5 opacity-80" />;
});
IconRenderer.displayName = "IconRenderer";

const IconsColumnSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <div
        className="grid w-full gap-1"
        style={{
          gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: gridColumns * visibleRows }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-10 rounded-md" />
        ))}
      </div>
    </div>
  );
};

const useIconsData = () => {
  const [icons, setIcons] = useState<IconData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadIcons = async () => {
      try {
        setIsLoading(true);
        const { iconsData } = await import("../../utils/iconsData");
        if (!cancelled) {
          setIcons(iconsData);
          setIsLoading(false);
        }
      } catch (error) {
        if (!cancelled) {
          console.log(error);
          setIsLoading(false);
        }
      }
    };

    void loadIcons();

    return () => {
      cancelled = true;
    };
  }, []);

  return { icons, isLoading };
};

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
      defaultOpen,
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
    const [isOpen, setIsOpen] = useState(defaultOpen ?? false);
    const [search, setSearch] = useDebounceValue("", 200);
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const [isMeasuring, setIsMeasuring] = useState(true);

    const { icons, isLoading: isIconsLoading } = useIconsData();

    const iconsToUse = useMemo(() => iconsList ?? icons, [iconsList, icons]);

    const filteredIcons = useMemo(() => {
      if (search.trim() === "") return iconsToUse;
      return matchSorter(iconsToUse, search, {
        keys: ["name", "tags", "categories"],
        threshold: matchSorter.rankings.CONTAINS,
      });
    }, [search, iconsToUse]);

    const virtualItems = useMemo(() => {
      const length = Math.ceil(filteredIcons.length / 8);
      return Array.from({ length }, (_, rowIndex) => ({
        rowIndex,
        icons: filteredIcons.slice(rowIndex * 8, rowIndex * 8 + 8),
      }));
    }, [filteredIcons]);

    const scrollViewRef = useRef<HTMLDivElement>(null);

    const virtualizer = useVirtualizer({
      count: virtualItems.length,
      getScrollElement: () => scrollViewRef.current,
      estimateSize: () => rowHeight,
      overscan: 10,
    });

    const handleValueChange = useCallback(
      (icon: IconName) => {
        if (value === undefined) {
          setSelectedIcon(icon);
        }
        onValueChange?.(icon);
      },
      [value, onValueChange],
    );

    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        setSearch("");
        if (open === undefined) {
          setIsOpen(newOpen);
        }
        onOpenChange?.(newOpen);

        setIsPopoverVisible(newOpen);

        if (newOpen) {
          setTimeout(() => {
            virtualizer.measure();
            setIsMeasuring(false);
          }, 1);
        }
      },
      [setSearch, open, onOpenChange, virtualizer],
    );

    const handleIconClick = useCallback(
      (iconName: IconName) => {
        handleValueChange(iconName);
        setIsOpen(false);
        setSearch("");
      },
      [handleValueChange, setSearch],
    );

    const handleSearchChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);

        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTop = 0;
        }

        virtualizer.scrollToOffset(0);
      },
      [setSearch, virtualizer],
    );

    const renderIcon = useCallback(
      (icon: IconData) => (
        <TooltipRoot
          key={icon.name}
          delayDuration={300}
          disableHoverableContent
        >
          <TooltipTrigger asChild>
            <button
              className="flex-center hover:bg-layer-hover focus:bg-layer-hover rounded-md transition-colors outline-none"
              onClick={() => handleIconClick(icon.name as IconName)}
            >
              <IconRenderer name={icon.name as IconName} />
            </button>
          </TooltipTrigger>
          <Portal.Root>
            <TooltipContent
              hideWhenDetached
              className="!bg-fill-inverted text-text-inverted-on-fill text-xs shadow-md shadow-black/20 data-[state=closed]:hidden"
            >
              {icon.name.split("-").join(" ")}
            </TooltipContent>
          </Portal.Root>
        </TooltipRoot>
      ),
      [handleIconClick],
    );

    const renderVirtualContent = useCallback(() => {
      if (filteredIcons.length === 0) {
        return (
          <div
            className="flex-center text-text-tertiary"
            style={{ height: rowHeight * visibleRows }}
          >
            No icon found
          </div>
        );
      }

      return (
        <div
          className="relative w-full overscroll-contain"
          style={{ height: `${virtualizer.getTotalSize()}px` }}
        >
          {virtualizer.getVirtualItems().map((virtualItem: VirtualItem) => {
            const item = virtualItems[virtualItem.index];
            return (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <div
                  className="grid size-full"
                  style={{
                    gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
                  }}
                >
                  {item.icons.map(renderIcon)}
                </div>
              </div>
            );
          })}
        </div>
      );
    }, [virtualizer, virtualItems, filteredIcons, renderIcon]);

    useEffect(() => {
      if (isPopoverVisible) {
        setIsMeasuring(true);
        const timer = setTimeout(() => {
          setIsMeasuring(false);
          virtualizer.measure();
        }, 10);

        const resizeObserver = new ResizeObserver(() => {
          virtualizer.measure();
        });

        if (scrollViewRef.current) {
          resizeObserver.observe(scrollViewRef.current);
        }

        return () => {
          clearTimeout(timer);
          resizeObserver.disconnect();
        };
      }
    }, [isPopoverVisible, virtualizer]);

    return (
      <PopoverRoot
        open={open ?? isOpen}
        onOpenChange={handleOpenChange}
        modal={modal}
      >
        <PopoverTrigger ref={ref} asChild {...props}>
          {children ?? (
            <Button variant="outline">
              {value || selectedIcon ?
                <>
                  <DynamicIcon
                    name={value ?? selectedIcon ?? "search"}
                    className="size-4.5 opacity-80"
                  />{" "}
                  {value ?? selectedIcon}
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
                  onChange={handleSearchChange}
                  className="[&::-webkit-search-cancel-button]:appearance-none"
                />
              </div>
            )}
            <TooltipProvider>
              <ScrollArea
                type="always"
                scrollViewRef={scrollViewRef}
                className="pr-2"
                style={{ height: rowHeight * visibleRows }}
              >
                {isMeasuring || isIconsLoading ?
                  <IconsColumnSkeleton />
                : renderVirtualContent()}
              </ScrollArea>
            </TooltipProvider>
          </div>
        </PopoverContent>
      </PopoverRoot>
    );
  },
);
IconPicker.displayName = "IconPicker";
