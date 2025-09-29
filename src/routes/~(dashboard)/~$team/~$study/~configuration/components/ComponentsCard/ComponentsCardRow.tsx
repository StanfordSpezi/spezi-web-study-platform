//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
} from "@stanfordspezi/spezi-web-design-system";
import { Link, useParams } from "@tanstack/react-router";
import { Ellipsis } from "lucide-react";
import { FeaturedIconContainer } from "@/components/ui/FeaturedIconContainer";
import { useDeleteComponentMutation } from "@/lib/queries/component";
import { cn } from "@/utils/cn";
import {
  type getComponentLabel,
  type getComponentSchedule,
  type getComponentSummary,
} from "../../lib/formatComponent";

interface ComponentsCardRowLabelProps {
  label: ReturnType<typeof getComponentLabel>;
  componentId: string;
}

export const ComponentsCardRowLabel = ({
  label,
  componentId,
}: ComponentsCardRowLabelProps) => {
  const params = useParams({ strict: false });
  if (!params.team || !params.study) {
    console.warn("Missing team or study parameter");
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <div>
        <FeaturedIconContainer
          className={cn(
            "[--container-radius:var(--radius-md)]",
            "border-border-tertiary size-6 shadow-xs",
          )}
        >
          <label.icon
            className={cn("size-full rounded p-[3px]", label.className)}
          />
        </FeaturedIconContainer>
      </div>
      <Link
        to="/$team/$study/configuration/components/$component"
        params={{
          team: params.team,
          study: params.study,
          component: componentId,
        }}
        className="focus-ring hover:text-text decoration-text-tertiary min-w-0 truncate rounded-sm underline-offset-2 hover:underline"
      >
        {label.text}
      </Link>
    </div>
  );
};

interface ComponentsCardRowSummaryProps {
  summary: ReturnType<typeof getComponentSummary>;
}

export const ComponentsCardRowSummary = (
  props: ComponentsCardRowSummaryProps,
) => {
  return (
    <Tooltip
      tooltip={props.summary}
      className="whitespace-break-spaces"
      variant="inverted"
      delayDuration={1000}
    >
      <span className="line-clamp-1">{props.summary}</span>
    </Tooltip>
  );
};

interface ComponentsCardRowScheduleProps {
  schedule: ReturnType<typeof getComponentSchedule>;
}

export const ComponentsCardRowSchedule = (
  props: ComponentsCardRowScheduleProps,
) => {
  return <div className="min-w-0 truncate">{props.schedule}</div>;
};

interface ComponentsCardRowActionsProps {
  componentId: string;
}

export const ComponentsCardRowActions = ({
  componentId,
}: ComponentsCardRowActionsProps) => {
  const params = useParams({ strict: false });
  const deleteComponent = useDeleteComponentMutation();

  if (!params.team || !params.study) {
    console.warn("Missing team or study parameter");
    return null;
  }

  return (
    <div className="flex-center h-full">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size={null} className="size-8 rounded-sm p-2">
            <Ellipsis className="opacity-80" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="left" align="start">
          <DropdownMenuItem asChild>
            <Link
              to="/$team/$study/configuration/components/$component"
              params={{
                team: params.team,
                study: params.study,
                component: componentId,
              }}
            >
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteComponent.isPending}
            onClick={() => deleteComponent.mutate({ componentId })}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
