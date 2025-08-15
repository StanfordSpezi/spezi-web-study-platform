//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { getDevDatabase } from "@/server/database";
import { respondWithError } from "@/server/error";
import { type AppRouteHandler } from "@/server/utils";
import type { RetrieveRoute } from "./routes";

export const retrieve: AppRouteHandler<RetrieveRoute> = (c) => {
  const param = c.req.valid("param");
  const user = c.get("user");

  const db = getDevDatabase();

  const userEntity = db.users.find((user) => user.id === param.id);
  if (!userEntity) {
    if (user.role === "admin") {
      return respondWithError(c, 404, {
        message: `User with id ${param.id} not found.`,
      });
    }

    // We want to return a different error for users, to not leak information
    // whether a particular user id exists
    return respondWithError(c, 403, {
      message: `You do not have access to view this user.`,
    });
  }

  if (user.role === "admin") {
    return c.json(userEntity, 200);
  }

  if (user.id !== userEntity.id) {
    return respondWithError(c, 403, {
      message: `You do not have access to view this user.`,
    });
  }

  return c.json(userEntity, 200);
};
