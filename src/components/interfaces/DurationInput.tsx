//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type Nil,
} from "@stanfordspezi/spezi-web-design-system";
import { useState, type ComponentProps, type ChangeEvent } from "react";

interface DurationInputProps
  extends Omit<ComponentProps<typeof Input>, "onChange"> {
  onChange?: (days: number | null) => void;
}

const timeMultipliers = {
  days: 1,
  weeks: 7,
} as const;

type TimeUnit = keyof typeof timeMultipliers;

/**
 * Determines the most appropriate time unit for a given number of days.
 * Prefers larger units if the days value is a clean multiple.
 */
const getOptimalTimeUnit = (days: number): TimeUnit => {
  if (days % timeMultipliers.weeks === 0) {
    return "weeks";
  }
  return "days";
};

/**
 * Converts days to the display value for the specified time unit.
 */
const convertDaysToDisplayValue = (days: number, unit: TimeUnit) => {
  return days / timeMultipliers[unit];
};

/**
 * Converts display value to days based on the time unit.
 */
const convertDisplayValueToDays = (displayValue: number, unit: TimeUnit) => {
  return displayValue * timeMultipliers[unit];
};

/**
 * Formats a duration in days to a human-readable string with the optimal time unit.
 */
export const formatDuration = (days: Nil<number>): string => {
  if (!days) return "0 days";

  const unit = getOptimalTimeUnit(days);
  const value = convertDaysToDisplayValue(days, unit);

  const formattedUnit = value === 1 ? unit.slice(0, -1) : unit; // singular if value is 1
  return `${value} ${formattedUnit}`;
};

/**
 * Initializes the component state based on the provided value.
 */
const getInitialState = (value?: ComponentProps<typeof Input>["value"]) => {
  const numericValue = value ? parseFloat(value.toString()) : NaN;
  const isValidValue = !isNaN(numericValue) && numericValue >= 0;

  if (!isValidValue) {
    return {
      timeUnit: "days" as TimeUnit,
      inputValue: value?.toString() ?? "",
    };
  }

  const timeUnit = getOptimalTimeUnit(numericValue);
  const displayValue = convertDaysToDisplayValue(numericValue, timeUnit);

  return {
    timeUnit,
    inputValue: displayValue.toString(),
  };
};

export const DurationInput = ({
  onChange,
  value,
  ...props
}: DurationInputProps) => {
  const initialState = getInitialState(value);

  const [timeUnit, setTimeUnit] = useState(initialState.timeUnit);
  const [inputValue, setInputValue] = useState(initialState.inputValue);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newInputValue = event.target.value;
    setInputValue(newInputValue);

    if (newInputValue === "") {
      onChange?.(null);
      return;
    }

    const numericValue = parseFloat(newInputValue);
    if (!isNaN(numericValue)) {
      const daysValue = convertDisplayValueToDays(numericValue, timeUnit);
      onChange?.(daysValue);
    }
  };

  const handleTimeUnitChange = (newTimeUnit: TimeUnit) => {
    setTimeUnit(newTimeUnit);

    if (inputValue === "") {
      onChange?.(null);
      return;
    }

    const numericValue = parseFloat(inputValue);
    if (!isNaN(numericValue)) {
      const daysValue = convertDisplayValueToDays(numericValue, newTimeUnit);
      onChange?.(daysValue);
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        {...props}
      />
      <Select value={timeUnit} onValueChange={handleTimeUnitChange}>
        <SelectTrigger className="!w-40">
          <SelectValue placeholder="days" className="w-40" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="days">days</SelectItem>
            <SelectItem value="weeks">weeks</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
