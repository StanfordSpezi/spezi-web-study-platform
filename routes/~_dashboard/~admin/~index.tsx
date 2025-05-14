//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { UserType } from "@stanfordbdhg/engagehf-models";
import { sleep } from "@stanfordspezi/spezi-web-design-system";
import { Button } from "@stanfordspezi/spezi-web-design-system/components/Button";
import { toast } from "@stanfordspezi/spezi-web-design-system/components/Toaster";
import { PageTitle } from "@stanfordspezi/spezi-web-design-system/molecules/DashboardLayout";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { MonitorCog } from "lucide-react";
import { Helmet } from "react-helmet";
import { ensureType } from "@/modules/firebase/app";
import { DashboardLayout } from "../DashboardLayout";

/**
 * AdminPage is accessible and visible only for users with UserType.admin role.
 * Page includes an example admin action.
 */

const AdminPage = () => {
  const exampleAdminAction = useMutation({
    mutationFn: async () => {
      await sleep(1000);
    },
    onSuccess: () => toast.success("Successfully triggered some action!"),
    onError: () => toast.error("Action failed. Please try again later."),
  });

  return (
    <DashboardLayout title={<PageTitle title="Admin" icon={<MonitorCog />} />}>
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <div className="flex flex-col items-start gap-8">
        <section className="flex flex-col items-start gap-2">
          <Button
            onClick={() => exampleAdminAction.mutate()}
            isPending={exampleAdminAction.isPending}
          >
            Example admin action
          </Button>
          <p className="text-sm font-light">
            This view is accessible for users with admin role only.
          </p>
        </section>
      </div>
    </DashboardLayout>
  );
};

export const Route = createFileRoute("/_dashboard/admin/")({
  component: AdminPage,
  beforeLoad: () => ensureType([UserType.admin]),
});
