//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { Study } from "./schema";

export const studyFixtures: Study[] = [
  {
    id: "study_activity",
    teamId: "team_pine",
    title: "Activity Study",
    shortTitle: "Activity",
    explanation:
      "A study focused on physical activity and health. In this study, participants will engage in various physical activities and report their experiences. The study aims to understand the impact of physical activity on health outcomes. Participants will be asked to log their daily activities, complete surveys, and may also wear activity trackers to monitor their physical activity levels. The study will run for one year, with participants enrolling at different times throughout the year.",
    shortExplanation:
      "Physical activity and health study. In this study, participants will engage in various physical activities and report their experiences.",
    enrollmentPeriod: {
      start: "2025-01-01",
      end: "2025-12-31",
    },
  },
  {
    id: "study_sleep_patterns",
    teamId: "team_tree",
    title: "Sleep Patterns Study",
    shortTitle: "Sleep Patterns",
    explanation:
      "A study focused on sleep patterns and health. In this study, participants will track their sleep patterns and report their experiences. The study aims to understand the impact of sleep on health outcomes. Participants will be asked to log their sleep habits, complete surveys, and may also use sleep trackers to monitor their sleep patterns. The study will run for one year, with participants enrolling at different times throughout the year.",
    shortExplanation:
      "Sleep patterns and health study. In this study, participants will track their sleep patterns and report their experiences.",
    enrollmentPeriod: {
      start: "2025-01-01",
      end: "2025-12-31",
    },
    icon: "moon",
  },
  {
    id: "study_health",
    teamId: "team_pine",
    title: "Health Study",
  },
  {
    id: "study_brain",
    teamId: "team_pine",
    title: "Brain Study",
  },
  {
    id: "study_dna",
    teamId: "team_tree",
    title: "DNA Study",
  },
  {
    id: "study_sleep",
    teamId: "team_tree",
    title: "Sleep Study",
  },
  {
    id: "study_nutrition",
    teamId: "team_palm",
    title: "Nutrition Study",
  },
  {
    id: "study_stress",
    teamId: "team_flower",
    title: "Stress Study",
  },
];
