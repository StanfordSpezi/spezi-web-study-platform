//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { PageTitle } from "@stanfordspezi/spezi-web-design-system/molecules/DashboardLayout";
import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { Helmet } from "react-helmet";
import { DashboardLayout } from "./DashboardLayout";
import { NotificationsCard } from "./NotificationsCard";
import { TemplateCard } from "./TemplateCard";

const DashboardPage = () => (
  <DashboardLayout title={<PageTitle title="Home" icon={<Home />} />}>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <div className="grid gap-5 xl:grid-cols-2">
      <NotificationsCard />
      <TemplateCard />
    </div>
  </DashboardLayout>
);

export const Route = createFileRoute("/_dashboard/")({
  component: DashboardPage,
});
