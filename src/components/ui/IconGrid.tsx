//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Skeleton } from "@stanfordspezi/spezi-web-design-system";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { matchSorter } from "match-sorter";
import { memo, useState, useMemo, useEffect, useRef } from "react";
import { Virtualizer } from "virtua";
import type { iconsData } from "@/utils/iconsData";
import { ScrollArea } from "./ScrollArea";

const gridColumns = 8;
const visibleRows = 8;
const rowHeight = 32;

export type IconData = (typeof iconsData)[number];

const IconRenderer = memo(({ name }: { name: IconName }) => {
  return <DynamicIcon name={name} className="size-5 opacity-80" />;
});
IconRenderer.displayName = "IconRenderer";

const IconGridSkeleton = () => {
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
          console.error("Failed to load icons data:", error);
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

interface IconRowProps {
  icons: IconData[];
  onValueChange?: (value: IconName) => void;
}

const IconRow = memo(({ icons, onValueChange }: IconRowProps) => {
  return (
    <div
      className="grid w-full"
      style={{
        height: rowHeight,
        gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
      }}
    >
      {icons.map((icon) => (
        <button
          key={icon.name}
          title={icon.name.split("-").join(" ")}
          className="flex-center group hover:bg-layer-hover focus:bg-layer-hover rounded-md transition-colors outline-none"
          onClick={() => onValueChange?.(icon.name as IconName)}
        >
          <IconRenderer name={icon.name as IconName} />
        </button>
      ))}
    </div>
  );
});

IconRow.displayName = "IconRow";

interface IconGridProps {
  search?: string;
  iconsList?: IconData[];
  onValueChange?: (value: IconName) => void;
}

export const IconGrid = ({
  search = "",
  iconsList,
  onValueChange,
}: IconGridProps) => {
  const { icons, isLoading: isIconsLoading } = useIconsData();
  const iconsToUse = useMemo(() => iconsList ?? icons, [iconsList, icons]);

  const filteredIcons = useMemo(() => {
    if (search.trim() === "") return iconsToUse;
    return matchSorter(iconsToUse, search, {
      keys: ["name", "tags", "categories"],
      threshold: matchSorter.rankings.CONTAINS,
    });
  }, [search, iconsToUse]);

  const scrollViewRef = useRef<HTMLDivElement>(null);

  if (isIconsLoading) {
    return <IconGridSkeleton />;
  }

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
    <ScrollArea
      type="always"
      scrollViewRef={scrollViewRef}
      className="pr-2"
      style={{ height: rowHeight * visibleRows }}
    >
      <Virtualizer
        count={Math.ceil(filteredIcons.length / 8)}
        itemSize={rowHeight}
        overscan={visibleRows}
        scrollRef={scrollViewRef}
      >
        {(index) => {
          return (
            <IconRow
              key={`${index * 8}-${index * 8 + 8}`}
              icons={filteredIcons.slice(index * 8, index * 8 + 8)}
              onValueChange={onValueChange}
            />
          );
        }}
      </Virtualizer>
    </ScrollArea>
  );
};
