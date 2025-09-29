//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { z } from "zod";

export const scheduleSchema = z
  .object({
    startOffset: z.number(),
    repeatType: z.enum(["none", "daily", "weekly"]),
    repeatInterval: z.number(),
    displayHour: z.number(),
    displayMinute: z.number(),
    completionPolicy: z.enum([
      "after-start",
      "anytime",
      "same-day-after-start",
    ]),
  })
  .nullable();

const baseComponentSchema = z.object({
  id: z.string(),
  studyId: z.string(),
  schedule: scheduleSchema,
});

const informationComponentSchema = baseComponentSchema.extend({
  type: z.literal("information"),
  title: z.string(),
  content: z.string(),
  image: z.string().nullable(),
});

const healthDataComponentSchema = baseComponentSchema.extend({
  type: z.literal("health-data"),
  sampleTypes: z.string().array(),
  historicalDataCollection: z.number().nullable(),
});

const questionnaireComponentSchema = baseComponentSchema.extend({
  type: z.literal("questionnaire"),
  fhirQuestionnaireJson: z.string(),
});

export const componentSchema = z.discriminatedUnion("type", [
  informationComponentSchema,
  healthDataComponentSchema,
  questionnaireComponentSchema,
]);

export type Component = z.infer<typeof componentSchema>;
