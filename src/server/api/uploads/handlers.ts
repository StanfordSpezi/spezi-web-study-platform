//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import fs from "node:fs";
import path from "node:path";
import { getDevAssetsPath } from "@/server/database";
import { respondWithError } from "@/server/error";
import { type AppRouteHandler } from "@/server/utils";
import type { ServeImageRoute, UploadImageRoute } from "./routes";

export const uploadImage: AppRouteHandler<UploadImageRoute> = async (c) => {
  const formData = await c.req.formData();
  const imageFile = formData.get("image");

  if (!imageFile || !(imageFile instanceof File)) {
    return respondWithError(c, 400, {
      message: "No image file provided",
    });
  }

  const allowedTypes = ["image/jpeg", "image/png"];
  if (!allowedTypes.includes(imageFile.type.toLowerCase())) {
    return respondWithError(c, 400, {
      message: "Only JPG, JPEG, and PNG files are allowed",
    });
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (imageFile.size > maxSize) {
    return respondWithError(c, 400, {
      message: "File size must be less than 10MB",
    });
  }

  // Generate unique filename with proper extension
  const timestamp = Date.now();
  const extension = path.extname(imageFile.name).toLowerCase();

  const baseUrl = c.req.url.replace(c.req.path, "");
  const filename = `${timestamp}-${Math.random().toString(36).substring(2)}${extension}`;
  const imageId = filename.replace(extension, "");

  // Save file to assets folder
  const assetsPath = getDevAssetsPath();
  const filePath = path.join(assetsPath, filename);

  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(filePath, buffer);

  return c.json(
    {
      id: imageId,
      url: `${baseUrl}/api/uploads/${imageId}`,
      filename: imageFile.name,
      size: imageFile.size,
      mimeType: imageFile.type,
    },
    201,
  );
};

export const serveImage: AppRouteHandler<ServeImageRoute> = (c) => {
  const param = c.req.valid("param");

  const assetsPath = getDevAssetsPath();
  const files = fs.readdirSync(assetsPath);

  const filename = files.find((file) => file.startsWith(param.imageId));

  if (!filename) {
    return respondWithError(c, 404, {
      message: "Image not found",
    });
  }

  const filePath = path.join(assetsPath, filename);

  if (!fs.existsSync(filePath)) {
    return respondWithError(c, 404, {
      message: "Image not found",
    });
  }

  const fileBuffer = fs.readFileSync(filePath);
  const extension = path.extname(filename).toLowerCase();

  // Set appropriate content type
  let contentType = "application/octet-stream";
  if (extension === ".jpg" || extension === ".jpeg") {
    contentType = "image/jpeg";
  } else if (extension === ".png") {
    contentType = "image/png";
  }

  c.header("Content-Type", contentType);
  c.header("Cache-Control", "public, max-age=31536000"); // Cache for 1 year

  return c.body(fileBuffer);
};
