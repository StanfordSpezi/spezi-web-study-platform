//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { z } from "@hono/zod-openapi";

export const userSelectSchema = z.object({
  id: z.string().openapi({
    example: "user_1",
    description: "The unique identifier of the user",
  }),
  name: z.string().openapi({
    example: "John Doe",
    description: "The name of the user",
  }),
  email: z.email().openapi({
    example: "john.doe@example.com",
    description: "The email address of the user",
  }),
  imageUrl: z.url().optional().openapi({
    example: "https://example.com/images/user_123.png",
    description: "The profile image URL of the user",
  }),
  role: z.enum(["admin", "user"]).openapi({
    example: "user",
    description: "The role of the user",
  }),
});

export const userRetrieveParams = z.object({
  id: z.string().openapi({
    example: "user_1",
    description: "The unique identifier of the user",
  }),
});
