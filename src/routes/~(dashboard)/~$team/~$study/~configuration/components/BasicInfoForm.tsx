//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Input,
  Field,
  Textarea,
  Label,
  Button,
  cn,
} from "@stanfordspezi/spezi-web-design-system";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { IconPicker } from "@/components/ui/IconPicker";
import { enhanceField } from "@/utils/enhanceField";
import type { BasicInfoForm as BasicInfoFormType } from "../lib/useBasicInfoForm";

interface BasicInfoFormProps {
  form: BasicInfoFormType;
  onSave: () => void;
  onFieldFocus?: (fieldName: string) => void;
  onFieldBlur?: () => void;
}

export const BasicInfoForm = ({
  form,
  onSave,
  onFieldFocus,
  onFieldBlur,
}: BasicInfoFormProps) => {
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
        render={({ field }) => (
          <Input
            className="focus:ring-border-info"
            onFocus={() => onFieldFocus?.("title")}
            {...enhanceField(field, { onBlur: onFieldBlur })}
          />
        )}
        className="border-border-tertiary border-b px-6"
      />
      <Label className="mb-2 flex px-6 pt-6">
        <FieldLabel
          title="Study icon & name"
          description="Used in tight spaces where the full title won't fit."
        />
      </Label>
      <div className="border-border-tertiary flex gap-4 border-b px-6">
        <Field
          control={form.control}
          name="icon"
          render={({ field: { value, onChange, ...field } }) => (
            <IconPicker
              value={value as IconName}
              onValueChange={onChange}
              {...field}
            >
              <Button
                size={null}
                variant="outline"
                className="bg-bg size-10 rounded-md"
              >
                <DynamicIcon
                  name={(value ?? "box-select") as IconName}
                  className={cn("size-4", !value && "text-text-tertiary")}
                />
              </Button>
            </IconPicker>
          )}
        />
        <Field
          control={form.control}
          name="shortTitle"
          render={({ field }) => <Input {...enhanceField(field)} />}
          className="flex-1"
        />
      </div>
      <Field
        control={form.control}
        name="explanation"
        label={
          <FieldLabel
            title="Explanation"
            description="This helps participants decide if they want to join."
          />
        }
        render={({ field }) => (
          <Textarea
            className="focus:ring-border-info"
            onFocus={() => onFieldFocus?.("explanation")}
            {...enhanceField(field, { onBlur: onFieldBlur })}
          />
        )}
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
        render={({ field }) => <Textarea {...enhanceField(field)} />}
        className="px-6 pt-6"
      />
    </form>
  );
};
