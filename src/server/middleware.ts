//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { every } from "hono/combine";
import { createMiddleware } from "hono/factory";
import { getDevDatabase } from "./database";
import { respondWithError } from "./error";
import { type HonoAppVariables } from "./utils";

/**
 * Middleware to authenticate requests by checking for a current user in the development database.
 *
 * If no user is found, responds with a 401 Unauthorized error.
 * Otherwise, attaches the current user to the context under the "user" key and proceeds to the next middleware.
 *
 * @example
 * app.use("*", authMiddleware);
 */
export const authMiddleware = every(
  createMiddleware<{ Variables: HonoAppVariables }>(async (c, next) => {
    const db = getDevDatabase();
    if (!db.currentUser) {
      return respondWithError(c, 401, {
        message: "Unauthorized",
      });
    }

    c.set("user", db.currentUser);
    await next();
  }),
);
