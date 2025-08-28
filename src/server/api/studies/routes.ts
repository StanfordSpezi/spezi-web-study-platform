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
import {
  studyInsertSchema,
  studyListQuerySchema,
  studyRetrieveParams,
  studySelectSchema,
} from "./schema";

export type ListRoute = typeof list;
export const list = createRoute({
  tags: [openApiTags.studies.name],
  path: "/studies",
  method: "get",
  description: "List all studies",
  request: { query: studyListQuerySchema },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.array(studySelectSchema),
        },
      },
      description: "The list of studies",
    },
  },
});

export type RetrieveRoute = typeof retrieve;
export const retrieve = createRoute({
  tags: [openApiTags.studies.name],
  path: "/studies/:id",
  method: "get",
  description: "Retrieve a specific study by its id",
  request: { params: studyRetrieveParams },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: studySelectSchema,
        },
      },
      description: "The study details",
    },
    404: {
      content: {
        "application/json": {
          schema: error404Schema,
        },
      },
      description: "Study not found",
    },
  },
});

export type UpdateRoute = typeof update;
export const update = createRoute({
  tags: [openApiTags.studies.name],
  path: "/studies/:id",
  method: "put",
  description: "Update a specific study by its id",
  request: {
    params: studyRetrieveParams,
    body: {
      content: {
        "application/json": {
          schema: studyInsertSchema,
        },
      },
      description: "The study data to update",
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: studySelectSchema,
        },
      },
      description: "The updated study details",
    },
    404: {
      content: {
        "application/json": {
          schema: error404Schema,
        },
      },
      description: "Study not found",
    },
  },
});
