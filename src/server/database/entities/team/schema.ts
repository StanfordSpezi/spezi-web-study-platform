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

export type Team = z.infer<typeof teamSchema>;
