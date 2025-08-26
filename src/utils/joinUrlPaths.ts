//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

/**
 * Joins URL path segments, handling leading/trailing slashes properly.
 *
 * @example
 * const fullPath = joinUrlPaths("/api/v1/", "/users", "123");
 * // fullPath: "/api/v1/users/123"
 */
export const joinUrlPaths = (...segments: string[]): string => {
  return segments
    .map((segment, index) => {
      const isFirstSegment = index === 0;
      const isLastSegment = index === segments.length - 1;

      // Remove leading slash except for first segment
      const withoutLeadingSlash =
        isFirstSegment ? segment : segment.replace(/^\/+/, "");

      // Remove trailing slash except for last segment if it originally had one
      const withoutTrailingSlash =
        isLastSegment ? withoutLeadingSlash : (
          withoutLeadingSlash.replace(/\/+$/, "")
        );

      return withoutTrailingSlash;
    })
    .filter((segment) => segment.length > 0)
    .join("/");
};
