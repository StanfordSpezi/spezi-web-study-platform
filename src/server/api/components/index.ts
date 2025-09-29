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
  .openapi(routes.listForStudy, handlers.listForStudy)
  .openapi(routes.createForStudy, handlers.createForStudy)
  .openapi(routes.retrieve, handlers.retrieve)
  .openapi(routes.update, handlers.update)
  .openapi(routes.remove, handlers.remove);

export const componentsApi = {
  router,
  routes,
};
