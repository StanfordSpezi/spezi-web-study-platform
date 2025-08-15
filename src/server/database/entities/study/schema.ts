//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { z } from "zod";

export const studySchema = z.object({
  id: z.string(),
  teamId: z.string(),
  isPublished: z.boolean().optional(),
  title: z.string(),
  shortTitle: z.string().optional(),
  icon: z.string().optional(),
  explanation: z.string().optional(),
  shortExplanation: z.string().optional(),
  enrollmentPeriod: z
    .object({
      start: z.string().optional(),
      end: z.string().optional(),
    })
    .optional(),
  studyDuration: z.number().optional(),
  isPrivateStudy: z.boolean().optional(),
});

export type Study = z.infer<typeof studySchema>;
