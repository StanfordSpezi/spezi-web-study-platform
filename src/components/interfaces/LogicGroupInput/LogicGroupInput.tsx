//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { Nil } from "@stanfordspezi/spezi-web-design-system";
import { cn } from "@/utils/cn";
import { useClauses, useClauseActions } from "./hooks";
import { LogicClauseRow } from "./LogicClauseRow";
import { LogicGroupProvider, useLogicGroupContext } from "./LogicGroupContext";
import type { AttributeOption, LogicClause } from "./types";

interface LogicGroupInputProps {
  className?: string;
  attributeOptions: AttributeOption[];
  value?: Nil<LogicClause[]>; // controlled
  defaultValue?: LogicClause[]; // uncontrolled initial
  onChange?: (value: LogicClause[]) => void;
}

/**
 * Internal content component that handles the logic group state and rendering.
 */
const LogicGroupInputContent = ({
  className,
  value,
  defaultValue,
  onChange,
}: Pick<
  LogicGroupInputProps,
  "className" | "value" | "defaultValue" | "onChange"
>) => {
  const { getOperatorsForAttribute, getOperatorConfig } =
    useLogicGroupContext();

  const { clauses, setClauses } = useClauses({
    value,
    defaultValue,
    onChange,
  });

  const { updateClause, addClause, removeClause } = useClauseActions({
    setClauses,
    getOperatorsForAttribute,
  });

  const isClauseComplete = (clause: LogicClause) => {
    if (!clause.attribute || !clause.operator) return false;
    const operator = getOperatorConfig(clause.attribute, clause.operator);
    const inputType = operator?.input?.type ?? "text";
    if (inputType === "multiselect") return clause.value.length > 0;
    // text, number, select -> single entry required and non-empty
    return clause.value.length === 1 && clause.value[0]?.length > 0;
  };

  const isAddButtonDisabled = (index: number) => {
    const isLast = index === clauses.length - 1;
    if (!isLast) return true; // disable all but last

    const last = clauses.at(index);
    if (!last) return false;

    return !isClauseComplete(last);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {clauses.map((clause, index) => (
        <LogicClauseRow
          key={clause.id}
          clause={clause}
          canRemove={clauses.length > 1}
          canAddNext={!isAddButtonDisabled(index)}
          onChangeAttribute={(attribute) => updateClause(index, { attribute })}
          onChangeOperator={(operator) => updateClause(index, { operator })}
          onChangeValue={(value) => updateClause(index, { value })}
          onRemove={() => removeClause(index)}
          onAddNext={addClause}
        />
      ))}
    </div>
  );
};

/**
 * A configurable input component for building logical filter expressions with AND relationships.
 * Each attribute must define its own set of available operators.
 */
export const LogicGroupInput = ({
  className,
  attributeOptions,
  value,
  defaultValue,
  onChange,
}: LogicGroupInputProps) => {
  return (
    <LogicGroupProvider attributeOptions={attributeOptions}>
      <LogicGroupInputContent
        className={className}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </LogicGroupProvider>
  );
};
