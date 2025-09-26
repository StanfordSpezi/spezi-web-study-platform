//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { Nil } from "@stanfordspezi/spezi-web-design-system";
import type {
  AttributeOption,
  OperatorOption,
  LogicClause,
} from "@/components/interfaces/LogicGroupInput/types";

interface FormatLogicClausesOptions {
  attributeOptions?: AttributeOption[];
  joiner?: string;
  maxListItems?: number | null; // clamp list length for multiselect; null for unlimited
  formatAsSentence?: boolean;
}

/**
 * Retrieves the human-readable label for a given attribute value from the provided options.
 * If no matching option is found, returns the attribute value itself.
 *
 * @example
 * const options = [{ value: 'country', label: 'Country' }];
 * getAttributeLabel('country', options); // Returns 'Country'
 * getAttributeLabel('unknown', options); // Returns 'unknown'
 */
const getAttributeLabel = (
  attributeValue: string,
  attributeOptions?: AttributeOption[],
) => {
  const attribute = attributeOptions?.find(
    (attribute) => attribute.value === attributeValue,
  );
  return attribute?.label ?? attributeValue;
};

/**
 * Retrieves the operator configuration for a given operator value from the attribute's operators.
 *
 * @example
 * const attrOptions = [
 *   {
 *     value: 'age',
 *     operators: [{ value: '>', input: { type: 'number' } }]
 *   }
 * ];
 * getOperatorConfig('age', '>', { attributeOptions: attrOptions }); // Returns the '>' operator config
 * getOperatorConfig('age', 'unknown', { attributeOptions: attrOptions }); // Returns undefined
 */
const getOperatorConfig = (
  attributeValue: string | undefined,
  operatorValue: string,
  options?: FormatLogicClausesOptions,
): OperatorOption | undefined => {
  const attribute = options?.attributeOptions?.find(
    (attribute) => attribute.value === attributeValue,
  );
  return attribute?.operators.find(
    (operator) => operator.value === operatorValue,
  );
};

/**
 * Formats a list of strings into a human-readable string, handling cases
 * for 0, 1, 2, or more items. Items are separated by commas, with 'or'
 * before the last item.
 *
 * @example
 * formatList([]); // Returns ''
 * formatList(['Apple']); // Returns 'Apple'
 * formatList(['Apple', 'Banana']); // Returns 'Apple or Banana'
 * formatList(['Apple', 'Banana', 'Cherry']); // Returns 'Apple, Banana or Cherry'
 */
