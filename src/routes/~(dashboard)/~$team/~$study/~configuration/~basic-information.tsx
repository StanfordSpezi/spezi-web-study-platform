//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { NavigationBlocker } from "@/components/interfaces/NavigationBlocker";
import { PhonePreview } from "@/components/interfaces/PhonePreview";
import { Card } from "@/components/ui/Card";
import { SaveButton } from "@/components/ui/SaveButton";
import { useUpdateStudyMutation } from "@/lib/mutations/study";
import { studyQueryKeys } from "@/lib/queries/study";
import { BasicInfoForm } from "./components/BasicInfoForm";
import { BasicInfoLayout } from "./components/BasicInfoLayout";
import { BasicInfoPreview } from "./components/BasicInfoPreview";
import { useBasicInfoForm } from "./lib/useBasicInfoForm";

const BasicInformationRouteComponent = () => {
  const params = Route.useParams();
  const form = useBasicInfoForm();
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError } = useUpdateStudyMutation();

  const [highlightedField, setHighlightedField] = useState<
    string | undefined
  >();

  const handleSave = form.handleSubmit((data) => {
    mutate(
      { studyId: params.study, ...data },
      {
        onSuccess: (data) => {
          // The title is shown in the header study selector, so if it was
          // changed, we need to invalidate the study list query as well.
          if (data.title !== form.formState.defaultValues?.title) {
            void queryClient.invalidateQueries({
              queryKey: studyQueryKeys.all,
            });
          }
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
    <BasicInfoLayout
      saveButton={
        <SaveButton
          onClick={handleSave}
          isPending={isPending}
          isSuccess={isSuccess}
          isError={isError}
        />
      }
    >
      <div className="flex max-w-7xl gap-8 p-6">
        <Card>
          <BasicInfoForm
            form={form}
            onSave={handleSave}
            onFieldFocus={setHighlightedField}
            onFieldBlur={() => setHighlightedField(undefined)}
          />
        </Card>
        <PhonePreview>
          <BasicInfoPreview form={form} highlightedField={highlightedField} />
        </PhonePreview>
      </div>
      <NavigationBlocker shouldBlock={form.formState.isDirty} />
    </BasicInfoLayout>
  );
};

export const Route = createFileRoute(
  "/(dashboard)/$team/$study/configuration/basic-information",
)({
  component: BasicInformationRouteComponent,
});
