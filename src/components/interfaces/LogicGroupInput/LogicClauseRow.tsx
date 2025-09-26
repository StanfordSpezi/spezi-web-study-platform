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
  Tooltip,
} from "@stanfordspezi/spezi-web-design-system";
import { Trash } from "lucide-react";
import { ClauseValueInput } from "./ClauseValueInput";
import { useLogicGroupContext } from "./LogicGroupContext";
import type { LogicClause } from "./types";

export interface LogicClauseRowProps {
  clause: LogicClause;
  canRemove: boolean;
  canAddNext: boolean;
  onChangeAttribute: (value: string) => void;
  onChangeOperator: (value: string) => void;
  onChangeValue: (values: string[]) => void;
  onRemove: () => void;
  onAddNext: () => void;
}

export const LogicClauseRow = ({
  clause,
  canRemove,
  canAddNext,
  onChangeAttribute,
  onChangeOperator,
  onChangeValue,
  onRemove,
  onAddNext,
}: LogicClauseRowProps) => {
  const { attributeOptions, getOperatorsForAttribute, getOperatorConfig } =
    useLogicGroupContext();

  const operatorsForAttribute = getOperatorsForAttribute(clause.attribute);
  const operatorConfig = getOperatorConfig(clause.attribute, clause.operator);

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex w-full flex-col gap-2.5">
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <Select
            value={clause.attribute ?? ""}
            onValueChange={onChangeAttribute}
          >
            <SelectTrigger className="w-full sm:flex-1">
              <SelectValue placeholder="Select attribute" />
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
              <SelectValue placeholder="Select operator" />
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
            placeholder="Select values"
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

      <Tooltip
        open={!canAddNext ? false : undefined}
        tooltip="Add new criteria"
        variant="inverted"
        side="right"
        delayDuration={500}
        className="text-sm"
        sideOffset={10}
      >
        <Button
          variant="outline"
          size="xs"
          className="font-mono text-sm tracking-wide"
          onClick={onAddNext}
          disabled={!canAddNext}
        >
          AND
        </Button>
      </Tooltip>
    </div>
  );
};
