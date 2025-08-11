//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { z } from "zod";

export const teamSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
});

type Team = z.infer<typeof teamSchema>;

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

export const userTeamSchema = z.object({
  userId: z.string(),
  teamId: z.string(),
});

type UserTeam = z.infer<typeof userTeamSchema>;

export const mockUserTeams: UserTeam[] = [
  { userId: "user-1", teamId: "team-pine" },
  { userId: "user-1", teamId: "team-tree" },
];
