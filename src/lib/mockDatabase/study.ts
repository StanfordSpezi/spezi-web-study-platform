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
  title: z.string(),
  teamId: z.string(),
});

type Study = z.infer<typeof studySchema>;

export const mockStudies: Study[] = [
  {
    id: "activity-study",
    title: "Activity Study",
    teamId: "team-pine",
  },
  {
    id: "health-study",
    title: "Health Study",
    teamId: "team-pine",
  },
  {
    id: "brain-study",
    title: "Brain Study",
    teamId: "team-pine",
  },
  {
    id: "dna-study",
    title: "DNA Study",
    teamId: "team-tree",
  },
  {
    id: "sleep-study",
    title: "Sleep Study",
    teamId: "team-tree",
  },
  {
    id: "nutrition-study",
    title: "Nutrition Study",
    teamId: "team-palm",
  },
  {
    id: "stress-study",
    title: "Stress Study",
    teamId: "team-flower",
  },
];
