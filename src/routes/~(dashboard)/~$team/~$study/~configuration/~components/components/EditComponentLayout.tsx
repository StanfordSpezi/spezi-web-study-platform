//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  ConfirmDeleteDialog,
} from "@stanfordspezi/spezi-web-design-system";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { RouteHeader, RouteHeaderBackLink } from "@/components/ui/RouteHeader";
import { useDeleteComponentMutation } from "@/lib/queries/component";
import { ScheduleDialog } from "./ScheduleDialog";

interface ComponentsLayoutProps {
  children: ReactNode;
  saveButton: ReactNode;
}

export const EditComponentLayout = ({
  children,
  saveButton,
}: ComponentsLayoutProps) => {
  const params = useParams({
    from: "/(dashboard)/$team/$study/configuration/components/$component",
  });
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const deleteComponent = useDeleteComponentMutation({
    onSuccess: () => {
      return navigate({
        to: "/$team/$study/configuration/components",
        params: { team: params.team, study: params.study },
      });
    },
  });
  return (
    <>
      <div>
        <RouteHeader
          title="Edit Component"
          description="Configure the details of your component."
          accessoryLeft={<RouteHeaderBackLink />}
          accessoryRight={
            <div className="flex gap-6">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm"
                onClick={() => {
                  setIsDeleteModalOpen(true);
                }}
              >
                Delete
              </Button>
              <ScheduleDialog />
              {saveButton}
            </div>
          }
        />
        {children}
      </div>
      <ConfirmDeleteDialog
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        entityName="component"
        onDelete={() => {
          deleteComponent.mutate({ componentId: params.component });
          setIsDeleteModalOpen(false);
        }}
      />
    </>
  );
};
