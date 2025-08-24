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
import { mockApiRoute } from "@/utils/mockApiRoute";

export const mockStudiesRoutes = async (page: Page) => {
  await mockApiRoute(page, {
    route: studiesApi.routes.list,
    response: (request) => {
      const url = new URL(request.url());
      const { team_id } = Object.fromEntries(url.searchParams);
      const filteredStudies = studyFixtures.filter(
        (study) => study.teamId === team_id,
      );
      return { status: 200, body: filteredStudies };
    },
  });

  await mockApiRoute(page, {
    route: studiesApi.routes.retrieve,
    pathParams: ["id"],
    response: (request) => {
      const url = new URL(request.url());
      const studyId = url.pathname.split("/").pop();
      const study = studyFixtures.find((study) => study.id === studyId);
      if (!study) {
        return { status: 404, body: { message: "Not found" } };
      }
      return { status: 200, body: study };
    },
  });
};
