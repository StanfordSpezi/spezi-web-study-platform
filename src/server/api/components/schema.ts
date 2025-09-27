//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { z } from "@hono/zod-openapi";

const scheduleSchema = z
  .object({
    startOffset: z.number().openapi({ example: 0 }),
    repeatType: z.enum(["daily", "weekly"]).openapi({ example: "daily" }),
    repeatInterval: z.number().openapi({ example: 1 }),
    displayHour: z.number().openapi({ example: 9 }),
    displayMinute: z.number().openapi({ example: 0 }),
  })
  .nullable()
  .openapi({
    description: "Optional schedule for activating the component",
  });

const baseComponentSchema = z.object({
  id: z.string().openapi({ example: "comp_123" }),
  studyId: z.string().openapi({ example: "study_sleep_patterns" }),
  schedule: scheduleSchema,
});

const informationComponentSchema = baseComponentSchema.extend({
  type: z.literal("information"),
  title: z.string().openapi({ example: "Welcome" }),
  content: z.string().openapi({ example: "# Welcome to the study" }),
  image: z.string().nullable().openapi({ example: null }),
});

const healthDataComponentSchema = baseComponentSchema.extend({
  type: z.literal("health-data"),
  sampleTypes: z
    .string()
    .array()
    .openapi({ example: ["heart_rate"] }),
});

const questionnaireComponentSchema = baseComponentSchema.extend({
  type: z.literal("questionnaire"),
  fhirQuestionnaireJson: z
    .string()
    .openapi({ example: '{"resourceType":"Questionnaire","title":"Survey"}' }),
});

export const componentSelectSchema = z.discriminatedUnion("type", [
  informationComponentSchema,
  healthDataComponentSchema,
  questionnaireComponentSchema,
]);

// Create body: same shapes without id and studyId (studyId is provided via path)
const baseCreateSchema = z.object({ schedule: scheduleSchema });
const informationCreateSchema = baseCreateSchema.extend({
  type: z.literal("information"),
  title: z.string(),
  content: z.string(),
  image: z.string().nullable(),
});
const healthDataCreateSchema = baseCreateSchema.extend({
  type: z.literal("health-data"),
  sampleTypes: z.string().array(),
});
const questionnaireCreateSchema = baseCreateSchema.extend({
  type: z.literal("questionnaire"),
  fhirQuestionnaireJson: z.string(),
});
export const componentInsertBodySchema = z.discriminatedUnion("type", [
  informationCreateSchema,
  healthDataCreateSchema,
  questionnaireCreateSchema,
]);

const baseUpdateSchema = z.object({ schedule: scheduleSchema.optional() });
const informationUpdateSchema = baseUpdateSchema.extend({
  type: z.literal("information"),
  title: z.string().optional(),
  content: z.string().optional(),
  image: z.string().nullable().optional(),
});

const healthDataUpdateSchema = baseUpdateSchema.extend({
  type: z.literal("health-data"),
  sampleTypes: z.string().array().optional(),
});

const questionnaireUpdateSchema = baseUpdateSchema.extend({
  type: z.literal("questionnaire"),
  fhirQuestionnaireJson: z.string().optional(),
});

export const componentUpdateSchema = z
  .discriminatedUnion("type", [
    informationUpdateSchema,
    healthDataUpdateSchema,
    questionnaireUpdateSchema,
  ])
  .openapi({ description: "Partial update of a component" });

export const componentRetrieveParams = z.object({
  id: z.string().openapi({ example: "comp_123" }),
});

export const componentListParams = z.object({
  studyId: z.string().openapi({ example: "study_sleep_patterns" }),
});