const formatList = (items: string[]) => {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} or ${items[1]}`;
  const allButLast = items.slice(0, -1).join(", ");
  const last = items[items.length - 1];
  return `${allButLast} or ${last}`;
};

/**
 * Maps a value to its label using the operator's input options, if available.
 *
 * @example
 * const op = {
 *   input: { options: [{ value: 'us', label: 'United States' }] }
 * };
 *
 * mapValueToLabel('us', op); // Returns 'United States'
 * mapValueToLabel('unknown', op); // Returns undefined
 */
const mapValueToLabel = (value: string, operator?: OperatorOption) => {
  let options: Array<{ value: string; label: string }> | undefined;
  if (operator?.input && "options" in operator.input) {
    options = operator.input.options;
  }
  return options?.find((option) => option.value === value)?.label;
};

/**
 * Formats the values of a logic clause based on the operator's input type,
 * applying labels and clamping for multiselect.
 *
 * @example
 * const op = {
 *   input: {
 *     type: 'multiselect',
 *     options: [{ value: 'us', label: 'United States' }]
 *   }
 * };
 * formatValues(['us'], op); // Returns 'United States'
 * formatValues(['us', 'ca'], op, { maxListItems: 1 }); // Returns 'United States or 1 more'
 */
const formatValues = (
  values: string[],
  operator: OperatorOption | undefined,
  options?: FormatLogicClausesOptions,
) => {
  if (values.length === 0) return "";

  const inputType = operator?.input?.type ?? "text";
  const mapLabel = (value: string) => mapValueToLabel(value, operator) ?? value;

  if (inputType === "multiselect") {
    const labels = values.map(mapLabel);
    const max = options?.maxListItems;
    if (typeof max === "number" && labels.length > max) {
      const shown = labels.slice(0, max);
      const remaining = labels.length - max;
      return `${formatList(shown)} or ${remaining} more`;
    }
    return formatList(labels);
  }

  // text, number, select -> single value; if multiple found, join simply
  const first = mapLabel(values[0] ?? "");
  if (!first) return "";
  if (values.length > 1) {
    const labels = values.map(mapLabel);
    return formatList(labels);
  }
  return first;
};

/**
 * Converts a single LogicClause into a readable string sentence.
 *
 * @example
 * const clause = {
 *   attribute: 'country',
 *   operator: 'in',
 *   value: ['us']
 * };
 * formatClause(clause, { attributeOptions: [{ value: 'country', label: 'Country' }] }); // Returns 'Country is in us'
 */
const formatClause = (
  clause: LogicClause,
  options?: FormatLogicClausesOptions,
  lowercaseAttribute?: boolean,
) => {
  const { attribute, operator, value } = clause;
  if (!attribute || !operator) return undefined;

  let attrLabel = getAttributeLabel(attribute, options?.attributeOptions);
  if (lowercaseAttribute) {
    attrLabel = attrLabel.toLowerCase();
  }
  const opConfig = getOperatorConfig(attribute, operator, options);
  const inputType = opConfig?.input?.type ?? "text";
  const valuesText = formatValues(value, opConfig, options);
  if (!valuesText) return undefined;

  switch (operator) {
    case "in":
      return `${attrLabel} is in ${valuesText}`;
    case "not_in":
      return `${attrLabel} is not in ${valuesText}`;
    case "=":
      return `${attrLabel} equals ${valuesText}`;
    case "!=":
      return `${attrLabel} is not ${valuesText}`;
    case ">":
      return `${attrLabel} is greater than ${valuesText}`;
    case "<":
      return `${attrLabel} is less than ${valuesText}`;
    default:
      // Fallback: show raw operator value
      if (inputType === "multiselect") {
        return `${attrLabel} ${operator} ${valuesText}`;
      }
      return `${attrLabel} ${operator} ${valuesText}`;
  }
};

/**
 * Turns an array of LogicClause into a readable sentence by joining stringified clauses.
 *
 * @example
 * const clauses = [
 *   { attribute: 'country', operator: 'in', value: ['us', 'ca'] },
 *   { attribute: 'age', operator: '>', value: ['18'] }
 * ];
 * formatLogicClauses(clauses, { joiner: 'AND' }); // Returns 'country is in us or ca AND age is greater than 18'
 *
 * @example
 * const clauses = [
 *   { attribute: 'country', operator: 'in', value: ['us', 'ca'] },
 *   { attribute: 'age', operator: '>', value: ['18'] }
 * ];
 * const attributeOptions = [
 *   {
 *     value: 'country',
 *     label: 'Country',
 *     operators: [{
 *       value: 'in',
 *       label: 'is in',
 *       input: {
 *         type: 'multiselect',
 *         options: [
 *           { value: 'us', label: 'United States' },
 *           { value: 'ca', label: 'Canada' }
 *         ]
 *       }
 *     }]
 *   },
 *   {
 *     value: 'age',
 *     label: 'Age',
 *     operators: [{
 *       value: '>',
 *       label: 'is greater than',
 *       input: { type: 'number' }
 *     }]
 *   }
 * ];
 * formatLogicClauses(clauses, {
 *   attributeOptions
 * }); // Returns 'Country is in United States or Canada and Age is greater than 18'
 */
export const formatLogicClauses = (
  clauses: Nil<LogicClause[]>,
  options?: FormatLogicClausesOptions,
) => {
  if (!clauses || clauses.length === 0) return undefined;
  const joiner = options?.joiner ?? "and";

  const parts: string[] = [];
  clauses.forEach((clause, index) => {
    const lowercaseAttr = !!options?.formatAsSentence && index > 0;
    const part = formatClause(clause, options, lowercaseAttr);
    if (part) parts.push(part);
  });

  let output = parts.join(` ${joiner} `);
  if (options?.formatAsSentence) {
    // Ensure the sentence starts with a capital letter
    if (output.length > 0) {
      output = output.charAt(0).toUpperCase() + output.slice(1);
    }
    // Ensure a trailing period
    if (output.length > 0 && !/[.!?]$/.test(output)) {
      output += ".";
    }
  }
  return output;
};
