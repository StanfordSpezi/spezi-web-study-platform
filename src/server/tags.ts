//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

export const openApiTags = {
  auth: {
    name: "Authentication",
    description:
      "Manage user authentication, including sign-in, sign-out and session management.",
  },
  studies: {
    name: "Studies",
    description:
      "Manage research studies including configuration, enrollment settings, and publication status. Access is filtered by team membership and role permissions.",
  },
  teams: {
    name: "Teams",
    description:
      "Manage research teams and their members. Teams control access to studies.",
  },
  users: {
    name: "Users",
    description: "Retrieve user information.",
  },
};
