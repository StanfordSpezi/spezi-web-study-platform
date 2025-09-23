//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { Nil } from "@stanfordspezi/spezi-web-design-system";

interface ErrorOption {
  message?: string;
}

type LogicClausesError =
  | ErrorOption
  | Array<
      Nil<
        ErrorOption & {
          attribute?: ErrorOption;
          operator?: ErrorOption;
          value?: ErrorOption | ErrorOption[];
        }
      >
    >;

/**
 * Formats error messages from logic clauses into a readable string.
 * If the error is not an array, returns the error message directly.
 * If it's an array, constructs a formatted string with clause indices and details.
 *
 * @example
 * const error = [
 *   { message: "Invalid clause" },
 *   { attribute: { message: "Attribute is required" }, operator: { message: "Operator is invalid" } }
 * ];
 * console.log(formatLogicClausesError(error));
 * // Output:
 * // Clause 1: Invalid clause
 * // Clause 2: Attribute: Attribute is required, Operator: Operator is invalid
 */
export const formatLogicClausesError = (error?: LogicClausesError) => {
  if (!error) {
    return undefined;
  }
  if (!Array.isArray(error)) {
    return error.message;
  }

  let output = "";

  error.forEach((clauseError, index) => {
    if (!clauseError) {
      return;
    }
    if (index > 0) {
      output += "\n";
    }
    output += `Clause ${index + 1}: `;
    if (clauseError.message) {
      output += clauseError.message;
    } else {
      const parts = [];
      if (clauseError.attribute?.message) {
        parts.push(`Attribute: ${clauseError.attribute.message}`);
      }
      if (clauseError.operator?.message) {
        parts.push(`Operator: ${clauseError.operator.message}`);
      }
      if (clauseError.value) {
        if (Array.isArray(clauseError.value)) {
          // We are just taking the first for now
          const message = clauseError.value[0]?.message;
          if (message) {
            parts.push(`Value: ${message}`);
          }
        } else if (clauseError.value.message) {
          parts.push(`Value: ${clauseError.value.message}`);
        }
      }
      if (parts.length > 0) {
        output += parts.join(", ");
      }
    }
  });
  return output;
};
