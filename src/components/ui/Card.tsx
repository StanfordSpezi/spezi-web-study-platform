//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

interface CardProps extends ComponentProps<"div"> {}

export const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "[--card-padding:--spacing(5)]",
        "bg-layer flex w-full max-w-6xl flex-col rounded-xl border",
        "bg-clip-padding",
        "shadow-lg shadow-black/4",
        className,
      )}
      {...props}
    />
  );
};

interface CardHeaderProps extends ComponentProps<"div"> {
  title: string;
  description: string;
}

export const CardHeader = ({
  title,
  description,
  children,
}: CardHeaderProps) => {
  return (
    <div className="flex w-full items-center justify-between border-b p-(--card-padding)">
      <div>
        <h2 className="text-text">{title}</h2>
        <p className="text-text-tertiary text-sm">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};
