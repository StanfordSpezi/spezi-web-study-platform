//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createRoute, z } from "@hono/zod-openapi";
import { error404Schema } from "@/server/error";
import { openApiTags } from "@/server/tags";
import { teamRetrieveParams, teamSelectSchema } from "./schema";

export type ListRoute = typeof list;
export const list = createRoute({
  tags: [openApiTags.teams.name],
  path: "/teams",
  method: "get",
  description: "List all teams",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.array(teamSelectSchema),
        },
      },
      description: "The list of teams",
    },
  },
});

export type RetrieveRoute = typeof retrieve;
export const retrieve = createRoute({
  tags: [openApiTags.teams.name],
  path: "/teams/:id",
  method: "get",
  description: "Retrieve a specific team by its id",
  request: { params: teamRetrieveParams },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: teamSelectSchema,
        },
      },
      description: "The team details",
    },
    404: {
      content: {
        "application/json": {
          schema: error404Schema,
        },
      },
      description: "Team not found",
    },
  },
});
