//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

/**
 * Truncates a string to a specified maximum length, appending an ellipsis ("…") if the string exceeds the length.
 * If the string is shorter than or equal to the maximum length, it returns the original string.
 */
export const truncate = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "…";
};
