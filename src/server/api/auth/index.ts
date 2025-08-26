//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createHonoApp } from "@/server/utils";
import * as handlers from "./handlers";
import * as routes from "./routes";

const router = createHonoApp();

router
  .openapi(routes.signIn, handlers.signIn)
  .openapi(routes.getSession, handlers.getSession)
  .openapi(routes.signOut, handlers.signOut);

export const authApi = {
  router,
  routes,
};
