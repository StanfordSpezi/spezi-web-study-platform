//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button, DataTable } from "@stanfordspezi/spezi-web-design-system";
import { createColumnHelper } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import type { Component } from "@/server/database/entities/component/schema";
import { cn } from "@/utils/cn";
import { ComponentsCardEmpty } from "./ComponentsCardEmpty";
import {
  ComponentsCardRowActions,
  ComponentsCardRowLabel,
  ComponentsCardRowSchedule,
  ComponentsCardRowSummary,
} from "./ComponentsCardRow";
import { ComponentsCardSkeleton } from "./ComponentsCardSkeleton";
import { NewComponentDialog } from "./NewComponentDialog";
import {
  getComponentLabel,
  getComponentSchedule,
  getComponentSummary,
} from "../../lib/formatComponent";

const columnHelper = createColumnHelper<Component>();

const columnDefinition = {
  label: columnHelper.accessor(getComponentLabel, {
    id: "label",
    header: "Component",
    cell: (props) => {
      const label = props.getValue();
      return (
        <ComponentsCardRowLabel
          label={label}
          componentId={props.row.original.id}
        />
      );
    },
    maxSize: 200,
  }),
  summary: columnHelper.accessor(getComponentSummary, {
    id: "summary",
    header: "Summary",
    cell: (props) => {
      const summary = props.getValue();
      return <ComponentsCardRowSummary summary={summary} />;
    },
  }),
  schedule: columnHelper.accessor(getComponentSchedule, {
    id: "schedule",
    header: "Schedule",
    cell: (props) => {
      const schedule = props.getValue();
      return <ComponentsCardRowSchedule schedule={schedule} />;
    },
  }),
  actions: columnHelper.accessor("id", {
    id: "actions",
    header: "Actions",
    cell: (props) => {
      const componentId = props.getValue();
      return <ComponentsCardRowActions componentId={componentId} />;
    },
    minSize: 50,
    maxSize: 50,
  }),
};

const ComponentsCardContent = ({ components }: { components: Component[] }) => {
  return (
    <DataTable
      entityName="components"
      columns={[
        columnDefinition.label,
        columnDefinition.summary,
        columnDefinition.schedule,
        columnDefinition.actions,
      ]}
      data={components}
      bordered={false}
      className={cn([
        "!bg-layer",
        "[&_th]:bg-fill-secondary",
        "[&_th:last-of-type_button]:!hidden", // Hide the "Action" header button
      ])}
    />
  );
};

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
