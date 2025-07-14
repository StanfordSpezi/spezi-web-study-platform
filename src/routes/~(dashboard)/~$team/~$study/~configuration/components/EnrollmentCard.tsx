//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { notImplementedAlert } from "@stanfordspezi/spezi-web-design-system";
import { KeyValueCard } from "@/components/ui/KeyValueCard";
import type { Study } from "@/lib/mockDatabase/study";
import { formatBoolean, formatDateRange } from "@/utils/formatValue";
import { EditButton } from "./EditButton";

interface EnrollmentCardProps {
  study?: Study;
  isLoading?: boolean;
}

export const EnrollmentCard = ({ study, isLoading }: EnrollmentCardProps) => {
  return (
    <KeyValueCard
      title="Enrollment"
      description="Control who can join your study and how they get access."
      actions={
        <EditButton onClick={() => (notImplementedAlert as () => void)()} />
      }
      isLoading={isLoading}
      items={[
        {
          key: "Enrollment period",
          tooltip: "The date range when new participants can join your study.",
          value: formatDateRange(study?.enrollmentPeriod),
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
          value: formatBoolean(study?.isPrivateStudy),
        },
      ]}
    />
  );
};
