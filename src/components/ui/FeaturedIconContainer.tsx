//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ComponentProps } from "react";
import { cn } from "@/utils/cn";

interface FeaturedIconContainerProps extends ComponentProps<"div"> {}
/**
 * This component uses CSS variables to ensure that the nested container's rounded corners
 * are proportional to the border radius and padding of the outer container.
 *
 * Overwrite these variables to customize the appearance.
 * - `--container-padding`: Sets the padding of the outer container. Default: `--spacing(0.5)`.
 * - `--container-radius`: Sets the border radius of the outer container. Default: `var(--radius-xl)`.
 */
export const FeaturedIconContainer = ({
  children,
  className,
}: FeaturedIconContainerProps) => {
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
