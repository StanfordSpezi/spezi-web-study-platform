//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { Nil } from "@stanfordspezi/spezi-web-design-system";
import { useState } from "react";
import type { LogicClause, OperatorOption } from "./types";

interface UseClausesParams {
  value: Nil<LogicClause[]>;
  defaultValue?: LogicClause[];
  onChange?: (value: LogicClause[]) => void;
}

/**
 * Generates a unique ID for new clauses.
 */
let clauseIdCounter = 0;
const generateClauseId = () => `clause-${++clauseIdCounter}`;

/**
 * Ensures all clauses have stable IDs for React keys.
 */
const ensureClauseIds = (clauses: LogicClause[]): LogicClause[] => {
  return clauses.map((clause) =>
    clause.id ? clause : { ...clause, id: generateClauseId() },
  );
};

/**
 * Manages clause state for both controlled and uncontrolled usage patterns.
 */
export const useClauses = ({
  value,
  defaultValue = [{ attribute: undefined, operator: undefined, value: [] }],
  onChange,
}: UseClausesParams) => {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(() => ensureClauseIds(defaultValue));

  const clauses: LogicClause[] = ensureClauseIds(value ?? internal);

  const setClauses = (updater: (prev: LogicClause[]) => LogicClause[]) => {
    const next = updater(clauses);
    if (!isControlled) {
      setInternal(next);
    }
    onChange?.(next);
  };

  return { clauses, setClauses };
};

interface UseClauseActionsParams {
  setClauses: (updater: (prev: LogicClause[]) => LogicClause[]) => void;
  getOperatorsForAttribute: (attribute?: string) => OperatorOption[];
}

/**
 * Provides CRUD operations for clauses with automatic operator/value reset when attribute changes.
 */
export const useClauseActions = ({
  setClauses,
  getOperatorsForAttribute,
}: UseClauseActionsParams) => {
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
      {
        id: generateClauseId(),
        attribute: undefined,
        operator: undefined,
        value: [],
      },
    ]);
  };

  const removeClause = (index: number) => {
    setClauses((prev) => prev.filter((_, i) => i !== index));
  };

  return { updateClause, addClause, removeClause };
};
