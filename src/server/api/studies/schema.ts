//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { z } from "@hono/zod-openapi";

export const studyListQuerySchema = z.object({
  team_id: z.string().optional().openapi({
    example: "team_tree",
    description: "The id of the team associated with the study",
  }),
});

export const studySelectSchema = z.object({
  id: z.string().openapi({
    example: "study_sleep_patterns",
    description: "The unique identifier of the study",
  }),
  teamId: z.string().openapi({
    example: "team_tree",
    description: "The id of the team associated with the study",
  }),
  isPublished: z.boolean().optional().openapi({
    example: true,
    description: "Indicates if the study is published",
  }),
  title: z.string().openapi({
    example: "Sleep Patterns Study",
    description: "The full title of the study",
  }),
  shortTitle: z.string().optional().openapi({
    example: "Sleep Study",
    description: "A short version of the study title",
  }),
  icon: z.string().optional().openapi({
    example: "moon",
    description: "Icon representing the study",
  }),
  explanation: z.string().optional().openapi({
    example: "This study investigates sleep patterns in adults.",
    description: "Detailed explanation of the study",
  }),
  shortExplanation: z.string().optional().openapi({
    example: "Study on adult sleep habits.",
    description: "Brief explanation of the study",
  }),
  enrollmentPeriod: z
    .object({
      start: z.string().optional().openapi({
        example: "2025-01-01",
        description: "Enrollment period start date (YYYY-MM-DD)",
      }),
      end: z.string().optional().openapi({
        example: "2025-03-31",
        description: "Enrollment period end date (YYYY-MM-DD)",
      }),
    })
    .optional()
    .openapi({
      example: { start: "2025-01-01", end: "2025-03-31" },
      description: "Period during which participants can enroll",
    }),
  studyDuration: z.number().optional().openapi({
    example: 90,
    description: "Duration of the study in days",
  }),
  isPrivateStudy: z.boolean().optional().openapi({
    example: false,
    description: "Indicates if the study is private",
  }),
});

export const studyRetrieveParams = z.object({
  id: z.string().openapi({
    example: "study_sleep_patterns",
    description: "The unique identifier of the study",
  }),
});
