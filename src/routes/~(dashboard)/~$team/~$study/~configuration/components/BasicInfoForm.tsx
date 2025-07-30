//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Input, Field, Textarea } from "@stanfordspezi/spezi-web-design-system";
import { FieldLabel } from "@/components/ui/FieldLabel";
import type { BasicInfoForm as BasicInfoFormType } from "../lib/useBasicInfoForm";

interface BasicInfoFormProps {
  form: BasicInfoFormType;
  onSave: () => void;
}

export const BasicInfoForm = ({ form, onSave }: BasicInfoFormProps) => {
  return (
    <form onSubmit={onSave} className="py-6">
      <Field
        control={form.control}
        name="title"
        label={
          <FieldLabel
            title="Title"
            description="Be descriptive but keep it under 100 characters."
          />
        }
        render={({ field }) => <Input {...field} />}
        className="border-border-tertiary border-b px-6"
      />
      <Field
        control={form.control}
        name="shortTitle"
        label={
          <FieldLabel
            title="Short Title"
            description="Used in tight spaces where the full title won't fit."
          />
        }
        render={({ field }) => <Input {...field} />}
        className="border-border-tertiary border-b px-6 pt-6"
      />
      <Field
        control={form.control}
        name="explanation"
        label={
          <FieldLabel
            title="Explanation"
            description="This helps participants decide if they want to join."
          />
        }
        render={({ field }) => <Textarea {...field} />}
        className="border-border-tertiary border-b px-6 pt-6"
      />
      <Field
        control={form.control}
        name="shortExplanation"
        label={
          <FieldLabel
            title="Short Explanation"
            description="A short summary for preview cards and search results."
          />
        }
        render={({ field }) => <Textarea {...field} />}
        className="px-6 pt-6"
      />
    </form>
  );
};
