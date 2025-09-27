//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button } from "@stanfordspezi/spezi-web-design-system";
import { Plus } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import type { Component } from "@/server/database/entities/component/schema";
import { cn } from "@/utils/cn";
import { ComponentsCardEmpty } from "./ComponentsCardEmpty";
import { ComponentsCardRow } from "./ComponentsCardRow";
import { ComponentsCardSkeleton } from "./ComponentsCardSkeleton";
import { NewComponentDialog } from "./NewComponentDialog";

const ComponentsCardHeader = () => {
  return (
    <CardHeader
      title="Components"
      description="The building blocks that define what participants see and do in your study."
    >
      <NewComponentDialog>
        <Button size="sm" variant="outline" className="!h-8 text-sm">
          <Plus className="size-3.5 opacity-80" />
          Add component
        </Button>
      </NewComponentDialog>
    </CardHeader>
  );
};

const ComponentsCardContent = ({ components }: { components: Component[] }) => {
  return (
    <ul
      className={cn(
        "[--cols:200px_1fr_1fr_50px] [--row-h:--spacing(12)]",
        "flex flex-col pb-(--card-padding)",
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
      {components.map((component) => (
        <ComponentsCardRow key={component.id} component={component} />
      ))}
    </ul>
  );
};

interface ComponentsCardProps {
  components?: Component[];
  isLoading?: boolean;
  showHeader?: boolean;
}

export const ComponentsCard = ({
  components,
  isLoading,
  showHeader = true,
}: ComponentsCardProps) => {
  if (isLoading || !components) {
    return <ComponentsCardSkeleton />;
  }

  if (components.length === 0) {
    return <ComponentsCardEmpty />;
  }

  return (
    <Card className="overflow-hidden">
      {showHeader && <ComponentsCardHeader />}
      <ComponentsCardContent components={components} />
    </Card>
  );
};
