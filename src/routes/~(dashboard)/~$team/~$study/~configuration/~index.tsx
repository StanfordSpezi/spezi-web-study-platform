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
import { componentListQueryOptions } from "@/lib/queries/component";
import { studyRetrieveQueryOptions } from "@/lib/queries/study";
import { BasicInfoCard } from "./components/BasicInfoCard";
import { ComponentsCard } from "./components/ComponentsCard/ComponentsCard";
import { EnrollmentCard } from "./components/EnrollmentCard";
import { StatusBadge } from "./components/StatusBadge";

const StudyConfigurationRoute = () => {
  const params = Route.useParams();
  const { data: study, ...studyQuery } = useQuery(
    studyRetrieveQueryOptions({ studyId: params.study }),
  );
  const { data: components, ...componentQuery } = useQuery(
    componentListQueryOptions({ studyId: params.study }),
  );
  return (
    <div>
      <RouteHeader
        title="Study Configuration"
        description="Configure your study and everything related to it."
        accessoryRight={<StatusBadge isPublished={study?.isPublished} />}
      />
      <div className="flex max-w-7xl flex-col gap-14 p-6 pb-12">
        <BasicInfoCard study={study} isLoading={studyQuery.isLoading} />
        <EnrollmentCard study={study} isLoading={studyQuery.isLoading} />
        <ComponentsCard
          components={components}
          isLoading={componentQuery.isLoading}
        />
      </div>
    </div>
  );
};

export const Route = createFileRoute(
  "/(dashboard)/$team/$study/configuration/",
)({
  component: StudyConfigurationRoute,
});
