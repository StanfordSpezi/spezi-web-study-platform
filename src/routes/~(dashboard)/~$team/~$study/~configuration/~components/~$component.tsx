//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createFileRoute } from "@tanstack/react-router";
import { useHotkeys } from "react-hotkeys-hook";
import { NavigationBlocker } from "@/components/interfaces/NavigationBlocker";
import { Card } from "@/components/ui/Card";
import { SaveButton } from "@/components/ui/SaveButton";
import { useUpdateComponentMutation } from "@/lib/queries/component";
import { EditComponentLayout } from "./components/EditComponentLayout";
import { InformationComponentForm } from "./components/InformationComponentForm";
import { useComponentForm } from "../lib/useComponentForm";
import { HealthDataComponentForm } from "./components/HealthDataComponentForm";
import { QuestionnaireComponentForm } from "./components/QuestionnaireComponentForm";

const EditComponentRoute = () => {
  const params = Route.useParams();
  const updateComponent = useUpdateComponentMutation();
  const form = useComponentForm();
  const componentType = form.watch("type");

  const handleSave = form.handleSubmit((data) => {
    updateComponent.mutate(
      {
        componentId: params.component,
        ...data,
      },
      {
        onSuccess: (data) => {
          form.reset(data);
        },
      },
    );
  });

  useHotkeys(
    "meta+enter",
    () => void handleSave(),
    { enableOnFormTags: ["input", "textarea"] },
    [form],
  );

  return (
    <EditComponentLayout
      showScheduleButton={componentType !== "health-data"}
      saveButton={
        <SaveButton
          size="sm"
          className="text-sm"
          onClick={handleSave}
          isPending={updateComponent.isPending}
          isSuccess={updateComponent.isSuccess}
          isError={updateComponent.isError}
        />
      }
    >
      <div className="flex max-w-4xl p-6">
        <Card>
          {componentType === "information" && (
            <InformationComponentForm form={form} onSubmit={handleSave} />
          )}
          {componentType === "questionnaire" && (
            <QuestionnaireComponentForm form={form} onSubmit={handleSave} />
          )}
          {componentType === "health-data" && (
            <HealthDataComponentForm form={form} onSubmit={handleSave} />
          )}
        </Card>
      </div>
      <NavigationBlocker shouldBlock={form.formState.isDirty} />
    </EditComponentLayout>
  );
};

export const Route = createFileRoute(
  "/(dashboard)/$team/$study/configuration/components/$component",
)({
  component: EditComponentRoute,
});
