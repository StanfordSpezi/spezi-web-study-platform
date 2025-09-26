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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@stanfordspezi/spezi-web-design-system";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/MultiSelect";
import type { LogicClause, OperatorOption } from "./types";

export interface ClauseValueInputProps {
  clause: LogicClause;
  operatorConfig?: OperatorOption;
  placeholder: string;
  disabled: boolean;
  onChangeValue: (nextValues: string[]) => void;
}

export const ClauseValueInput = ({
  clause,
  operatorConfig,
  placeholder,
  disabled,
  onChangeValue,
}: ClauseValueInputProps) => {
  if (operatorConfig?.input?.type === "multiselect") {
    return (
      <MultiSelect values={clause.value} onValuesChange={onChangeValue}>
        <MultiSelectTrigger className="w-full sm:flex-1">
          <MultiSelectValue
            placeholder={placeholder}
            className="[&_[data-selected-item=true]]:bg-fill-secondary"
          />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectGroup>
            {operatorConfig.input.options.map((opt) => (
              <MultiSelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </MultiSelectItem>
            ))}
          </MultiSelectGroup>
        </MultiSelectContent>
      </MultiSelect>
    );
  }

  if (operatorConfig?.input?.type === "select") {
    return (
      <Select
        value={clause.value[0] ?? ""}
        onValueChange={(val) => onChangeValue([val])}
        disabled={disabled}
      >
        <SelectTrigger className="w-full sm:flex-1">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {operatorConfig.input.options.map(({ label, value }) => (
            <SelectItem key={value} value={value} itemText={label}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  // default: text or number (single value)
  return (
    <Input
      type={operatorConfig?.input?.type === "number" ? "number" : "text"}
      value={clause.value[0] ?? ""}
      placeholder={placeholder}
      onChange={(event) => onChangeValue([event.target.value])}
      disabled={disabled}
      className="flex-1"
    />
  );
};
