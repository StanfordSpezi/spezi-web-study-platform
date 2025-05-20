//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/$team/$study/results")({
  component: StudyResultsRoute,
});

// eslint-disable-next-line prefer-arrow-functions/prefer-arrow-functions
function StudyResultsRoute() {
  return <div>Study Results Route</div>;
}
