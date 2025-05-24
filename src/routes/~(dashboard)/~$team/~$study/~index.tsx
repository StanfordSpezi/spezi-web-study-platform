//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button } from "@stanfordspezi/spezi-web-design-system";
import { createFileRoute } from "@tanstack/react-router";

const StudyHomeRoute = () => {
  const { team, study } = Route.useParams();
  return (
    <div className="flex-center size-full">
      <div>
        <p>Study Home Route</p>
        <p>Team: {team}</p>
        <p>Study: {study}</p>
        <Button>Click me</Button>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/(dashboard)/$team/$study/")({
  component: StudyHomeRoute,
});
