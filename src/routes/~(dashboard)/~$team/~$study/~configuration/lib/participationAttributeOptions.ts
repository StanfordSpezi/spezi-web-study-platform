//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { AttributeOption } from "@/components/interfaces/LogicGroupInput/types";

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "de", label: "Germany" },
  { value: "gb", label: "United Kingdom" },
  { value: "fr", label: "France" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
  { value: "au", label: "Australia" },
  { value: "jp", label: "Japan" },
  { value: "cn", label: "China" },
];

const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "de", label: "German" },
  { value: "fr", label: "French" },
  { value: "it", label: "Italian" },
  { value: "zh", label: "Chinese" },
  { value: "ja", label: "Japanese" },
  { value: "ru", label: "Russian" },
  { value: "ar", label: "Arabic" },
  { value: "pt", label: "Portuguese" },
];

export const participationAttributeOptions: AttributeOption[] = [
  {
    value: "age",
    label: "Age",
    operators: [
      { value: "=", label: "Equals", input: { type: "number" } },
      { value: ">", label: "Greater than", input: { type: "number" } },
      { value: "<", label: "Less than", input: { type: "number" } },
    ],
  },
  {
    value: "country",
    label: "Country",
    operators: [
      {
        value: "in",
        label: "In list",
        input: {
          type: "multiselect",
          options: countryOptions,
        },
      },
      {
        value: "not_in",
        label: "Not in list",
        input: {
          type: "multiselect",
          options: countryOptions,
        },
      },
    ],
  },
  {
    value: "language",
    label: "Language",
    operators: [
      {
        value: "=",
        label: "Equals",
        input: {
          type: "select",
          options: languageOptions,
        },
      },
      {
        value: "!=",
        label: "Does not equal",
        input: {
          type: "select",
          options: languageOptions,
        },
      },
    ],
  },
];
