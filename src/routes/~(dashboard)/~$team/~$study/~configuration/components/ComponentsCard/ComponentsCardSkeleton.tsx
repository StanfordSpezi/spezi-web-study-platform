//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  Skeleton,
  times,
} from "@stanfordspezi/spezi-web-design-system";
import { Plus } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { cn } from "@/utils/cn";

export const ComponentsCardSkeleton = () => {
  return (
    <Card>
      <CardHeader
        title="Components"
        description="The building blocks that define what participants see and do in your study."
      >
        <Button size="sm" variant="outline" className="text-text h-8 text-sm">
          <Plus className="size-3.5 opacity-80" />
          Add component
        </Button>
      </CardHeader>
      <ul
        className={cn(
          "[--cols:200px_1fr_1fr_50px] [--row-h:--spacing(10)]",
          "flex flex-col gap-2 pb-(--card-padding)",
        )}
      >
        <li
          className={cn(
            "bg-fill-secondary text-text-tertiary border-border-tertiary h-(--row-h) border-b px-(--card-padding) text-sm",
            "grid grid-cols-(--cols) items-center gap-4",
          )}
        >
          <p>Component</p>
          <p>Summary</p>
          <p>Schedule</p>
        </li>
        {times(3, (i) => (
          <div key={i} className="px-(--card-padding)">
            <Skeleton className="h-(--row-h) w-full" />
          </div>
        ))}
      </ul>
    </Card>
  );
};
