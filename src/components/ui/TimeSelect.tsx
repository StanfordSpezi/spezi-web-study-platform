//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@stanfordspezi/spezi-web-design-system";
import { type ComponentProps } from "react";
import { cn } from "@/utils/cn";

const minuteValues = [0, 30] as const;

type TimeSelectMinute = (typeof minuteValues)[number];

interface TimeSelectValue {
  hours: number;
  minutes: TimeSelectMinute;
}

interface TimeSelectProps
  extends Omit<ComponentProps<typeof Select>, "value" | "onChange"> {
  id?: string;
  value?: TimeSelectValue | null;
  onChange: (value: TimeSelectValue) => void;
  placeholder?: string;
  className?: string;
}

const formatOptionValue = (hours: number, minutes: TimeSelectMinute) => {
  const hoursString = hours.toString().padStart(2, "0");
  const minutesString = minutes.toString().padStart(2, "0");
  return `${hoursString}:${minutesString}`;
};

const formatOptionLabel = (hours: number, minutes: TimeSelectMinute) => {
  const period = hours < 12 ? "AM" : "PM";
  const twelveHour = hours % 12 === 0 ? 12 : hours % 12;
  const minuteLabel = minutes === 0 ? "00" : "30";

  return `${twelveHour}:${minuteLabel} ${period}`;
};

const timeOptions: Array<{
  value: string;
  label: string;
  hours: number;
  minutes: TimeSelectMinute;
}> = [];

for (let hour = 0; hour < 24; hour += 1) {
  for (const minutes of minuteValues) {
    timeOptions.push({
      value: formatOptionValue(hour, minutes),
      label: formatOptionLabel(hour, minutes),
      hours: hour,
      minutes,
    });
  }
}

export const TimeSelect = ({
  id,
  value,
  onChange,
  placeholder = "Select time",
  className,
  ...props
}: TimeSelectProps) => {
  const handleValueChange = (nextValue: string) => {
    const [hoursPart, minutesPart] = nextValue.split(":");
    const hours = Number.parseInt(hoursPart, 10);
    const minutes = Number.parseInt(minutesPart, 10) as TimeSelectMinute;

    if (
      Number.isNaN(hours) ||
      Number.isNaN(minutes) ||
      hours < 0 ||
      hours > 23 ||
      !minuteValues.includes(minutes)
    ) {
      return;
    }

    onChange({ hours, minutes });
  };

  const getSelectedValue = () => {
    if (!value) {
      return undefined;
    }

    if (
      value.hours < 0 ||
      value.hours > 23 ||
      !minuteValues.includes(value.minutes)
    ) {
      return undefined;
    }

    return formatOptionValue(value.hours, value.minutes);
  };

  return (
    <Select
      value={getSelectedValue()}
      onValueChange={handleValueChange}
      {...props}
    >
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent id={id}>
        {timeOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            itemText={option.label}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
