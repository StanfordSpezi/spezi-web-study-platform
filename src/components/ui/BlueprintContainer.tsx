//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { cn } from "@stanfordspezi/spezi-web-design-system";
import { type ReactNode } from "react";

interface BluePrintCardProps {
  children?: ReactNode;
  className?: string;
}

export const BlueprintContainer = ({
  children,
  className,
}: BluePrintCardProps) => {
  return (
    <div
      className={cn(
        "[--border-width:1px] [--card-padding:--spacing(6)]",
        "w-full rounded-xl border-(length:--border-width) p-(--card-padding)",
        className,
      )}
    >
      {/* Horizontal Top Border */}
      <div
        className={cn(
          "absolute top-(--card-padding) left-0 -translate-y-(--border-width)",
          "h-(--border-width) w-full",
        )}
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border-tertiary) 0%, transparent 30%, transparent 70%, var(--color-border-tertiary) 100%)",
        }}
      />

      {/* Horizontal Bottom Border */}
      <div
        className={cn(
          "absolute bottom-(--card-padding) left-0 translate-y-(--border-width)",
          "h-(--border-width) w-full",
        )}
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border-tertiary) 0%, transparent 30%, transparent 70%, var(--color-border-tertiary) 100%)",
        }}
      />

      {/* Vertical Left Border */}
      <div
        className={cn(
          "absolute top-0 left-(--card-padding) -translate-x-(--border-width)",
          "bg-border-tertiary h-full w-(--border-width)",
        )}
      />

      {/* Vertical Right Border */}
      <div
        className={cn(
          "absolute top-0 right-(--card-padding) translate-x-(--border-width)",
          "bg-border-tertiary h-full w-(--border-width)",
        )}
      />
      {children}
    </div>
  );
};
