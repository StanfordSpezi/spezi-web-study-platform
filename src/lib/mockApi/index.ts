//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { mockStudies } from "./study";
import { mockTeams } from "./team";

const mockDatabase = {
  teams: mockTeams,
  studies: mockStudies,
};

/**
 * The mock database is stored in localStorage to persist across page reloads.
 * This allows the mock API to simulate a more realistic environment.
 * If localStorage is not available (e.g., in Node.js environments),
 * it falls back to an in-memory mock database.
 */
const getMockDatabase = () => {
  // In Playwright’s test runner there is no window.localStorage
  if (
    typeof window === "undefined" ||
    typeof window.localStorage === "undefined"
  ) {
    return mockDatabase;
  }

  const mockApi = localStorage.getItem("mock-api");
  if (mockApi) {
    return JSON.parse(mockApi) as typeof mockDatabase;
  }
  localStorage.setItem("mock-api", JSON.stringify(mockDatabase));
  return mockDatabase;
};

/**
 * Mock API for simulating backend interactions.
 * This API is used for testing and development purposes.
 */
export const mockApi = {
  team: {
    list: () => {
      const { teams } = getMockDatabase();
      return teams;
    },
    detail: (teamId: string) => {
      const { teams } = getMockDatabase();
      return teams.find((team) => team.id === teamId);
    },
  },
  study: {
    list: (query?: { teamId?: string }) => {
      const { studies } = getMockDatabase();
      if (query?.teamId) {
        return studies.filter((study) => study.teamId === query.teamId);
      }
      return studies;
    },
    detail: (studyId: string) => {
      const { studies } = getMockDatabase();
      return studies.find((study) => study.id === studyId);
    },
  },
};
