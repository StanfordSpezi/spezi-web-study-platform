//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

interface TextInputOption {
  type: "text";
}

interface NumberInputOption {
  type: "number";
}

interface SelectInputOption {
  type: "select";
  options: Array<{ value: string; label: string }>;
}

interface MultiSelectInputOption {
  type: "multiselect";
  options: Array<{ value: string; label: string }>;
}

export type InputOption =
  | TextInputOption
  | NumberInputOption
  | SelectInputOption
  | MultiSelectInputOption;

export interface OperatorOption {
  value: string;
  label: string;
  input?: InputOption;
}

export interface AttributeOption {
  value: string;
  label: string;
  operators?: OperatorOption[]; // optional per-attribute operator override
}

export interface LogicClause {
  attribute?: string;
  operator?: string;
  value: string[];
}
