//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  Field,
  Textarea,
} from "@stanfordspezi/spezi-web-design-system";
import { useRef, type BaseSyntheticEvent, type ChangeEvent } from "react";
import { CardHeader } from "@/components/ui/Card";
import { FieldLabel } from "@/components/ui/FieldLabel";
import type { ComponentForm } from "../../lib/useComponentForm";

interface QuestionnaireComponentFormProps {
  form: ComponentForm;
  onSubmit: (event?: BaseSyntheticEvent) => Promise<void>;
}

export const QuestionnaireComponentForm = ({
  form,
  onSubmit,
}: QuestionnaireComponentFormProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const questionnaireValue = form.watch("fhirQuestionnaireJson");

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const formatted = JSON.stringify(parsed, null, 2);

      form.setValue("fhirQuestionnaireJson", formatted, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      form.clearErrors("fhirQuestionnaireJson");
    } catch {
      form.setError("fhirQuestionnaireJson", {
        message: "Invalid JSON file. Please upload a valid JSON document.",
      });
    } finally {
      event.target.value = "";
    }
  };

  const handleDownload = () => {
    if (!questionnaireValue.trim()) {
      form.setError("fhirQuestionnaireJson", {
        message: "There is no JSON to download yet.",
      });
      return;
    }

    try {
      const parsed = JSON.parse(questionnaireValue);
      const formatted = JSON.stringify(parsed, null, 2);
      const blob = new Blob([formatted], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "questionnaire.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      form.clearErrors("fhirQuestionnaireJson");
    } catch {
      form.setError("fhirQuestionnaireJson", {
        message: "JSON is invalid. Please fix it before downloading.",
      });
    }
  };

  const handleFormat = () => {
    if (!questionnaireValue.trim()) return;

    try {
      const parsed = JSON.parse(questionnaireValue);
      const formatted = JSON.stringify(parsed, null, 2);

      form.setValue("fhirQuestionnaireJson", formatted, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      form.clearErrors("fhirQuestionnaireJson");
    } catch {
      form.setError("fhirQuestionnaireJson", {
        message: "JSON is invalid. Please fix it before formatting.",
      });
    }
  };

  return (
    <>
      <CardHeader
        title="Questionnaire Component"
        description="Collect questionnaire responses from participants."
      />
      <form onSubmit={onSubmit} className="py-6">
        <Field
          control={form.control}
          name="fhirQuestionnaireJson"
          label={
            <FieldLabel
              title="FHIR Questionnaire JSON"
              description="The FHIR Questionnaire JSON to collect responses from participants."
            />
          }
          render={({ field }) => (
            <div>
              <Textarea {...field} rows={10} className="w-full font-mono" />
              <div className="flex flex-wrap justify-end gap-2 pt-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/json,application/fhir+json"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Button
                  type="button"
                  size="xs"
                  variant="outlineBg"
                  onClick={handleUploadClick}
                >
                  Upload JSON
                </Button>
                <Button
                  type="button"
                  size="xs"
                  variant="outlineBg"
                  onClick={handleDownload}
                >
                  Download JSON
                </Button>
                <Button
                  type="button"
                  size="xs"
                  variant="outlineBg"
                  onClick={handleFormat}
                >
                  Format JSON
                </Button>
              </div>
            </div>
          )}
          className="px-6"
        />
      </form>
    </>
  );
};
