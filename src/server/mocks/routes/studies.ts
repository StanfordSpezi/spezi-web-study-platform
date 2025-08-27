//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { Page } from "@playwright/test";
import { studiesApi } from "@/server/api/studies";
import { studyFixtures } from "@/server/database/entities/study/fixtures";
import type { Study } from "@/server/database/entities/study/schema";
import { mockApiRoute } from "@/utils/mockApiRoute";

export const mockStudiesRoutes = async (page: Page) => {
  // Keep a local, mutable copy so updates persist across requests within a test run
  const studies: Study[] = structuredClone(studyFixtures);

  await mockApiRoute(page, {
    route: studiesApi.routes.list,
    response: ({ query }) => {
      const { team_id } = query;
      const filteredStudies = studies.filter(
        (study) => study.teamId === team_id,
      );
      return { status: 200, body: filteredStudies };
    },
  });

  await mockApiRoute(page, {
    route: studiesApi.routes.retrieve,
    response: ({ params }) => {
      const { id } = params;
      const study = studies.find((study) => study.id === id);
      if (!study) {
        return { status: 404, body: { message: "Not found" } };
      }
      return { status: 200, body: study };
    },
  });

  await mockApiRoute(page, {
    route: studiesApi.routes.update,
    response: ({ params, body }) => {
      const { id } = params;
      const studyIndex = studies.findIndex((study) => study.id === id);
      if (studyIndex === -1) {
        return { status: 404, body: { message: "Not found" } };
      }
      const updatedStudy = { ...studies[studyIndex], ...body };
      studies[studyIndex] = updatedStudy;
      return { status: 200, body: updatedStudy };
    },
  });
};
