//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

interface User {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  role: "admin" | "user";
}

export const mockAdminUser: User = {
  id: "admin-1",
  name: "Naomi Price",
  email: "naomiprice@example.com",
  role: "admin",
};

export const mockUsers: User[] = [
  mockAdminUser,
  {
    id: "user-1",
    name: "Vincent Orlowski",
    email: "vincent_00@example.com",
    imageUrl: "https://avatars.githubusercontent.com/u/133281989?s=200&v=4",
    role: "user",
  },
];

export const mockCurrentUser: User | null = null;
