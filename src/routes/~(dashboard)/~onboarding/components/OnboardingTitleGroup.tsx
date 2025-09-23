//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ReactNode } from "react";
import { BrandIconGroup } from "@/components/interfaces/BrandIconGroup";

interface OnboardingTitleGroupProps {
  title: ReactNode;
  description: ReactNode;
}

export const OnboardingTitleGroup = ({
  title,
  description,
}: OnboardingTitleGroupProps) => {
  return (
    <div className="flex-center flex-col gap-10">
      <BrandIconGroup />
      <div className="flex-center flex-col gap-6">
        <h1 className="text-text text-center text-xl/snug font-medium text-balance">
          {title}
        </h1>
        <p className="text-text-secondary max-w-96 text-center text-balance">
          {description}
        </p>
      </div>
    </div>
  );
};
