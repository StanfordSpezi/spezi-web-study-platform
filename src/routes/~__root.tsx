//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { SpeziProvider } from "@stanfordspezi/spezi-web-design-system";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet,
} from "@tanstack/react-router";
import type { ComponentProps } from "react";

export interface RouterAppContext {
  queryClient: QueryClient;
}

const routerProps: ComponentProps<typeof SpeziProvider>["router"] = {
  Link: ({ href, ...props }) => <Link to={href} {...props} />,
};

const RootComponent = () => {
  return (
    <>
      <HeadContent />
      <SpeziProvider router={routerProps}>
        <div className="grid h-svh grid-rows-[1fr]">
          <Outlet />
        </div>
      </SpeziProvider>
    </>
  );
};

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      { title: "Spezi Study Platform" },
      {
        name: "description",
        content:
          "Spezi Study Platform is a web application that allows users to create and manage studies.",
      },
    ],
    links: [{ rel: "icon", href: "favicon.ico" }],
  }),
});
