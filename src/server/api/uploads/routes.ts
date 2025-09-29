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
import {
  serveImageParamsSchema,
  serveImageResponseSchema,
  uploadImageInsertBodySchema,
  uploadImageResponseSchema,
} from "./schema";

export type UploadImageRoute = typeof uploadImage;
export const uploadImage = createRoute({
  tags: [openApiTags.uploads.name],
  path: "/upload/image",
  method: "post",
  description: "Upload an image",
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: uploadImageInsertBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: { "application/json": { schema: uploadImageResponseSchema } },
      description: "Image uploaded successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: createErrorSchema({
            message: "Invalid file or file too large",
          }),
        },
      },
      description: "Invalid file or file too large",
    },
  },
});

export type ServeImageRoute = typeof serveImage;
export const serveImage = createRoute({
  tags: [openApiTags.uploads.name],
  path: "/uploads/:imageId",
  method: "get",
  description: "Serve an uploaded image",
  request: { params: serveImageParamsSchema },
  responses: {
    200: {
      content: {
        "image/*": { schema: serveImageResponseSchema },
      },
      description: "Image file",
    },
    404: {
      content: { "application/json": { schema: error404Schema } },
      description: "Image not found",
    },
  },
});
