//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button, cn } from "@stanfordspezi/spezi-web-design-system";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ListPlus } from "lucide-react";
import { NewStudyModal } from "@/components/interfaces/NewStudyModal";
import { MinimalDashboardLayout } from "@/components/layouts/MinimalDashboardLayout";
import { Card } from "@/components/ui/Card";
import { FeaturedIconContainer } from "@/components/ui/FeaturedIconContainer";
import { studyListQueryOptions } from "@/lib/queries/study";
import { teamRetrieveQueryOptions } from "@/lib/queries/team";

const TeamRoute = () => {
  const params = Route.useParams();
  return (
    <MinimalDashboardLayout>
      <div className="flex-center size-full px-4">
        <Card className="aspect-video max-w-xl">
          <div className="bg-dots size-full">
            <div
              className={cn(
                "from-layer size-full bg-radial from-50%",
                "flex-center flex-col gap-6 p-6 text-center",
              )}
            >
              <FeaturedIconContainer>
                <div className="bg-bg flex-center size-full inset-shadow-sm">
                  <ListPlus className="opacity-80" />
                </div>
              </FeaturedIconContainer>
              <div className="flex-center flex-col gap-2">
                <h1 className="text-text max-w-48 text-lg/tight font-medium text-balance">
                  Welcome to the Spezi Study Platform!
                </h1>
                <p>Create and launch your first study today.</p>
              </div>
              <NewStudyModal teamId={params.team}>
                <Button>Create study</Button>
              </NewStudyModal>
            </div>
          </div>
        </Card>
      </div>
    </MinimalDashboardLayout>
  );
};

/*
 Redirect them to the first available study in their team, if available.
 */
export const Route = createFileRoute("/(dashboard)/$team/")({
  beforeLoad: async ({ context: { queryClient }, params }) => {
    // We validate that the `params.team` exists, so we can throw a more
    // meaningful error if it doesn't.
    await queryClient.ensureQueryData(
      teamRetrieveQueryOptions({ teamId: params.team }),
    );

    const studies = await queryClient.fetchQuery(
      studyListQueryOptions({ team_id: params.team }),
    );
    const firstStudy = studies.at(0);

    if (firstStudy) {
      return redirect({
        to: "/$team/$study",
        params: {
          team: params.team,
          study: firstStudy.id,
        },
      });
    }
  },
  component: TeamRoute,
});
