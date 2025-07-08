//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { KeyValueCard } from "@/components/ui/KeyValueCard";
import type { Study } from "@/lib/mockDatabase/study";
import { EditButton } from "./EditButton";

interface BasicInformationCardProps {
  study?: Study;
  isLoading?: boolean;
}

export const BasicInformationCard = ({
  study,
  isLoading,
}: BasicInformationCardProps) => {
  return (
    <KeyValueCard
      title="Basic Information"
      description="Set your study's title, description, and how it appears to participants."
      actions={<EditButton />}
      isLoading={isLoading}
      items={[
        {
          key: "Title",
          tooltip:
            "The title of your study, which will be displayed to participants.",
          value: study?.title,
        },
        {
          key: "Short Title",
          tooltip: "Used in tight spaces where the full title won't fit.",
          value: study?.shortTitle,
        },
        {
          key: "Icon",
          tooltip: "The icon representing your study?.",
          value: study?.icon,
        },
        {
          key: "Explanation",
          tooltip: "This helps participants decide if they want to join.",
          value: study?.explanation,
        },
        {
          key: "Short Explanation",
          tooltip: "A short summary for preview cards and search results.",
          value: study?.shortExplanation,
        },
      ]}
    />
  );
};
