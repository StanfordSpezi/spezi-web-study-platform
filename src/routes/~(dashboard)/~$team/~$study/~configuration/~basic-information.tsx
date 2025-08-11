//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { notImplementedAlert } from "@stanfordspezi/spezi-web-design-system";
import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/Card";
import { BasicInfoForm } from "./components/BasicInfoForm";
import { BasicInfoLayout } from "./components/BasicInfoLayout";
import { useBasicInfoForm } from "./lib/useBasicInfoForm";

const BasicInformationRouteComponent = () => {
  const form = useBasicInfoForm();

  const handleSave = form.handleSubmit(notImplementedAlert);

  return (
    <BasicInfoLayout onSave={handleSave}>
      <div className="max-w-7xl p-6">
        <Card>
          <BasicInfoForm form={form} onSave={handleSave} />
        </Card>
      </div>
    </BasicInfoLayout>
  );
};

export const Route = createFileRoute(
  "/(dashboard)/$team/$study/configuration/basic-information",
)({
  component: BasicInformationRouteComponent,
});
