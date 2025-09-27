//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { z } from "zod";
import type { scheduleSchema } from "@/server/database/entities/component/schema";

/**
 * Helper function to get ordinal suffix for numbers
 */
const getOrdinalSuffix = (num: number): string => {
  const lastDigit = num % 10;
  const lastTwoDigits = num % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return "th";
  }

  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

/**
 * Converts a schedule object into a human-readable string
 *
 * @example
 * formatSchedule({
 *   startOffset: 10,
 *   repeatType: "daily",
 *   repeatInterval: 5,
 *   displayHour: 9,
 *   displayMinute: 10
 * })
 * // Returns: "Activates every 5th day at 9:10 AM. Starts 10 days after start."
 */
export const formatSchedule = ({
  startOffset,
  repeatType,
  repeatInterval,
  displayHour,
  displayMinute,
}: NonNullable<z.infer<typeof scheduleSchema>>) => {
  const timeDate = new Date();
  timeDate.setHours(displayHour, displayMinute);
  const timeString = timeDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  let frequencyString: string;
  if (repeatType === "daily") {
    if (repeatInterval === 1) {
      frequencyString = "Daily";
    } else {
      const ordinal = getOrdinalSuffix(repeatInterval);
      frequencyString = `Every ${repeatInterval}${ordinal} day`;
    }
  } else {
    // weekly
    if (repeatInterval === 1) {
      frequencyString = "Weekly";
    } else {
      const ordinal = getOrdinalSuffix(repeatInterval);
      frequencyString = `Every ${repeatInterval}${ordinal} week`;
    }
  }

  const startString =
    startOffset === 0 ? "Starts immediately" : (
      `Starts after ${startOffset} ${startOffset === 1 ? "day" : "days"}`
    );

  return `${frequencyString} at ${timeString}. ${startString}.`;
};
