//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { notImplementedAlert } from "@stanfordspezi/spezi-web-design-system";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PhonePreview } from "@/components/interfaces/PhonePreview";
import { Card } from "@/components/ui/Card";
import { BasicInfoForm } from "./components/BasicInfoForm";
import { BasicInfoLayout } from "./components/BasicInfoLayout";
import { BasicInfoPreview } from "./components/BasicInfoPreview";
import { useBasicInfoForm } from "./lib/useBasicInfoForm";

const BasicInformationRouteComponent = () => {
  const form = useBasicInfoForm();
  const [highlightedField, setHighlightedField] = useState<
    string | undefined
  >();

  const handleSave = form.handleSubmit(notImplementedAlert);

  return (
    <BasicInfoLayout onSave={handleSave}>
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
    </BasicInfoLayout>
  );
};

export const Route = createFileRoute(
  "/(dashboard)/$team/$study/configuration/basic-information",
)({
  component: BasicInformationRouteComponent,
});
