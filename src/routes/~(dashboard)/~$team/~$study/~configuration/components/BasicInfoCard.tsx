//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useParams } from "@tanstack/react-router";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { KeyValueCard } from "@/components/interfaces/KeyValueCard";
import { EditButtonLink } from "@/components/ui/EditButton";
import type { Study } from "@/server/database/entities/study/schema";

interface BasicInfoCardProps {
  study?: Study;
  isLoading?: boolean;
}

export const BasicInfoCard = ({ study, isLoading }: BasicInfoCardProps) => {
  const params = useParams({
    from: "/(dashboard)/$team/$study/configuration/",
  });
  return (
    <KeyValueCard
      title="Basic Information"
      description="Set your study's title, description, and how it appears to participants."
      actions={
        <EditButtonLink
          aria-label="Edit Basic Information"
          data-testid="edit-basic-information"
          from="/"
          to="/$team/$study/configuration/basic-information"
          params={params}
        />
      }
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
          tooltip: "The icon representing your study.",
          value:
            study?.icon ?
              <DynamicIcon
                name={study.icon as IconName}
                className="size-4 opacity-80"
              />
            : null,
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
