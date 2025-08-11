//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createFileRoute } from "@tanstack/react-router";
import { IconPicker } from "@/components/ui/IconPicker";

const StudyHomeRoute = () => {
  const { team, study } = Route.useParams();
  return (
    <div className="flex-center size-full">
      <div>
        <p className="text-text">Study Home Route</p>
        <p className="text-text-secondary">Team: {team}</p>
        <p>Study: {study}</p>
        <IconPicker />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/(dashboard)/$team/$study/")({
  component: StudyHomeRoute,
});
