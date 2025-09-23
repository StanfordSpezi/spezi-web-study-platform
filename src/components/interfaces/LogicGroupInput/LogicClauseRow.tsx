//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@stanfordspezi/spezi-web-design-system";
import { Trash } from "lucide-react";
import type { ComponentProps } from "react";
import { ClauseValueInput } from "./ClauseValueInput";
import type { AttributeOption, LogicClause, OperatorOption } from "./types";

export interface LogicClauseRowProps {
  clause: LogicClause;
  attributeOptions: AttributeOption[];
  operatorsForAttribute: OperatorOption[];
  operatorConfig?: OperatorOption;
  attributePlaceholder: string;
  operatorPlaceholder: string;
  valuePlaceholder: string;
  canRemove: boolean;
  canAddNext: boolean;
  onChangeAttribute: (value: string) => void;
  onChangeOperator: (value: string) => void;
  onChangeValue: (values: string[]) => void;
  onRemove: () => void;
  onAddNext: () => void;
  andButtonProps?: ComponentProps<typeof Button>;
}

export const LogicClauseRow = ({
  clause,
  attributeOptions,
  operatorsForAttribute,
  operatorConfig,
  attributePlaceholder,
  operatorPlaceholder,
  valuePlaceholder,
  canRemove,
  canAddNext,
  onChangeAttribute,
  onChangeOperator,
  onChangeValue,
  onRemove,
  onAddNext,
  andButtonProps,
}: LogicClauseRowProps) => {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex w-full flex-col gap-2.5">
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <Select
            value={clause.attribute ?? ""}
            onValueChange={onChangeAttribute}
          >
            <SelectTrigger className="w-full sm:flex-1">
              <SelectValue placeholder={attributePlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {attributeOptions.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  itemText={opt.label}
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={clause.operator ?? ""}
            onValueChange={onChangeOperator}
            disabled={!clause.attribute}
          >
            <SelectTrigger className="w-full sm:flex-1">
              <SelectValue placeholder={operatorPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {operatorsForAttribute.map((op) => (
                <SelectItem key={op.value} value={op.value} itemText={op.label}>
                  {op.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2.5">
          <ClauseValueInput
            clause={clause}
            operatorConfig={operatorConfig}
            placeholder={valuePlaceholder}
            disabled={!clause.operator}
            onChangeValue={onChangeValue}
          />

          <Button
            variant="outline"
            size={null}
            className="size-10 rounded-md"
            onClick={onRemove}
            disabled={!canRemove}
          >
            <Trash className="size-4 opacity-80" />
          </Button>
        </div>
      </div>

      <Button
        variant="outline"
        size="xs"
        className="font-mono text-sm tracking-wide"
        onClick={onAddNext}
        disabled={!canAddNext}
        {...andButtonProps}
      >
        AND
      </Button>
    </div>
  );
};
