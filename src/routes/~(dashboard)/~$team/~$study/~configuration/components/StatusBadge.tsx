//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Badge, StatusDot } from "@stanfordspezi/spezi-web-design-system";

interface StatusBadgeProps {
  isPublished?: boolean;
}

export const StatusBadge = ({ isPublished }: StatusBadgeProps) => {
  return (
    <Badge variant="outline">
      <div className="flex items-center gap-2 py-0.5">
        <StatusDot
          aria-hidden
          status={isPublished ? "success" : "default"}
          appearance="glow"
        />
        <p>{isPublished ? "Published" : "Draft"}</p>
      </div>
    </Badge>
  );
};
