//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { cn } from "@stanfordspezi/spezi-web-design-system";
import { type ReactNode } from "react";

interface RouteTitleProps {
  title: string;
  description?: string;
  accessory?: ReactNode | ReactNode[];
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
      <div
        className={cn(
          "h-px w-full",
          "[--dash-color:var(--color-border)] [--dash-size:--spacing(2)]",
        )}
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--dash-color), var(--dash-color) 75%, transparent 75%, transparent 100%)",
          backgroundSize: "var(--dash-size) 1px",
        }}
      ></div>
    </div>
  );
};
