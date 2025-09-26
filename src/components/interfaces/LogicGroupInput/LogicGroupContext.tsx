//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createContext, useContext, type ReactNode } from "react";
import type { AttributeOption, OperatorOption } from "./types";

interface LogicGroupContextValue {
  attributeOptions: AttributeOption[];
  getOperatorsForAttribute: (attribute?: string) => OperatorOption[];
  getOperatorConfig: (
    attribute?: string,
    operator?: string,
  ) => OperatorOption | undefined;
}

const useLogicGroupContextValue = (
  attributeOptions: AttributeOption[],
): LogicGroupContextValue => {
  const getOperatorsForAttribute = (attribute?: string) => {
    const attr = attributeOptions.find((option) => option.value === attribute);
    return attr?.operators ?? [];
  };

  const getOperatorConfig = (attribute?: string, operator?: string) => {
    const operators = getOperatorsForAttribute(attribute);
    return operators.find((op) => op.value === operator);
  };

  return {
    attributeOptions,
    getOperatorsForAttribute,
    getOperatorConfig,
  };
};

const LogicGroupContext = createContext<ReturnType<
  typeof useLogicGroupContextValue
> | null>(null);

export const useLogicGroupContext = () => {
  const context = useContext(LogicGroupContext);
  if (!context) {
    throw new Error(
      "useLogicGroupContext must be used within a LogicGroupProvider",
    );
  }
  return context;
};

interface LogicGroupProviderProps {
  children: ReactNode;
  attributeOptions: AttributeOption[];
}

/**
 * Provides shared configuration and helper functions for logic group components.
 */
export const LogicGroupProvider = ({
  children,
  attributeOptions,
}: LogicGroupProviderProps) => {
  const value = useLogicGroupContextValue(attributeOptions);

  return (
    <LogicGroupContext.Provider value={value}>
      {children}
    </LogicGroupContext.Provider>
  );
};
