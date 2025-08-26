//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createRoute } from "@hono/zod-openapi";
import { createErrorSchema } from "@/server/error";
import { openApiTags } from "@/server/tags";
import {
  getSessionResponseSchema,
  signInBodySchema,
  signInResponseSchema,
  signOutResponseSchema,
} from "./schema";

export type SignInRoute = typeof signIn;
export const signIn = createRoute({
  tags: [openApiTags.auth.name],
  path: "/auth/sign-in/email",
  method: "post",
  description: "Sign in with email and password",
  request: {
    body: {
      content: {
        "application/json": {
          schema: signInBodySchema,
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: signInResponseSchema,
        },
      },
      description: "Successful sign-in response",
    },
    400: {
      content: {
        "application/json": {
          schema: createErrorSchema({
            code: "INVALID_EMAIL",
            message: "Invalid email",
          }),
        },
      },
      description: "Invalid email or password",
    },
    401: {
      content: {
        "application/json": {
          schema: createErrorSchema({
            code: "INVALID_EMAIL_OR_PASSWORD",
            message: "Invalid email or password",
          }),
        },
      },
      description: "Invalid email or password",
    },
  },
});

export type GetSessionRoute = typeof getSession;
export const getSession = createRoute({
  tags: [openApiTags.auth.name],
  path: "/auth/get-session",
  method: "get",
  description: "Get the current user session",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: getSessionResponseSchema,
        },
      },
      description: "Successful session retrieval",
    },
  },
});

export type SignOutRoute = typeof signOut;
export const signOut = createRoute({
  tags: [openApiTags.auth.name],
  path: "/auth/sign-out",
  method: "post",
  description: "Sign out the current user",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: signOutResponseSchema,
        },
      },
      description: "Successful sign-out response",
    },
  },
});
