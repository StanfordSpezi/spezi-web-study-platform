//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Field, Label, Switch } from "@stanfordspezi/spezi-web-design-system";
import { DurationInput } from "@/components/interfaces/DurationInput";
import { formatLogicClausesError } from "@/components/interfaces/LogicGroupInput/formatLogicClausesError";
import { LogicGroupInput } from "@/components/interfaces/LogicGroupInput/LogicGroupInput";
import { Card } from "@/components/ui/Card";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { enhanceField } from "@/utils/enhanceField";
import { EnrollmentPeriodDatePicker } from "./EnrollmentPeriodDatePicker";
import { participationAttributeOptions } from "../lib/participationAttributeOptions";
import type { EnrollmentForm as EnrollmentFormType } from "../lib/useEnrollmentForm";

interface EnrollmentFormProps {
  form: EnrollmentFormType;
  onSubmit: () => void;
}

export const EnrollmentForm = ({ form, onSubmit }: EnrollmentFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card className="py-6">
        <Label className="mb-2 flex px-6">
          <FieldLabel
            title="Enrollment period"
            description="The date range when new participants can join your study."
          />
        </Label>
        <div className="border-border-tertiary flex gap-4 border-b px-6">
          <Field
            control={form.control}
            name="enrollmentPeriod.start"
            render={({ field }) => (
              <EnrollmentPeriodDatePicker type="start" {...field} />
            )}
            className="w-full"
          />
          <div className="flex-center h-10">
            <div className="bg-border h-0.5 w-5" />
          </div>
          <Field
            control={form.control}
            name="enrollmentPeriod.end"
            render={({ field }) => (
              <EnrollmentPeriodDatePicker type="end" {...field} />
            )}
            className="w-full"
          />
        </div>
        <Field
          control={form.control}
          name="studyDuration"
          label={
            <FieldLabel
              title="Study Duration"
              description="The duration each participant stays in the study from their individual start date."
            />
          }
          render={({ field }) => <DurationInput {...enhanceField(field)} />}
          className="px-6 pt-6"
        />
      </Card>
      <Card className="py-6">
        <Field
          control={form.control}
          name="isPrivateStudy"
          render={({ field: { value, onChange, ...field } }) => (
            <div className="flex items-center justify-between gap-6">
              <Label htmlFor={field.name}>
                <FieldLabel
                  title="Private study"
                  description="When enabled, only people with an invitation link can join. No public enrollment."
                  className="pb-0"
                />
              </Label>
              <Switch checked={value} onCheckedChange={onChange} {...field} />
            </div>
          )}
          className="border-border-tertiary border-b px-6"
        />
        <Field
          control={form.control}
          name="participationCriteria"
          label={
            <FieldLabel
              title="Participation criteria"
              description="Filter who can join based on age, location, or other demographics. Only for public studies."
            />
          }
          render={({ field }) => (
            <LogicGroupInput
              attributeOptions={participationAttributeOptions}
              {...field}
            />
          )}
          className="px-6 pt-6"
          error={{
            message: formatLogicClausesError(
              form.formState.errors.participationCriteria,
            ),
          }}
        />
      </Card>
    </form>
  );
};
