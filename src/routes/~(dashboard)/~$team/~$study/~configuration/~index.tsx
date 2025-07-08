//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { RouteTitle } from "@/components/interfaces/RouteTitle";
import { studyRetrieveQueryOptions } from "@/lib/queries/study";
import { BasicInformationCard } from "./components/BasicInformationCard";
import { EnrollmentCard } from "./components/EnrollmentCard";
import { StatusBadge } from "./components/StatusBadge";

const StudyConfigurationRoute = () => {
  const { study: studyId } = Route.useParams();
  const { data: study, isLoading } = useQuery(
    studyRetrieveQueryOptions({ studyId }),
  );
  return (
    <div className="size-full">
      <RouteTitle
        title="Study Configuration"
        description="Configure your study and everything related to it."
        accessory={<StatusBadge isPublished={study?.isPublished} />}
      />
      <div className="flex size-full flex-col gap-14 p-6">
        <BasicInformationCard study={study} isLoading={isLoading} />
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
