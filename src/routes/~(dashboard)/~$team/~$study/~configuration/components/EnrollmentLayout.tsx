//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ReactNode } from "react";
import { RouteHeader, RouteHeaderBackLink } from "@/components/ui/RouteHeader";

interface EnrollmentLayoutProps {
  children: ReactNode;
  saveButton: ReactNode;
}

export const EnrollmentLayout = ({
  children,
  saveButton,
}: EnrollmentLayoutProps) => {
  return (
    <div>
      <RouteHeader
        title="Enrollment"
        description="Control who can join your study and how they get access."
        accessoryLeft={<RouteHeaderBackLink />}
        accessoryRight={saveButton}
      />
      {children}
    </div>
  );
};
