//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createRoute } from "@hono/zod-openapi";
import { createErrorSchema, error404Schema } from "@/server/error";
import { openApiTags } from "@/server/tags";
import { userRetrieveParams, userSelectSchema } from "./schema";

export type RetrieveRoute = typeof retrieve;
export const retrieve = createRoute({
  tags: [openApiTags.users.name],
  path: "/users/:id",
  method: "get",
  description:
    "Retrieve a specific user by its id. Pass `me` to retrieve the logged-in user.",
  request: { params: userRetrieveParams },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: userSelectSchema,
        },
      },
      description: "The user details",
    },
    403: {
      content: {
        "application/json": {
          schema: createErrorSchema({
            message: "You do not have access to view this user",
          }),
        },
      },
      description: "You do not have access to view this user",
    },
    404: {
      content: {
        "application/json": {
          schema: error404Schema,
        },
      },
      description: "User not found",
    },
  },
});
