//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Field } from "@stanfordspezi/spezi-web-design-system";
import type { BaseSyntheticEvent } from "react";
import { DurationInput } from "@/components/interfaces/DurationInput";
import { CardHeader } from "@/components/ui/Card";
import { FieldLabel } from "@/components/ui/FieldLabel";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/MultiSelect";
import { enhanceField } from "@/utils/enhanceField";
import { healthDataTypes } from "../../lib/healthDataTypes";
import type { ComponentForm } from "../../lib/useComponentForm";

interface HealthDataComponentFormProps {
  form: ComponentForm;
  onSubmit: (event?: BaseSyntheticEvent) => Promise<void>;
}

export const HealthDataComponentForm = ({
  form,
  onSubmit,
}: HealthDataComponentFormProps) => {
  return (
    <>
      <CardHeader
        title="Health Data Component"
        description="Collect health data from participants."
      />
      <form onSubmit={onSubmit} className="py-6">
        <Field
          control={form.control}
          name="historicalDataCollection"
          label={
            <FieldLabel
              title="Historical data collection"
              description="The amount of past health data to collect when a participant first enrolls in the study."
            />
          }
          render={({ field }) => <DurationInput {...enhanceField(field)} />}
          className="border-border-tertiary border-b px-6"
        />
        <Field
          control={form.control}
          name="sampleTypes"
          label={
            <FieldLabel
              title="Sample types"
              description="The types of health data to collect from participants."
            />
          }
          render={({ field }) => (
            <MultiSelect values={field.value} onValuesChange={field.onChange}>
              <MultiSelectTrigger>
                <MultiSelectValue
                  className="[&_[data-selected-item=true]]:bg-fill-tertiary"
                  overflowBehavior="wrap"
                />
              </MultiSelectTrigger>
              <MultiSelectContent>
                {Object.entries(healthDataTypes).map(([category, values]) => (
                  <MultiSelectGroup key={category} heading={category}>
                    {values.map(({ label, value }) => (
                      <MultiSelectItem
                        key={value}
                        value={value}
                        keywords={[label, category]}
                      >
                        {label}
                      </MultiSelectItem>
                    ))}
                  </MultiSelectGroup>
                ))}
              </MultiSelectContent>
            </MultiSelect>
          )}
          className="px-6 pt-6"
        />
      </form>
    </>
  );
};
