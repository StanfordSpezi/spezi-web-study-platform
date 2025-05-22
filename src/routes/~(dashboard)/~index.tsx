//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/")({
  beforeLoad: () => {
    throw redirect({
      to: "/$team/$study",
      params: {
        team: "team-pine",
        study: "activity-study",
      },
    });
  },
});
