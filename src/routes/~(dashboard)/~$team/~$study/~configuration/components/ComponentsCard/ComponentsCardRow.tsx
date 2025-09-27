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
import type { Component } from "@/server/database/entities/component/schema";
import { cn } from "@/utils/cn";
import { formatComponent } from "../../lib/formatComponent";

interface ComponentsCardRowProps {
  component: Component;
}

export const ComponentsCardRow = ({ component }: ComponentsCardRowProps) => {
  const params = useParams({ strict: false });
  const deleteComponent = useDeleteComponentMutation();

  const { label, summary, schedule } = formatComponent(component);

  if (!params.team || !params.study) {
    console.warn("Missing team or study parameter");
    return null;
  }

  return (
    <li
      className={cn(
        "h-(--row-h) px-(--card-padding) text-sm",
        "grid grid-cols-(--cols) items-center gap-4",
        "border-border-tertiary border-b",
      )}
    >
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
            component: component.id,
          }}
          className="focus-ring hover:text-text decoration-text-tertiary min-w-0 truncate rounded-sm underline-offset-2 hover:underline"
        >
          {label.text}
        </Link>
      </div>
      <div className="min-w-0">
        <Tooltip
          tooltip={summary}
          className="whitespace-break-spaces"
          variant="inverted"
        >
          <div className="max-w-fit truncate">{summary}</div>
        </Tooltip>
      </div>
      <div className="min-w-0 truncate">{schedule}</div>
      <div className="flex-center h-full">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size={null}
              className="size-8 rounded-sm p-2"
            >
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
                  component: component.id,
                }}
              >
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={deleteComponent.isPending}
              onClick={() =>
                deleteComponent.mutate({ componentId: component.id })
              }
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </li>
  );
};
