//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Badge, cn } from "@stanfordspezi/spezi-web-design-system";

interface StatusBadgeProps {
  isPublished?: boolean;
}

export const StatusBadge = ({ isPublished }: StatusBadgeProps) => {
  return (
    <Badge
      size={null}
      variant="outline"
      className="flex h-7 gap-2 rounded-lg px-2 text-sm"
    >
      <div className="bg-layer size-4 rounded-full border bg-clip-padding p-1 shadow-xs">
        <div
          className={cn(
            "size-full rounded-full",
            isPublished ? "bg-fill-success" : "bg-fill-secondary",
            isPublished && "shadow-fill-success/5",
          )}
          style={{ boxShadow: "0 0 6px 6px var(--tw-shadow-color)" }}
        />
      </div>
      <span>{isPublished ? "Published" : "Draft"}</span>
    </Badge>
  );
};
