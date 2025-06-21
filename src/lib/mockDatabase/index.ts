//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { z } from "zod";
import { mockStudies, studySchema } from "./study";
import { mockTeams, mockUserTeams, teamSchema, userTeamSchema } from "./team";
import { mockCurrentUser, mockUsers, userSchema } from "./user";

const mockDatabaseSchema = z.object({
  // Auth
  currentUser: userSchema.nullable(),
  // Entities
  teams: teamSchema.array(),
  studies: studySchema.array(),
  users: userSchema.array(),
  // Relationships
  userTeams: userTeamSchema.array(),
});

type MockDatabase = z.infer<typeof mockDatabaseSchema>;

// If you make changes to the mock API database, please make sure to
// to update / clear the mock database in the localStorage as well.
// By default, the mock database is persisted in localStorage and not recreated
// on every page load to simulate a more realistic environment.
export const mockDatabase: MockDatabase = {
  currentUser: mockCurrentUser,
  teams: mockTeams,
  studies: mockStudies,
  users: mockUsers,
  userTeams: mockUserTeams,
};

/**
 * The mock database is stored in localStorage to persist across page reloads.
 * This allows the mock API to simulate a more realistic environment.
 */
export const getMockDatabase = (): MockDatabase => {
  const mockApi = localStorage.getItem("mock-api");
  if (mockApi) {
    const parsed = mockDatabaseSchema.safeParse(JSON.parse(mockApi));
    if (parsed.success) {
      return parsed.data;
    }

    // If the format is invalid, reset to the default mock database
    localStorage.removeItem("mock-api");
    localStorage.setItem("mock-api", JSON.stringify(mockDatabase));
    return mockDatabase;
  }
  localStorage.setItem("mock-api", JSON.stringify(mockDatabase));
  return mockDatabase;
};

/**
 * Updates the mock database in localStorage.
 * This function merges the provided data with the existing mock database.
 */
export const setMockDatabase = (data: Partial<typeof mockDatabase>) => {
  const currentData = getMockDatabase();
  const updatedData = { ...currentData, ...data };
  localStorage.setItem("mock-api", JSON.stringify(updatedData));
  return updatedData;
};
