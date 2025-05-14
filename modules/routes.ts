//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ResourceType } from "@/modules/firebase/utils";

export const routes = {
  home: "/",
  notifications: "/notifications",
  admin: "/admin",
  users: {
    index: "/users",
    user: (userId: string, resourceType: ResourceType) =>
      `/users/${resourceType === "invitation" ? "invitation-" : ""}${userId}`,
    invite: "/users/invite",
  },
  patients: {
    index: "/patients",
    patient: (patientId: string, resourceType: ResourceType) =>
      `/patients/${resourceType === "invitation" ? "invitation-" : ""}${patientId}`,
    invite: "/patients/invite",
  },
  signIn: "/sign-in",
} as const;
