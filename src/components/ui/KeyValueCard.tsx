//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { cn } from "@/utils/cn";
import { Skeleton, Tooltip } from "@stanfordspezi/spezi-web-design-system";
import React from "react";

interface KeyValueCardProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
  isLoading?: boolean;
  items: Array<{
    key: string;
    tooltip?: string;
    value?: string | number;
  }>;
}

export const KeyValueCard = ({
  title,
  description,
  actions,
  isLoading,
  items,
}: KeyValueCardProps) => {
  return (
    <div
      className={cn(
        "[--card-padding:--spacing(5)]",
        "bg-layer flex w-full max-w-6xl flex-col rounded-xl border",
        "bg-clip-padding",
        "shadow-lg shadow-black/4",
      )}
    >
      <div className="flex w-full items-center justify-between border-b p-(--card-padding)">
        <div>
          <h2 className="text-text">{title}</h2>
          <p className="text-text-tertiary text-sm">{description}</p>
        </div>
        <div>{actions}</div>
      </div>
      <ul
        className={cn(
          "[--row-py:--spacing(4)]",
          "divide-border-tertiary flex flex-col divide-y",
          "pb-[calc(var(--card-padding)-var(--row-py))]",
        )}
      >
        {items.map((item) => (
          <li key={item.key} className="flex px-(--card-padding) py-(--row-py)">
            <div className="flex-1">
              <Tooltip
                side="right"
                delayDuration={500}
                className="max-w-lg text-sm"
                sideOffset={10}
                open={!item.tooltip ? false : undefined}
                tooltip={item.tooltip}
              >
                <p
                  className={cn(
                    "inline-block text-sm",
                    "decoration-text-secondary/50 decoration-dotted underline-offset-2",
                    item.tooltip && "underline",
                  )}
                >
                  {item.key}
                </p>
              </Tooltip>
            </div>
            <div className="flex flex-1 items-center text-sm">
              {isLoading && <Skeleton className="h-4 w-full" />}
              {!isLoading && <p>{item.value ?? "---"}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
