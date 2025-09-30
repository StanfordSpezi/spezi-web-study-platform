//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { Component } from "./schema";

export const componentFixtures: Component[] = [
  {
    id: "comp_daily_hr",
    studyId: "study_sleep_patterns",
    type: "health-data",
    sampleTypes: ["HKCategoryType;HKCategoryTypeIdentifierAppleStandHour"],
    historicalDataCollection: 7,
    schedule: {
      startOffset: 0,
      repeatType: "daily",
      repeatInterval: 1,
      displayHour: 8,
      displayMinute: 0,
      completionPolicy: "anytime",
    },
  },
  {
    id: "comp_welcome",
    studyId: "study_activity",
    type: "information",
    title: "Welcome",
    content: "# Welcome to the Sleep Patterns Study\nWe're glad you're here!",
    image: null,
    schedule: null,
  },
  {
    id: "comp_morning_survey",
    studyId: "study_activity",
    type: "questionnaire",
    fhirQuestionnaireJson: JSON.stringify({
      resourceType: "Questionnaire",
      title: "Morning Check-in",
      item: [{ linkId: "1", text: "How did you sleep?", type: "choice" }],
    }),
    schedule: {
      startOffset: 0,
      repeatType: "daily",
      repeatInterval: 1,
      displayHour: 9,
      displayMinute: 0,
      completionPolicy: "anytime",
    },
  },
  {
    id: "comp_health_data",
    studyId: "study_activity",
    type: "health-data",
    sampleTypes: ["HKCategoryType;HKCategoryTypeIdentifierAppleStandHour"],
    historicalDataCollection: 7,
    schedule: null,
  },
];
