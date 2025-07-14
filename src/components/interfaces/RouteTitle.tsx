//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ReactNode } from "react";
import { DashedSeparator } from "../ui/DashedSeparator";

interface RouteTitleProps {
  title: ReactNode;
  description: ReactNode;
  accessory?: ReactNode;
}

export const RouteTitle = ({
  title,
  description,
  accessory,
}: RouteTitleProps) => {
  return (
    <div>
      <div className="flex items-center justify-between p-6">
        <div>
          <h1 className="text-text font-medium">{title}</h1>
          <p className="text-text-tertiary text-sm">{description}</p>
        </div>
        {accessory && <div>{accessory}</div>}
      </div>
      <DashedSeparator />
    </div>
  );
};
