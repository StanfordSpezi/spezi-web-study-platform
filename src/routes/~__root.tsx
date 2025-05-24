//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
} from "@tanstack/react-router";

const RootComponent = () => {
  return (
    <>
      <HeadContent />
      <div className="grid h-svh grid-rows-[1fr]">
        <Outlet />
      </div>
    </>
  );
};

export const Route = createRootRouteWithContext()({
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
