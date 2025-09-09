//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { getDevDatabase, setDevDatabase } from "@/server/database";
import type { Study } from "@/server/database/entities/study/schema";
import { respondWithError } from "@/server/error";
import { type AppRouteHandler } from "@/server/utils";
import type {
  CreateRoute,
  ListRoute,
  RetrieveRoute,
  UpdateRoute,
} from "./routes";

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

export const create: AppRouteHandler<CreateRoute> = (c) => {
  const body = c.req.valid("json");

  const db = getDevDatabase();

  const titleExists = db.studies.some(
    (study) =>
      study.title.toLowerCase().trim() === body.title.toLowerCase().trim(),
  );
  if (titleExists) {
    return respondWithError(c, 409, {
      message: `A study with title ${body.title} already exists.`,
    });
  }

  const newStudy: Study = {
    id: `study_${Date.now()}`,
    ...body,
  };

  const newStudies = [...db.studies, newStudy];
  setDevDatabase({ studies: newStudies });

  return c.json(newStudy, 201);
};

export const update: AppRouteHandler<UpdateRoute> = (c) => {
  const param = c.req.valid("param");
  const body = c.req.valid("json");
  const user = c.get("user");

  const db = getDevDatabase();

  const study = db.studies.find((study) => study.id === param.id);
  if (!study) {
    return respondWithError(c, 404, {
      message: `Study with id ${param.id} not found. Make sure it exists and ${user.id} has access to it.`,
    });
  }

  const updateStudies = () => {
    const updatedStudy = { ...study, ...body };
    const newStudies = db.studies.map((study) =>
      study.id === param.id ? updatedStudy : study,
    );
    setDevDatabase({ studies: newStudies });
    return updatedStudy;
  };

  if (user.role === "admin") {
    const updatedStudy = updateStudies();
    return c.json(updatedStudy, 200);
  }

  const isMember = user.teamIds?.includes(study.teamId);
  if (!isMember) {
    return respondWithError(c, 404, {
      message: `Study with id ${param.id} not found. Make sure it exists and ${user.id} has access to it.`,
    });
  }

  const updatedStudy = updateStudies();
  return c.json(updatedStudy, 200);
};
