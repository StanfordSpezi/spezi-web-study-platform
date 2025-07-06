//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

interface Team {
  id: string;
  name: string;
  icon: string;
}

export const mockTeams: Team[] = [
  {
    id: "team-pine",
    name: "Team Pine",
    icon: "TreePine",
  },
  {
    id: "team-tree",
    name: "Team Tree",
    icon: "TentTree",
  },
  {
    id: "team-palm",
    name: "Team Palm",
    icon: "TreePalm",
  },
  {
    id: "team-flower",
    name: "Team Flower",
    icon: "Flower",
  },
  {
    id: "team-mountain",
    name: "Team Mountain",
    icon: "Mountain",
  },
];

interface UserTeam {
  userId: string;
  teamId: string;
}

export const mockUserTeams: UserTeam[] = [
  { userId: "user-1", teamId: "team-pine" },
  { userId: "user-1", teamId: "team-tree" },
];
