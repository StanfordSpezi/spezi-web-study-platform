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
import { SaveButton } from "@/components/ui/SaveButton";
import { useUpdateStudyMutation } from "@/lib/queries/study";
import { EnrollmentForm } from "./components/EnrollmentForm";
import { EnrollmentLayout } from "./components/EnrollmentLayout";
import { useEnrollmentForm } from "./lib/useEnrollmentForm";

const EnrollmentRouteComponent = () => {
  const params = Route.useParams();
  const form = useEnrollmentForm();
  const { mutate, isPending, isSuccess, isError } = useUpdateStudyMutation();
  const handleSave = form.handleSubmit((data) => {
    mutate(
      { studyId: params.study, ...data },
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
    <EnrollmentLayout
      saveButton={
        <SaveButton
          onClick={handleSave}
          isPending={isPending}
          isSuccess={isSuccess}
          isError={isError}
        />
      }
    >
      <div className="max-w-4xl p-6">
        <EnrollmentForm form={form} onSubmit={handleSave} />
      </div>
      <NavigationBlocker shouldBlock={form.formState.isDirty} />
    </EnrollmentLayout>
  );
};

export const Route = createFileRoute(
  "/(dashboard)/$team/$study/configuration/enrollment",
)({
  component: EnrollmentRouteComponent,
});
