//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { ReactNode } from "react";

interface FieldLabelProps {
  title: ReactNode;
  description: ReactNode;
}

export const FieldLabel = ({ title, description }: FieldLabelProps) => {
  return (
    <div className="space-y-1.5 pb-1">
      <div className="font-normal">{title}</div>
      <div className="text-text-tertiary leading-tight font-normal text-pretty">
        {description}
      </div>
    </div>
  );
};
