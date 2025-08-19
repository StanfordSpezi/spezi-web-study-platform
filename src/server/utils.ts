//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  OpenAPIHono,
  z,
  type RouteConfig,
  type RouteHandler,
} from "@hono/zod-openapi";
import type { User } from "./database/entities/user/schema";
import { respondWithError } from "./error";

export interface HonoAppVariables {
  user: User;
}

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  { Variables: HonoAppVariables }
>;

/**
 * Creates a new instance of `OpenAPIHono` configured with custom variables
 * and hooks.
 */
export const createHonoApp = () =>
  new OpenAPIHono<{ Variables: HonoAppVariables }>({
    defaultHook: (result, c) => {
      if (!result.success) {
        return respondWithError(c, 400, {
          code: "invalid_request",
          message: z.prettifyError(result.error),
        });
      }
    },
  });
