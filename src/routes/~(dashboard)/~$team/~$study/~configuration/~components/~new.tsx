//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const NewComponentRoute = () => {
  return <p>New Component Route</p>;
};

export const Route = createFileRoute(
  "/(dashboard)/$team/$study/configuration/components/new",
)({
  component: NewComponentRoute,
  validateSearch: z.object({
    componentType: z
      .enum(["information", "questionnaire", "health-data"])
      .optional(),
  }),
});
