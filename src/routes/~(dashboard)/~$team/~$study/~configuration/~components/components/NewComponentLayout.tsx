//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button } from "@stanfordspezi/spezi-web-design-system";
import { useSearch } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { RouteHeader, RouteHeaderBackLink } from "@/components/ui/RouteHeader";
import { NewComponentDialog } from "../../components/ComponentsCard/NewComponentDialog";

interface ComponentsLayoutProps {
  children: ReactNode;
  saveButton: ReactNode;
}

const componentTitle = {
  information: "Information",
  "health-data": "Health Data",
  questionnaire: "Questionnaire",
};

export const NewComponentLayout = ({
  children,
  saveButton,
}: ComponentsLayoutProps) => {
  const { componentType = "information" } = useSearch({
    from: "/(dashboard)/$team/$study/configuration/components/new",
  });
  return (
    <div>
      <RouteHeader
        title={`New ${componentTitle[componentType]} Component`}
        description="Configure the details of your new component."
        accessoryLeft={<RouteHeaderBackLink />}
        accessoryRight={
          <div className="flex gap-6">
            {/* We need to force a re-render when the component type changes
             to dismiss the modal after changing the component type */}
            <NewComponentDialog key={componentType}>
              <Button variant="outline" size="sm" className="text-sm">
                Change type
              </Button>
            </NewComponentDialog>
            {saveButton}
          </div>
        }
      />
      {children}
    </div>
  );
};
