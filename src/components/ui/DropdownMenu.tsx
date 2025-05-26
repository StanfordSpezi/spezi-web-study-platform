//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  DropdownMenu,
  DropdownMenuContent as _DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem as _DropdownMenuItem,
  DropdownMenuLabel as _DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@stanfordspezi/spezi-web-design-system";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

const DropdownMenuItem = ({
  className,
  ...props
}: ComponentProps<typeof _DropdownMenuItem>) => {
  return (
    <_DropdownMenuItem
      className={cn(
        "focus:bg-surface-hover focus:text-foreground cursor-pointer rounded-sm!",
        "[&_svg]:size-3.5!",
        className,
      )}
      {...props}
    />
  );
};

const DropdownMenuLabel = ({
  className,
  ...props
}: ComponentProps<typeof _DropdownMenuLabel>) => {
  return (
    <_DropdownMenuLabel
      className={cn("text-text-tertiary! font-medium!", className)}
      {...props}
    />
  );
};

const DropdownMenuContent = ({
  className,
  ...props
}: ComponentProps<typeof _DropdownMenuContent>) => {
  return (
    <_DropdownMenuContent
      className={cn("ring-border-shadow border-0 shadow-md ring", className)}
      {...props}
    />
  );
};

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
};
