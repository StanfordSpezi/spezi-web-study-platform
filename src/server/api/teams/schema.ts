//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { z } from "@hono/zod-openapi";

export const teamSelectSchema = z.object({
  id: z.string().openapi({
    example: "team_tree",
    description: "The unique identifier of the team",
  }),
  name: z.string().openapi({
    example: "Team Tree",
    description: "The name of the team",
  }),
  icon: z.string().openapi({
    example: "tree-pine",
    description: "Icon representing the team",
  }),
});

export const teamRetrieveParams = z.object({
  id: z.string().openapi({
    example: "team_tree",
    description: "The unique identifier of the team",
  }),
});
