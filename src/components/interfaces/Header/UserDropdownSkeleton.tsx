//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/utils/cn";

export const UserDropdownSkeleton = () => {
  return (
    <div
      className={cn(
        "flex h-8 items-center gap-3 rounded-md p-1 text-left text-sm outline-hidden",
        "hover:bg-bg-hover",
        "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
        "focus-visible:ring-2",
        "[&>span:last-child]:truncate",
        "[&>svg]:size-3.5 [&>svg]:shrink-0",
      )}
    >
      <Avatar
        className="bg-surface ring-border-shadow size-6.5 rounded-full shadow-xs ring"
        fallback={<div className="bg-surface rounded-lg text-xs" />}
      />
    </div>
  );
};
