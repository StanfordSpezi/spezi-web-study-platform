//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  ConfirmDeleteDialog,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Error,
  Field,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tooltip,
  useOpenState,
} from "@stanfordspezi/spezi-web-design-system";
import { CalendarSync } from "lucide-react";
import { DurationInput } from "@/components/interfaces/DurationInput";
import { FeaturedIconContainer } from "@/components/ui/FeaturedIconContainer";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { TimeSelect } from "@/components/ui/TimeSelect";
import { useUpdateComponentMutation } from "@/lib/queries/component";
import { enhanceField } from "@/utils/enhanceField";
import { formatSchedule } from "../../lib/formatSchedule";
import { useScheduleForm } from "../../lib/useScheduleForm";

export const ScheduleDialog = () => {
  const dialog = useOpenState();
  const updateComponent = useUpdateComponentMutation();
  const { form, component } = useScheduleForm();
  const formValues = form.watch();

  const mode = component?.schedule ? "edit" : "create";
  const isRepeatTypeNone = formValues.repeatType === "none";
  const repeatIntervalTooltip =
    "Repeat interval is disabled when the component does not repeat. Select Daily or Weekly to configure the interval.";

  const handleSubmit = form.handleSubmit((data) => {
    if (!component) return;

    updateComponent.mutate(
      {
        componentId: component.id,
        type: component.type,
        schedule: data,
      },
      {
        onSuccess: (data) => {
          dialog.close();
          form.reset(
            data.schedule ?? {
              repeatType: "daily",
              displayHour: 9,
              displayMinute: 0,
              completionPolicy: "anytime",
            },
          );
        },
      },
    );
  });

  const deleteDialog = useOpenState();
  const handleDelete = () => {
    if (!component) return;
    updateComponent.mutate(
      {
        componentId: component.id,
        type: component.type,
        schedule: null,
      },
      {
        onSuccess: () => {
          dialog.close();
          form.reset();
        },
      },
    );
    deleteDialog.close();
  };

  if (!component) return null;

  return (
    <>
      <Dialog open={dialog.isOpen} onOpenChange={dialog.setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="text-sm">
            {mode === "create" ? "Add schedule" : "Edit schedule"}
          </Button>
        </DialogTrigger>
        <DialogContent size="3xl" className="px-0">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="items-center px-6 pb-6 sm:items-start">
              <FeaturedIconContainer className="border-border-tertiary mb-4 size-8 rounded-lg shadow-xs">
                <div className="grid size-full place-items-center">
                  <CalendarSync className="text-text-tertiary size-4" />
                </div>
              </FeaturedIconContainer>
              <DialogTitle className="leading-none">Schedule</DialogTitle>
              <DialogDescription>
                Define when this component becomes active during the study.
              </DialogDescription>
            </DialogHeader>
            <Field
              control={form.control}
              name="startOffset"
              label={
                <FieldLabel
                  title="Start offset"
                  description="Duration to wait after enrollment before showing this component."
                />
              }
              className="border-border-tertiary bg-layer border-y px-6 pt-6"
              render={({ field }) => <DurationInput {...enhanceField(field)} />}
            />
            <div className="border-border-tertiary bg-layer flex gap-8 border-b px-6 pt-6">
              <Field
                control={form.control}
                name="repeatType"
                label={
                  <FieldLabel
                    title="Repeat type"
                    description="None, daily or specific weekdays."
                  />
                }
                className="flex-1"
                render={({ field: { onChange, ...field } }) => (
                  <Select
                    onValueChange={(value) => {
                      onChange(value);
                      if (value === "none") {
                        form.setValue("repeatInterval", 0, {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      }
                    }}
                    {...field}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <Field
                control={form.control}
                name="repeatInterval"
                label={
                  <FieldLabel
                    title="Repeat interval"
                    description="The spacing between each occurrence."
                  />
                }
                className="flex-1"
                render={({ field }) => (
                  <Tooltip
                    className="max-w-xs text-sm"
                    variant="inverted"
                    delayDuration={200}
                    open={isRepeatTypeNone ? undefined : false}
                    tooltip={repeatIntervalTooltip}
                  >
                    <div className="w-full">
                      <Input
                        type="number"
                        disabled={isRepeatTypeNone}
                        placeholder={
                          isRepeatTypeNone ? "Not applicable" : undefined
                        }
                        aria-disabled={isRepeatTypeNone}
                        {...enhanceField(field, { valueAsNumber: true })}
                      />
                    </div>
                  </Tooltip>
                )}
              />
            </div>
            <div className="border-border-tertiary bg-layer flex gap-8 border-b px-6 pt-6">
              <div className="flex-1">
                <Label htmlFor="schedule-time" className="mb-2 flex">
                  <FieldLabel
                    title="Schedule time"
                    description="Time of day when this component becomes active."
                  />
                </Label>
                <TimeSelect
                  id="schedule-time"
                  value={{
                    hours: formValues.displayHour,
                    minutes: formValues.displayMinute as 0 | 30,
                  }}
                  onChange={({ hours, minutes }) => {
                    form.setValue("displayHour", hours);
                    form.setValue("displayMinute", minutes);
                  }}
                />
                <Error>
                  {form.formState.errors.displayHour?.message ??
                    form.formState.errors.displayMinute?.message}
                </Error>
              </div>
              <Field
                control={form.control}
                name="completionPolicy"
                label={
                  <FieldLabel
                    title="Completion policy"
                    description="When users can mark tasks as complete."
                  />
                }
                className="flex-1"
                render={({ field: { onChange, ...field } }) => (
                  <Select onValueChange={onChange} {...field}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="after-start">After start</SelectItem>
                      <SelectItem value="anytime">Anytime</SelectItem>
                      <SelectItem value="same-day-after-start">
                        Same day after start
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex items-center justify-between gap-4 px-6 pt-6">
              <p className="text-text-tertiary text-sm">
                {form.formState.isValid && formatSchedule(formValues)}
              </p>
              <div className="flex gap-4">
                {mode === "edit" && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={deleteDialog.open}
                  >
                    Delete
                  </Button>
                )}
                <Button type="submit" variant="default" size="sm">
                  {mode === "create" ? "Add schedule" : "Save changes"}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <ConfirmDeleteDialog
        open={deleteDialog.isOpen}
        onOpenChange={deleteDialog.setIsOpen}
        entityName="schedule"
        onDelete={handleDelete}
      />
    </>
  );
};
