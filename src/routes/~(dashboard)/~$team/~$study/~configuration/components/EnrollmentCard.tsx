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
  notImplementedAlert,
} from "@stanfordspezi/spezi-web-design-system";
import { KeyValueCard } from "@/components/interfaces/KeyValueCard";
import { EditButton } from "@/components/ui/EditButton";
import type { Study } from "@/server/database/entities/study/schema";

interface EnrollmentCardProps {
  study?: Study;
  isLoading?: boolean;
}

export const EnrollmentCard = ({ study, isLoading }: EnrollmentCardProps) => {
  return (
    <KeyValueCard
      title="Enrollment"
      description="Control who can join your study and how they get access."
      actions={<EditButton onClick={notImplementedAlert} />}
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
      ]}
    />
  );
};
