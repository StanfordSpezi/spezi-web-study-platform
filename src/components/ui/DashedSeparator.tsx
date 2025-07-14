//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

interface DashedSeparatorProps extends ComponentProps<"div"> {}

/**
 * Renders a horizontal dashed separator line.
 *
 * @remarks
 * The appearance of the dashes can be customized using the following CSS variables:
 * - `--dash-color`: Sets the color of the dashes (defaults to `var(--color-border)`).
 * - `--dash-size`: Sets the length of each dash (defaults to `--spacing(2)`).
 */
export const DashedSeparator = ({
  className,
  style,
  ...props
}: DashedSeparatorProps) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-px w-full",
        "[--dash-color:var(--color-border)] [--dash-size:--spacing(2)]",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--dash-color), var(--dash-color) 75%, transparent 75%, transparent 100%)",
        backgroundSize: "var(--dash-size) 1px",
        ...style,
      }}
      {...props}
    />
  );
};
