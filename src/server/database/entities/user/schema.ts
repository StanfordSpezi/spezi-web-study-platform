//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  imageUrl: z.url().optional(),
  username: z.string(),
  password: z.string(),
  role: z.enum(["admin", "user"]),
  teamIds: z.array(z.string()).optional(),
});

export type User = z.infer<typeof userSchema>;
