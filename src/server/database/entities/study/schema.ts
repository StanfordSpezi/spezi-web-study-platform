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
  isPublished: z.boolean(),
  title: z.string(),
  shortTitle: z.string().nullable(),
  icon: z.string().nullable(),
  explanation: z.string().nullable(),
  shortExplanation: z.string().nullable(),
  enrollmentPeriod: z
    .object({
      start: z.string().nullable(),
      end: z.string().nullable(),
    })
    .nullable(),
  studyDuration: z.number().nullable(),
  isPrivateStudy: z.boolean(),
  participationCriteria: z
    .array(
      z.object({
        attribute: z.string(),
        operator: z.string(),
        value: z.string().array(),
      }),
    )
    .nullable(),
});

export type Study = z.infer<typeof studySchema>;
