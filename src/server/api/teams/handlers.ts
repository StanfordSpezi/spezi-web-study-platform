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
import type { ListRoute, RetrieveRoute } from "./routes";

export const list: AppRouteHandler<ListRoute> = (c) => {
  const user = c.get("user");

  const db = getDevDatabase();

  if (user.role === "admin") {
    return c.json(db.teams, 200);
  }

  const filteredTeams = db.teams.filter((team) =>
    user.teamIds?.includes(team.id),
  );

  return c.json(filteredTeams, 200);
};

export const retrieve: AppRouteHandler<RetrieveRoute> = (c) => {
  const param = c.req.valid("param");
  const user = c.get("user");

  const db = getDevDatabase();

  const team = db.teams.find((team) => team.id === param.id);
  if (!team) {
    return respondWithError(c, 404, {
      message: `Team with id ${param.id} not found. Make sure it exists and ${user.id} has access to it.`,
    });
  }

  if (user.role === "admin") {
    return c.json(team, 200);
  }

  const isMember = user.teamIds?.includes(team.id);
  if (!isMember) {
    return respondWithError(c, 404, {
      message: `Team with id ${param.id} not found. Make sure it exists and ${user.id} has access to it.`,
    });
  }

  return c.json(team, 200);
};
