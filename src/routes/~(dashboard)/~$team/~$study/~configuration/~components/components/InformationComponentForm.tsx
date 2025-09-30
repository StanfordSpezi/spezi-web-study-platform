//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Field, Input } from "@stanfordspezi/spezi-web-design-system";
import type { BaseSyntheticEvent } from "react";
import { CardHeader } from "@/components/ui/Card";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { MarkdownEditor } from "@/components/ui/MarkdownEditor";
import { enhanceField } from "@/utils/enhanceField";
import type { ComponentForm } from "../../lib/useComponentForm";

interface InformationComponentFormProps {
  form: ComponentForm;
  onSubmit: (event?: BaseSyntheticEvent) => Promise<void>;
}

export const InformationComponentForm = ({
  form,
  onSubmit,
}: InformationComponentFormProps) => {
  return (
    <>
      <CardHeader
        title="Information Component"
        description="Display text and images to provide instructions, explanations, or context to participants."
      />
      <form onSubmit={onSubmit} className="py-6">
        <Field
          control={form.control}
          name="title"
          label={
            <FieldLabel
              title="Title"
              description="The heading participants see for this information section."
            />
          }
          className="border-border-tertiary border-b px-6"
          render={({ field }) => <Input {...enhanceField(field)} />}
        />
        <Field
          control={form.control}
          name="image"
          label={
            <div className="flex justify-between">
              <FieldLabel
                title="Header image"
                description="Image to display above the content."
              />
              <p className="text-text-tertiary font-normal">Optional</p>
            </div>
          }
          className="border-border-tertiary border-b px-6 pt-6 [&_label]:flex-1"
          render={({ field }) => (
            <ImageUpload
              key={field.value}
              maxSizeInMB={10}
              setError={(message) => form.setError("image", { message })}
              {...field}
            />
          )}
        />
        <Field
          control={form.control}
          name="content"
          label={
            <FieldLabel
              title="Content"
              description="The main content participants will read."
            />
          }
          className="px-6 pt-6"
          render={({ field }) => <MarkdownEditor {...enhanceField(field)} />}
        />
      </form>
    </>
  );
};
