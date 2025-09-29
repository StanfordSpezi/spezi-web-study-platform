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
  componentInsertBodySchema,
  componentListParams,
  componentRetrieveParams,
  componentSelectSchema,
  componentUpdateSchema,
} from "./schema";

export type ListForStudyRoute = typeof listForStudy;
export const listForStudy = createRoute({
  tags: [openApiTags.components.name],
  path: "/studies/:studyId/components",
  method: "get",
  description: "List all components for a study",
  request: { params: componentListParams },
  responses: {
    200: {
      content: {
        "application/json": { schema: z.array(componentSelectSchema) },
      },
      description: "The list of components for the study",
    },
    404: {
      content: { "application/json": { schema: error404Schema } },
      description: "Study not found or inaccessible",
    },
  },
});

export type CreateForStudyRoute = typeof createForStudy;
export const createForStudy = createRoute({
  tags: [openApiTags.components.name],
  path: "/studies/:studyId/components",
  method: "post",
  description: "Create a new component for a study",
  request: {
    params: componentListParams,
    body: {
      content: { "application/json": { schema: componentInsertBodySchema } },
    },
  },
  responses: {
    201: {
      content: { "application/json": { schema: componentSelectSchema } },
      description: "The created component",
    },
    404: {
      content: { "application/json": { schema: error404Schema } },
      description: "Study not found or inaccessible",
    },
  },
});

export type RetrieveRoute = typeof retrieve;
export const retrieve = createRoute({
  tags: [openApiTags.components.name],
  path: "/components/:id",
  method: "get",
  description: "Retrieve a specific component by its id",
  request: { params: componentRetrieveParams },
  responses: {
    200: {
      content: { "application/json": { schema: componentSelectSchema } },
      description: "The component details",
    },
    404: {
      content: { "application/json": { schema: error404Schema } },
      description: "Component not found",
    },
  },
});

export type UpdateRoute = typeof update;
export const update = createRoute({
  tags: [openApiTags.components.name],
  path: "/components/:id",
  method: "patch",
  description: "Update a specific component by its id",
  request: {
    params: componentRetrieveParams,
    body: {
      content: { "application/json": { schema: componentUpdateSchema } },
      description: "The component fields to update",
    },
  },
  responses: {
    200: {
      content: { "application/json": { schema: componentSelectSchema } },
      description: "The updated component",
    },
    404: {
      content: { "application/json": { schema: error404Schema } },
      description: "Component not found",
    },
  },
});

export type DeleteRoute = typeof remove;
export const remove = createRoute({
  tags: [openApiTags.components.name],
  path: "/components/:id",
  method: "delete",
  description: "Delete a specific component by its id",
  request: { params: componentRetrieveParams },
  responses: {
    204: { description: "Component deleted" },
    404: {
      content: { "application/json": { schema: error404Schema } },
      description: "Component not found",
    },
  },
});
