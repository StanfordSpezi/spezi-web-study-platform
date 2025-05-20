//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createFileRoute } from "@tanstack/react-router";

const StudyResultsRoute = () => {
  return <div>Study Results Route</div>;
};

export const Route = createFileRoute("/(dashboard)/$team/$study/results")({
  component: StudyResultsRoute,
});
