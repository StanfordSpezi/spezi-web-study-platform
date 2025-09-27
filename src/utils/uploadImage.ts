//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { buildApiUrl, handleApiResponse } from "@/lib/apiRequest";
import { uploadsApi } from "@/server/api/uploads";
import type { ExtractZod, PathValue } from "@/utils/types";

/**
 * Extracts the file extension from a base64 data URL based on its MIME type.
 *
 * @example
 * const extension = extractExtensionFromDataUrl("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...");
 * console.log(extension); // Outputs: ".png"
 */
const extractExtensionFromDataUrl = (dataUrl: string) => {
  const mimeType = dataUrl.split(";")[0].split(":")[1];

  if (mimeType === "image/png") {
    return ".png";
  }
  if (mimeType === "image/jpeg" || mimeType === "image/jpg") {
    return ".jpg";
  }

  // Default to ".jpg" for unsupported or unknown MIME types, as JPEG is widely supported.
  return ".jpg";
};

type UploadImageApiResponse = ExtractZod<
  PathValue<
    typeof uploadsApi.routes.uploadImage,
    ["responses", 201, "content", "application/json", "schema"]
  >
>;

interface UploadImageParams {
  base64DataUrl: string;
}

/**
 * Uploads an image to the server. Takes a base64 data URL and converts it to a File for upload.
 */
export const uploadImage = async ({ base64DataUrl }: UploadImageParams) => {
  // Convert base64 data URL to File
  const response = await fetch(base64DataUrl);
  const blob = await response.blob();
  const fileName = `upload${extractExtensionFromDataUrl(base64DataUrl)}`;
  const file = new File([blob], fileName, { type: blob.type });

  // Create FormData and append the file
  const formData = new FormData();
  formData.append("image", file);

  const requestUrl = buildApiUrl({
    apiPath: uploadsApi.routes.uploadImage.path,
  });

  const fetchOptions: RequestInit = {
    method: "POST",
    headers: {
      // 'Content-Type' is set automatically by the browser for FormData
    },
    body: formData,
    credentials: "include",
  };

  const apiResponse = await fetch(requestUrl, fetchOptions);
  return handleApiResponse<UploadImageApiResponse>(apiResponse);
};
