//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { getDevDatabase, setDevDatabase } from "@/server/database";
import type { Team } from "@/server/database/entities/team/schema";
import { respondWithError } from "@/server/error";
import { type AppRouteHandler } from "@/server/utils";
import type { CreateRoute, ListRoute, RetrieveRoute } from "./routes";

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

export const create: AppRouteHandler<CreateRoute> = (c) => {
  const body = c.req.valid("json");
  const user = c.get("user");

  if (user.role !== "admin") {
    return respondWithError(c, 403, {
      message: "Insufficient permissions to create teams",
    });
  }

  const db = getDevDatabase();

  if (db.teams.some((team) => team.name === body.name)) {
    return respondWithError(c, 409, {
      message: `Team with name ${body.name} already exists.`,
    });
  }

  const newTeam: Team = {
    id: `team_${Date.now()}`,
    ...body,
  };

  const newTeams = [...db.teams, newTeam];
  setDevDatabase({ teams: newTeams });

  // No need to add the team to the user's teamIds, as this is an admin action.

  return c.json(newTeam, 201);
};
