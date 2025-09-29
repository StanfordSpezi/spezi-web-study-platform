//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { z } from "@hono/zod-openapi";

export const uploadImageInsertBodySchema = z.object({
  image: z.instanceof(File).describe("Image file to upload").openapi({
    type: "string",
    format: "binary",
  }),
});

export const uploadImageResponseSchema = z.object({
  id: z.string().openapi({ example: "1687623456789-abcd1234" }),
  url: z.string().openapi({ example: "/api/uploads/1687623456789-abcd1234" }),
  filename: z.string().openapi({ example: "image.png" }),
  size: z.number().openapi({ example: 1024 }),
  mimeType: z.string().openapi({ example: "image/png" }),
});

export const serveImageParamsSchema = z.object({
  imageId: z.string().min(1).openapi({ example: "1687623456789-abcd1234" }),
});

export const serveImageResponseSchema = z
  .string()
  .describe("Image file")
  .openapi({
    type: "string",
    format: "binary",
  });
