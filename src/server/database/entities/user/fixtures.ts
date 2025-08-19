//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { User } from "./schema";

export const userFixtures: User[] = [
  {
    id: "user_1",
    name: "Vincent Orlowski",
    email: "vincent_00@example.com",
    imageUrl: "https://avatars.githubusercontent.com/u/133281989?s=200&v=4",
    username: "user",
    password: "password",
    role: "user",
    teamIds: ["team_pine", "team_tree"],
  },
  {
    id: "user_2",
    name: "Naomi Price",
    email: "naomiprice@example.com",
    username: "admin",
    password: "password",
    role: "admin",
  },
];
