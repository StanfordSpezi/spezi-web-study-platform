//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { ButtonProps, Nil } from "@stanfordspezi/spezi-web-design-system";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { LogicClauseRow } from "./LogicClauseRow";
import type { AttributeOption, LogicClause, OperatorOption } from "./types";

interface LogicGroupInputProps {
  className?: string;
  attributeOptions: AttributeOption[];
  operatorOptions?: OperatorOption[]; // fallback when attribute does not define its own
  value: Nil<LogicClause[]>; // controlled
  defaultValue?: LogicClause[]; // uncontrolled initial
  onChange?: (value: LogicClause[]) => void;
  valuePlaceholder?: string;
  attributePlaceholder?: string;
  operatorPlaceholder?: string;
  andButtonProps?: ButtonProps;
}

export const LogicGroupInput = ({
  className,
  attributeOptions,
  operatorOptions = [],
  value,
  defaultValue,
  onChange,
  valuePlaceholder = "Select values",
  attributePlaceholder = "Select attribute",
  operatorPlaceholder = "Select operator",
  andButtonProps,
}: LogicGroupInputProps) => {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<LogicClause[]>(
    defaultValue ?? [{ attribute: undefined, operator: undefined, value: [] }],
  );

  const clauses: LogicClause[] = value ?? internal;

  // Maintain stable keys for each clause row to avoid React reusing DOM nodes
  const keyCounterRef = useRef(0);
  const makeKey = () => `clause-${keyCounterRef.current++}`;
  const initialLength = (value?.length ?? defaultValue?.length ?? 1) || 1;
  const [rowKeys, setRowKeys] = useState(() =>
    Array.from({ length: initialLength }, () => makeKey()),
  );

  // Keep rowKeys length in sync with the number of clauses (controlled/uncontrolled)
  useEffect(() => {
    setRowKeys((prev) => {
      if (prev.length === clauses.length) return prev;
      if (prev.length < clauses.length) {
        // append missing keys
        const toAdd = clauses.length - prev.length;
        return [...prev, ...Array.from({ length: toAdd }, () => makeKey())];
      }
      // trim extra keys
      return prev.slice(0, clauses.length);
    });
  }, [clauses.length]);

  const setClauses = (updater: (prev: LogicClause[]) => LogicClause[]) => {
    const next = updater(clauses);
    if (!isControlled) {
      setInternal(next);
    }
    onChange?.(next);
  };

  const getOperatorsForAttribute = (attribute?: string) => {
    const attr = attributeOptions.find((attr) => attr.value === attribute);
    if (attr?.operators?.length) {
      return attr.operators;
    }
    return operatorOptions;
  };

  const updateClause = (index: number, patch: Partial<LogicClause>) => {
    setClauses((prev) => {
      const next = [...prev];
      const current = next[index] ?? {
        attribute: undefined,
        operator: undefined,
        value: [],
      };
      let updated: LogicClause = { ...current, ...patch };

      // If attribute changes, reset operator and value when no longer valid
      if (patch.attribute !== undefined) {
        const operators = getOperatorsForAttribute(patch.attribute);
        if (
          !operators.find((operator) => operator.value === updated.operator)
        ) {
          updated = { ...updated, operator: undefined, value: [] };
        }
      }

      next[index] = updated;
      return next;
    });
  };

  const addClause = () => {
    setClauses((prev) => [
      ...prev,
      { attribute: undefined, operator: undefined, value: [] },
    ]);
    setRowKeys((prev) => [...prev, makeKey()]);
  };

  const removeClause = (index: number) => {
    setClauses((prev) => prev.filter((_, i) => i !== index));
    setRowKeys((prev) => prev.filter((_, i) => i !== index));
  };

  const getOperatorConfig = (clause: LogicClause) => {
    const operators = getOperatorsForAttribute(clause.attribute);
    return operators.find((operator) => operator.value === clause.operator);
  };

  const isClauseComplete = (clause: LogicClause) => {
    if (!clause.attribute || !clause.operator) return false;
    const operator = getOperatorConfig(clause);
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
      {clauses.map((clause, clauseIndex) => {
        const operatorsForAttribute = getOperatorsForAttribute(
          clause.attribute,
        );
        const operatorConfig = operatorsForAttribute.find(
          (operator) => operator.value === clause.operator,
        );

        return (
          <LogicClauseRow
            key={rowKeys[clauseIndex]}
            clause={clause}
            attributeOptions={attributeOptions}
            operatorsForAttribute={operatorsForAttribute}
            operatorConfig={operatorConfig}
            attributePlaceholder={attributePlaceholder}
            operatorPlaceholder={operatorPlaceholder}
            valuePlaceholder={valuePlaceholder}
            canRemove={clauses.length > 1}
            canAddNext={!isAddButtonDisabled(clauseIndex)}
            onChangeAttribute={(attribute) =>
              updateClause(clauseIndex, { attribute })
            }
            onChangeOperator={(operator) =>
              updateClause(clauseIndex, { operator })
            }
            onChangeValue={(value) => updateClause(clauseIndex, { value })}
            onRemove={() => removeClause(clauseIndex)}
            onAddNext={addClause}
            andButtonProps={andButtonProps}
          />
        );
      })}
    </div>
  );
};
