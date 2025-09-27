//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { Page } from "@playwright/test";
import { componentsApi } from "@/server/api/components";
import { componentFixtures } from "@/server/database/entities/component/fixtures";
import type { Component } from "@/server/database/entities/component/schema";
import { mockApiRoute } from "@/utils/mockApiRoute";

export const mockComponentsRoutes = async (page: Page) => {
  const components: Component[] = structuredClone(componentFixtures);

  await mockApiRoute(page, {
    route: componentsApi.routes.listForStudy,
    response: ({ params }) => {
      const { studyId } = params;
      const items = components.filter(
        (component) => component.studyId === studyId,
      );
      return { status: 200, body: items };
    },
  });

  await mockApiRoute(page, {
    route: componentsApi.routes.createForStudy,
    response: ({ params, body }) => {
      const { studyId } = params;
      const newComp: Component = {
        id: "new-comp-id",
        studyId,
        ...body,
      } as Component;
      components.push(newComp);
      return { status: 201, body: newComp };
    },
  });

  await mockApiRoute(page, {
    route: componentsApi.routes.retrieve,
    response: ({ params }) => {
      const { id } = params;
      const item = components.find((component) => component.id === id);
      if (!item) return { status: 404, body: { message: "Not found" } };
      return { status: 200, body: item };
    },
  });

  await mockApiRoute(page, {
    route: componentsApi.routes.update,
    response: ({ params, body }) => {
      const { id } = params;
      const index = components.findIndex((component) => component.id === id);
      if (index === -1) return { status: 404, body: { message: "Not found" } };
      const updated = { ...components[index], ...body } as Component;
      components[index] = updated;
      return { status: 200, body: updated };
    },
  });

  await mockApiRoute(page, {
    route: componentsApi.routes.remove,
    response: ({ params }) => {
      const { id } = params;
      const index = components.findIndex((component) => component.id === id);
      if (index === -1) return { status: 404, body: { message: "Not found" } };
      components.splice(index, 1);
      return { status: 204, body: undefined };
    },
  });

  await page.route(`http://localhost:3001/api/components/_clear`, (route) => {
    const url = new URL(route.request().url());
    if (url.pathname.endsWith("/_clear")) {
      components.length = 0;
      return route.fulfill({ status: 200 });
    }
    return route.continue();
  });
};
