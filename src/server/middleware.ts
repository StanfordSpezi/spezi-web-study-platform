//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { basicAuth } from "hono/basic-auth";
import { every } from "hono/combine";
import { createMiddleware } from "hono/factory";
import { userFixtures } from "./database/entities/user/fixtures";
import { respondWithError } from "./error";
import { type HonoAppVariables } from "./utils";

/**
 * Middleware for authenticating requests using Basic Auth and setting the authenticated user in the context.
 */
export const authMiddleware = every(
  basicAuth(
    {
      username: userFixtures[0].username,
      password: userFixtures[0].password,
      invalidUserMessage: "Invalid username or password",
    },
    ...userFixtures.slice(1).map((user) => ({
      username: user.username,
      password: user.password,
    })),
  ),
  // By default, basicAuth is not setting the user in the context
  // So we need to create a custom middleware to do this
  createMiddleware<{ Variables: HonoAppVariables }>(async (c, next) => {
    const authHeader = c.req.header("authorization");
    if (!authHeader) {
      return respondWithError(c, 401, {
        message:
          "Missing authorization header. Add 'Authorization: Basic <credentials>' to your request.",
      });
    }

    const base64Credentials = authHeader.split(" ").at(1);
    if (!base64Credentials) {
      return respondWithError(c, 401, {
        message:
          "Invalid authorization header format. Use 'Authorization: Basic <credentials>'",
      });
    }

    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "utf-8",
    );
    const [username] = credentials.split(":");

    const user = userFixtures.find((user) => user.username === username);
    if (!user) {
      return respondWithError(c, 401, {
        message: "Invalid username or password",
      });
    }

    c.set("user", user);
    await next();
  }),
);
