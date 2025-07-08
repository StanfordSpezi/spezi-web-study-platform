//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { isEmpty } from "@stanfordspezi/spezi-web-design-system";

interface DateRange {
  start?: string;
  end?: string;
}

/**
 * Formats a date range into a human-readable string.
 */
export const formatDateRange = (dateRange?: DateRange) => {
  const formatter = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (dateRange?.start && !dateRange.end) {
    const formattedDate = formatter.format(new Date(dateRange.start));
    return `from ${formattedDate}`;
  }

  if (dateRange?.end && !dateRange.start) {
    const formattedDate = formatter.format(new Date(dateRange.end));
    return `until ${formattedDate}`;
  }

  if (dateRange?.start && dateRange.end) {
    return formatter.formatRange(
      new Date(dateRange.start),
      new Date(dateRange.end),
    );
  }

  return undefined;
};

/**
 * Formats a boolean value into a string representation.
 * Returns "true" or "false" if the value is defined, otherwise returns undefined.
 */
export const formatBoolean = (value?: boolean) => {
  if (isEmpty(value)) {
    return undefined;
  }
  return value ? "true" : "false";
};
