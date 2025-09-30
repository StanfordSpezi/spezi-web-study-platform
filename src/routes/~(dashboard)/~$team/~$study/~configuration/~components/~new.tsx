//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createFileRoute } from "@tanstack/react-router";
import { useHotkeys } from "react-hotkeys-hook";
import { z } from "zod";
import { NavigationBlocker } from "@/components/interfaces/NavigationBlocker";
import { Card } from "@/components/ui/Card";
import { SaveButton } from "@/components/ui/SaveButton";
import { useCreateComponentMutation } from "@/lib/queries/component";
import { InformationComponentForm } from "./components/InformationComponentForm";
import { NewComponentLayout } from "./components/NewComponentLayout";
import { useComponentForm } from "../lib/useComponentForm";
import { HealthDataComponentForm } from "./components/HealthDataComponentForm";
import { QuestionnaireComponentForm } from "./components/QuestionnaireComponentForm";

const NewComponentRoute = () => {
  const { componentType = "information" } = Route.useSearch();
  const params = Route.useParams();
  const navigate = Route.useNavigate();

  const createComponent = useCreateComponentMutation();
  const form = useComponentForm();

  const handleSubmit = form.handleSubmit((data) => {
    createComponent.mutate(
      { ...data, schedule: null },
      {
        onSuccess: (data) => {
          form.reset(data);
          void navigate({
            to: "/$team/$study/configuration/components",
            params: { team: params.team, study: params.study },
          });
        },
      },
    );
  });

  useHotkeys(
    "meta+enter",
    () => void handleSubmit(),
    { enableOnFormTags: ["input", "textarea"] },
    [form],
  );

  return (
    <NewComponentLayout
      saveButton={
        <SaveButton
          size="sm"
          className="text-sm"
          onClick={handleSubmit}
          isPending={createComponent.isPending}
          isSuccess={createComponent.isSuccess}
          isError={createComponent.isError}
        />
      }
    >
      <div className="flex max-w-4xl p-6">
        <Card>
          {componentType === "information" && (
            <InformationComponentForm form={form} onSubmit={handleSubmit} />
          )}
          {componentType === "questionnaire" && (
            <QuestionnaireComponentForm form={form} onSubmit={handleSubmit} />
          )}
          {componentType === "health-data" && (
            <HealthDataComponentForm form={form} onSubmit={handleSubmit} />
          )}
        </Card>
      </div>
      <NavigationBlocker
        shouldBlock={form.formState.isDirty && createComponent.isIdle}
      />
    </NewComponentLayout>
  );
};

export const Route = createFileRoute(
  "/(dashboard)/$team/$study/configuration/components/new",
)({
  component: NewComponentRoute,
  validateSearch: z.object({
    componentType: z
      .enum(["information", "questionnaire", "health-data"])
      .optional(),
  }),
});
