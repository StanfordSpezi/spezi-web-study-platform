//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  Calendar,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  type Nil,
} from "@stanfordspezi/spezi-web-design-system";
import { Calendar as CalendarIcon } from "lucide-react";
import { type ComponentProps } from "react";
import { cn } from "@/utils/cn";

export type EnrollmentPeriodDatePickerProps = Omit<
  ComponentProps<typeof Calendar>,
  "selected" | "onSelect" | "mode" | "timeZone" | "defaultMonth"
> & {
  type: "start" | "end";
  value: Nil<string>;
  onChange: (date: string | null) => void;
};

export const EnrollmentPeriodDatePicker = ({
  type,
  value,
  onChange,
  ...props
}: EnrollmentPeriodDatePickerProps) => {
  const dateValue = value ? new Date(value) : undefined;
  const handleSelect = (date?: Date) => {
    onChange(date?.toISOString().split("T")[0] ?? null);
  };

  const getButtonLabel = () => {
    if (dateValue) {
      const dateString = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(dateValue);
      const label =
        type === "start" ?
          `Starting on ${dateString}`
        : `Ending on ${dateString}`;
      return label;
    }

    const placeholder =
      type === "start" ? "Choose a start date" : "Choose an end date";
    return placeholder;
  };

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "bg-surface-primary! w-full! justify-start! text-left! text-sm!",
            !value && "text-muted-foreground!",
          )}
        >
          <CalendarIcon className="size-4 opacity-80" />
          {getButtonLabel()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto! p-0!">
        <Calendar
          mode="single"
          timeZone="UTC"
          selected={dateValue}
          onSelect={handleSelect}
          defaultMonth={dateValue}
          {...props}
        />
      </PopoverContent>
    </PopoverRoot>
  );
};
