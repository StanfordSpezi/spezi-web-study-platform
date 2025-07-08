//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createMockApi, MockApiError } from "@/utils/createMockApi";
import { getMockDatabase, setMockDatabase } from "./mockDatabase";
import { mockAdminUser } from "./mockDatabase/user";

/**
 * Mock API for simulating backend interactions.
 * This API is used for testing and development purposes.
 */
export const mockApi = createMockApi({
  team: {
    list: () => {
      const { currentUser, teams, userTeams } = getMockDatabase();
      if (!currentUser) {
        throw new MockApiError("No current user found", 401);
      }
      if (currentUser.role === "admin") {
        return teams;
      }
      return teams.filter((team) =>
        userTeams.some(
          ({ userId, teamId }) =>
            userId === currentUser.id && teamId === team.id,
        ),
      );
    },
    retrieve: (query: { teamId: string }) => {
      const { currentUser, teams, userTeams } = getMockDatabase();
      if (!currentUser) {
        throw new MockApiError("No current user found", 401);
      }
      const team = teams.find((t) => t.id === query.teamId);
      if (!team) {
        throw new MockApiError(`Team with id ${query.teamId} not found`, 404);
      }
      if (currentUser.role === "admin") {
        return team;
      }
      const isMember = userTeams.some(
        (ut) => ut.userId === currentUser.id && ut.teamId === team.id,
      );
      if (!isMember) {
        throw new MockApiError("User is not part of this team", 403);
      }
      return team;
    },
  },
  study: {
    list: (query?: { teamId?: string }) => {
      const { currentUser, userTeams, studies } = getMockDatabase();
      if (!currentUser) {
        throw new MockApiError("No current user found", 401);
      }
      let selectedStudies = studies;
      if (query?.teamId) {
        selectedStudies = selectedStudies.filter(
          (s) => s.teamId === query.teamId,
        );
      }
      if (currentUser.role === "admin") {
        return selectedStudies;
      }
      const teamIds = userTeams
        .filter((ut) => ut.userId === currentUser.id)
        .map((ut) => ut.teamId);
      const filtered = selectedStudies.filter((s) =>
        teamIds.includes(s.teamId),
      );
      return filtered;
    },
    retrieve: (query: { studyId: string }) => {
      const { currentUser, userTeams, studies } = getMockDatabase();
      if (!currentUser) {
        throw new MockApiError("No current user found", 401);
      }
      const study = studies.find((s) => s.id === query.studyId);
      if (!study) {
        throw new MockApiError(`Study with id ${query.studyId} not found`, 404);
      }
      if (currentUser.role === "admin") {
        return study;
      }
      const allowed = userTeams.some(
        (ut) => ut.userId === currentUser.id && ut.teamId === study.teamId,
      );
      if (!allowed) {
        throw new MockApiError("User is not part of this study's team", 403);
      }
      return study;
    },
  },
  auth: {
    signIn: () => {
      setMockDatabase({ currentUser: mockAdminUser });
      return mockAdminUser;
    },
    signOut: () => {
      setMockDatabase({ currentUser: null });
      return null;
    },
    getCurrentUser: () => {
      const { currentUser } = getMockDatabase();
      if (!currentUser) {
        throw new MockApiError("No current user found", 401);
      }
      return currentUser;
    },
  },
});
