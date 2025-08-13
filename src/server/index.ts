//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Scalar } from "@scalar/hono-api-reference";
import { HTTPException } from "hono/http-exception";
import { dedent } from "@/utils/dedent";
import { studiesApi } from "./api/studies";
import { teamsApi } from "./api/teams";
import { usersApi } from "./api/users";
import { respondWithError } from "./error";
import { authMiddleware } from "./middleware";
import { openApiTags } from "./tags";
import { createHonoApp, getPortFromArgs } from "./utils";

const app = createHonoApp();

app.use("/api/*", authMiddleware);

const routers = [studiesApi.router, teamsApi.router, usersApi.router] as const;
routers.forEach((route) => {
  app.route("/api", route);
});

app.openAPIRegistry.registerComponent("securitySchemes", "basicAuth", {
  type: "http",
  scheme: "basic",
});

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Spezi Study Platform API",
    description: dedent`
      REST API for the Stanford Biodesign Digital Health Spezi Web Study Platform.
      
      This API provides endpoints for managing research studies, including study configuration, team management, and user administration.
      
      ## Authentication
      
      The API uses HTTP Basic Authentication. All endpoints except documentation require valid credentials.
      
      ## Related Projects
      
      - [Frontend Repository](https://github.com/StanfordSpezi/spezi-web-study-platform)
      - [Backend Services](https://github.com/StanfordSpezi/spezi-web-service-study-platform)
    `,
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  security: [{ basicAuth: [] }],
  tags: Object.values(openApiTags),
});

app.use(
  "/favicon.png",
  serveStatic({ path: "./src/assets/server-favicon.png" }),
);
app.get(
  "/scalar",
  Scalar({
    url: "/doc",
    title: "Spezi Study Platform API",
    metaData: { title: "Spezi Study Platform API" },
    favicon: "/favicon.png",
    authentication: {
      preferredSecurityScheme: "basicAuth",
      securitySchemes: {
        basicAuth: {
          type: "http",
          scheme: "basic",
        },
      },
    },
    persistAuth: true,
    hideClientButton: true,
  }),
);

// Make sure the errors always have the same format
app.onError(async (error, c) => {
  if (error instanceof HTTPException) {
    const response = error.getResponse();
    const message = await response.text();
    return respondWithError(c, error.status, {
      message,
    });
  }
  return respondWithError(c, 500, {
    message: error.message,
  });
});

const port = getPortFromArgs();
console.log(`Scalar is running on http://localhost:${port}/scalar`);

serve({ fetch: app.fetch, port });
