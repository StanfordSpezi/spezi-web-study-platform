//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  formatNilBoolean,
  formatNilDateRange,
} from "@stanfordspezi/spezi-web-design-system";
import { useParams } from "@tanstack/react-router";
import { KeyValueCard } from "@/components/interfaces/KeyValueCard";
import { formatLogicClauses } from "@/components/interfaces/LogicGroupInput/formatLogicClauses";
import { EditButtonLink } from "@/components/ui/EditButton";
import type { Study } from "@/server/database/entities/study/schema";
import { participationAttributeOptions } from "../lib/participationAttributeOptions";

interface EnrollmentCardProps {
  study?: Study;
  isLoading?: boolean;
}

export const EnrollmentCard = ({ study, isLoading }: EnrollmentCardProps) => {
  const params = useParams({
    from: "/(dashboard)/$team/$study/configuration/",
  });
  return (
    <KeyValueCard
      title="Enrollment"
      description="Control who can join your study and how they get access."
      actions={
        <EditButtonLink
          aria-label="Edit Enrollment"
          data-testid="edit-enrollment"
          from="/"
          to="/$team/$study/configuration/enrollment"
          params={params}
        />
      }
      isLoading={isLoading}
      items={[
        {
          key: "Enrollment period",
          tooltip: "The date range when new participants can join your study.",
          value: formatNilDateRange(
            study?.enrollmentPeriod,
            new Intl.DateTimeFormat("en", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
          ),
        },
        {
          key: "Study duration",
          tooltip:
            "The number of days each participant stays in the study from their individual start date.",
          value: study?.studyDuration,
        },
        {
          key: "Private study",
          tooltip:
            "When enabled, only people with an invitation link can join. No public enrollment.",
          value: formatNilBoolean(study?.isPrivateStudy),
        },
        {
          key: "Participation criteria",
          tooltip:
            "Filter who can join based on age, location, or other demographics. Only for public studies.",
          value: formatLogicClauses(study?.participationCriteria, {
            attributeOptions: participationAttributeOptions,
            formatAsSentence: true,
          }),
        },
      ]}
    />
  );
};
