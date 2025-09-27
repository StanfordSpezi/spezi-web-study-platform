//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { getDevDatabase, setDevDatabase } from "@/server/database";
import type { Component } from "@/server/database/entities/component/schema";
import { respondWithError } from "@/server/error";
import { type AppRouteHandler } from "@/server/utils";
import type {
  CreateForStudyRoute,
  DeleteRoute,
  ListForStudyRoute,
  RetrieveRoute,
  UpdateRoute,
} from "./routes";

export const listForStudy: AppRouteHandler<ListForStudyRoute> = (c) => {
  const param = c.req.valid("param");
  const user = c.get("user");

  const db = getDevDatabase();

  const study = db.studies.find((study) => study.id === param.studyId);
  if (!study) {
    return respondWithError(c, 404, {
      message: `Study with id ${param.studyId} not found. Make sure it exists and ${user.id} has access to it.`,
    });
  }

  if (user.role !== "admin" && !user.teamIds?.includes(study.teamId)) {
    return respondWithError(c, 404, {
      message: `Study with id ${param.studyId} not found. Make sure it exists and ${user.id} has access to it.`,
    });
  }

  const items = db.components.filter(
    (component) => component.studyId === param.studyId,
  );
  return c.json(items, 200);
};

export const createForStudy: AppRouteHandler<CreateForStudyRoute> = (c) => {
  const param = c.req.valid("param");
  const body = c.req.valid("json");
  const user = c.get("user");

  const db = getDevDatabase();
  const study = db.studies.find((study) => study.id === param.studyId);
  if (!study) {
    return respondWithError(c, 404, {
      message: `Study with id ${param.studyId} not found. Make sure it exists and ${user.id} has access to it.`,
    });
  }

  if (user.role !== "admin" && !user.teamIds?.includes(study.teamId)) {
    return respondWithError(c, 404, {
      message: `Study with id ${param.studyId} not found. Make sure it exists and ${user.id} has access to it.`,
    });
  }

  const newComponent: Component = {
    id: `comp_${Date.now()}`,
    studyId: param.studyId,
    ...body,
  };

  const newComponents = [...db.components, newComponent];
  setDevDatabase({ components: newComponents });

  return c.json(newComponent, 201);
};

export const retrieve: AppRouteHandler<RetrieveRoute> = (c) => {
  const param = c.req.valid("param");
  const user = c.get("user");

  const db = getDevDatabase();
  const component = db.components.find(
    (component) => component.id === param.id,
  );
  if (!component) {
    return respondWithError(c, 404, {
      message: `Component with id ${param.id} not found.`,
    });
  }

  const study = db.studies.find((study) => study.id === component.studyId);
  if (!study) {
    return respondWithError(c, 404, {
      message: `Study with id ${component.studyId} not found. Make sure it exists and ${user.id} has access to it.`,
    });
  }

  if (user.role !== "admin" && !user.teamIds?.includes(study.teamId)) {
    return respondWithError(c, 404, {
      message: `Component with id ${param.id} not found.`,
    });
  }

  return c.json(component, 200);
};

export const update: AppRouteHandler<UpdateRoute> = (c) => {
  const param = c.req.valid("param");
  const body = c.req.valid("json");
  const user = c.get("user");

  const db = getDevDatabase();
  const component = db.components.find(
    (component) => component.id === param.id,
  );
  if (!component) {
    return respondWithError(c, 404, {
      message: `Component with id ${param.id} not found.`,
    });
  }

  const study = db.studies.find((study) => study.id === component.studyId);
  if (!study) {
    return respondWithError(c, 404, {
      message: `Study with id ${component.studyId} not found. Make sure it exists and ${user.id} has access to it.`,
    });
  }

  if (user.role !== "admin" && !user.teamIds?.includes(study.teamId)) {
    return respondWithError(c, 404, {
      message: `Component with id ${param.id} not found.`,
    });
  }

  const updated = {
    ...component,
    ...body,
    // Enforce immutable fields
    id: component.id,
    studyId: component.studyId,
    type: component.type,
  } as Component;
  const newComponents = db.components.map((component) =>
    component.id === param.id ? updated : component,
  );
  setDevDatabase({ components: newComponents });

  return c.json(updated, 200);
};

export const remove: AppRouteHandler<DeleteRoute> = (c) => {
  const param = c.req.valid("param");
  const user = c.get("user");

  const db = getDevDatabase();
  const component = db.components.find(
    (component) => component.id === param.id,
  );
  if (!component) {
    return respondWithError(c, 404, {
      message: `Component with id ${param.id} not found.`,
    });
  }

  const study = db.studies.find((study) => study.id === component.studyId);
  if (!study) {
    return respondWithError(c, 404, {
      message: `Study with id ${component.studyId} not found. Make sure it exists and ${user.id} has access to it.`,
    });
  }

  if (user.role !== "admin" && !user.teamIds?.includes(study.teamId)) {
    return respondWithError(c, 404, {
      message: `Component with id ${param.id} not found.`,
    });
  }

  const newComponents = db.components.filter(
    (component) => component.id !== param.id,
  );
  setDevDatabase({ components: newComponents });

  return c.body(null, 204);
};
