//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { RouteHeader } from "@/components/ui/RouteHeader";
import { studyRetrieveQueryOptions } from "@/lib/queries/study";
import { BasicInfoCard } from "./components/BasicInfoCard";
import { EnrollmentCard } from "./components/EnrollmentCard";
import { StatusBadge } from "./components/StatusBadge";

const StudyConfigurationRoute = () => {
  const params = Route.useParams();
  const { data: study, isLoading } = useQuery(
    studyRetrieveQueryOptions({ studyId: params.study }),
  );
  return (
    <div>
      <RouteHeader
        title="Study Configuration"
        description="Configure your study and everything related to it."
        accessoryRight={<StatusBadge isPublished={study?.isPublished} />}
      />
      <div className="flex max-w-7xl flex-col gap-14 p-6">
        <BasicInfoCard study={study} isLoading={isLoading} />
        <EnrollmentCard study={study} isLoading={isLoading} />
      </div>
    </div>
  );
};

export const Route = createFileRoute(
  "/(dashboard)/$team/$study/configuration/",
)({
  component: StudyConfigurationRoute,
});
