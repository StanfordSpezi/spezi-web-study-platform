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
  const query = c.req.valid("query");
  const user = c.get("user");

  const db = getDevDatabase();

  let selectedStudies = db.studies;
  if (query.team_id) {
    selectedStudies = selectedStudies.filter(
      (study) => study.teamId === query.team_id,
    );
  }

  if (user.role === "admin") {
    return c.json(selectedStudies, 200);
  }

  const filteredStudies = selectedStudies.filter((study) =>
    user.teamIds?.includes(study.teamId),
  );

  return c.json(filteredStudies, 200);
};

export const retrieve: AppRouteHandler<RetrieveRoute> = (c) => {
  const param = c.req.valid("param");
  const user = c.get("user");

  const db = getDevDatabase();

  const study = db.studies.find((study) => study.id === param.id);
  if (!study) {
    return respondWithError(c, 404, {
      message: `Study with id ${param.id} not found. Make sure it exists and ${user.id} has access to it.`,
    });
  }

  if (user.role === "admin") {
    return c.json(study, 200);
  }

  const isMember = user.teamIds?.includes(study.teamId);
  if (!isMember) {
    return respondWithError(c, 404, {
      message: `Study with id ${param.id} not found. Make sure it exists and ${user.id} has access to it.`,
    });
  }

  return c.json(study, 200);
};
