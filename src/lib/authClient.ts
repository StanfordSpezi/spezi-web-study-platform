//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createAuthClient } from "better-auth/react";
import { joinUrlPaths } from "@/utils/joinUrlPaths";
import { env } from "./env";

export const authClient = createAuthClient({
  baseURL: joinUrlPaths(env.VITE_API_BASE_PATH, "/auth"),
});
