//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { z } from "@hono/zod-openapi";
import { userFixtures } from "@/server/database/entities/user/fixtures";

export const signInBodySchema = z.object({
  email: z.email().openapi({
    example: userFixtures[0].email,
    description: "The email address of the user",
  }),
  password: z.string().openapi({
    example: userFixtures[0].password,
    description: "The password of the user",
  }),
});

export const authUserSchema = z.object({
  id: z.string().openapi({
    example: "QO6DtlXZSnlnaaiz989kSEoEZs3XAzOc",
    description: "The unique identifier of the user",
  }),
  email: z.email().openapi({
    example: userFixtures[0].email,
    description: "The email address of the user",
  }),
  name: z.string().openapi({
    example: userFixtures[0].name,
    description: "The name of the user",
  }),
  image: z.string().nullable().openapi({
    example: null,
    description: "The profile image URL of the user",
  }),
  emailVerified: z.boolean().openapi({
    example: false,
    description: "Whether the user's email is verified",
  }),
  createdAt: z.string().openapi({
    example: "2025-08-21T11:28:34.000Z",
    description: "The date and time when the user was created",
  }),
  updatedAt: z.string().openapi({
    example: "2025-08-21T11:28:34.000Z",
    description: "The date and time when the user was last updated",
  }),
});

export const signInResponseSchema = z.object({
  redirect: z.boolean().openapi({
    example: false,
    description: "Whether to redirect the user after sign in",
  }),
  token: z.string().openapi({
    example: "oELjUJiwOvpVMGC4v4ICj8VGvwZvK1vO",
    description: "The JWT token for the signed-in user",
  }),
  user: authUserSchema,
});

export const getSessionResponseSchema = z
  .object({
    session: z.object({
      expiresAt: z.string().openapi({
        example: "2025-08-29T19:41:36.000Z",
        description: "The date and time when the session expires",
      }),
      token: z.string().openapi({
        example: "oELjUJiwOvpVMGC4v4ICj8VGvwZvK1vQ",
        description: "The JWT token for the session",
      }),
      createdAt: z.string().openapi({
        example: "2025-08-22T19:41:36.000Z",
        description: "The date and time when the session was created",
      }),
      updatedAt: z.string().openapi({
        example: "2025-08-22T19:41:36.000Z",
        description: "The date and time when the session was last updated",
      }),
      ipAddress: z.string().openapi({
        example: "192.168.1.1",
        description: "The IP address of the user",
      }),
      userAgent: z.string().openapi({
        example:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        description: "The user agent of the user's device",
      }),
      userId: z.string().openapi({
        example: "QO6DtlXZSnlnaaiz989kSEoEZs3XAzOx",
        description: "The unique identifier of the user",
      }),
      id: z.string().openapi({
        example: "zdcXIFbz4iwA30KDct1PZ6mT4gF22LDI",
        description: "The unique identifier of the session",
      }),
    }),
    user: authUserSchema,
  })
  .nullable();

export const signOutResponseSchema = z.object({
  success: z.boolean().openapi({
    example: true,
    description: "Indicates whether the sign-out was successful",
  }),
});
