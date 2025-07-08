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

export const mockStudies: Study[] = [
  {
    id: "activity-study",
    teamId: "team-pine",
    title: "Activity Study",
    shortTitle: "Activity",
    explanation:
      "A study focused on physical activity and health. In this study, participants will engage in various physical activities and report their experiences.",
    shortExplanation: "Physical activity and health study.",
    enrollmentPeriod: {
      start: "2025-01-01",
      end: "2025-12-31",
    },
  },
  {
    id: "health-study",
    teamId: "team-pine",
    title: "Health Study",
  },
  {
    id: "brain-study",
    teamId: "team-pine",
    title: "Brain Study",
  },
  {
    id: "dna-study",
    teamId: "team-tree",
    title: "DNA Study",
  },
  {
    id: "sleep-study",
    teamId: "team-tree",
    title: "Sleep Study",
  },
  {
    id: "nutrition-study",
    teamId: "team-palm",
    title: "Nutrition Study",
  },
  {
    id: "stress-study",
    teamId: "team-flower",
    title: "Stress Study",
  },
];
