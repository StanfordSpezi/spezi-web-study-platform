//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { parseArgs } from "node:util";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Scalar } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { dedent } from "@/utils/dedent";
import { authApi } from "./api/auth";
import { studiesApi } from "./api/studies";
import { teamsApi } from "./api/teams";
import { usersApi } from "./api/users";
import { respondWithError } from "./error";
import { authMiddleware } from "./middleware";
import { openApiTags } from "./tags";
import { createHonoApp } from "./utils";

const app = createHonoApp();

app.use(
  "/api/*",
  cors({
    origin: ["http://localhost:3000"], // We only need to point to the local frontend origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

// We're putting the auth routes first to make sure they are not passed
// through the auth middleware
app.route("/api", authApi.router);

app.use("/api/*", authMiddleware);

// These routes require authentication
const routers = [studiesApi.router, teamsApi.router, usersApi.router] as const;
routers.forEach((router) => {
  app.route("/api", router);
});

app.openAPIRegistry.registerComponent("securitySchemes", "cookieAuth", {
  type: "apiKey",
  in: "cookie",
  scheme: "spezi.session_token",
  description: "httpOnly session cookie",
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

      The OpenAPI specification requires authentication via a session cookie.\\
      \\      
      For this development server, you can omit the cookie and just hit the [sign-in endpoint](#tag/authentication/post/api/auth/sign-in/email) or add a \`currentUser\` to \`src/server/database/db.json\`.
      The development server handles the sign-in state using the development database.

      ## Related Projects
      
      - [Frontend Repository](https://github.com/StanfordSpezi/spezi-web-study-platform)
      - [Backend Services](https://github.com/StanfordSpezi/spezi-web-service-study-platform)
    `,
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  security: [{ cookieAuth: [] }],
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
      preferredSecurityScheme: "cookieAuth",
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          scheme: "spezi.session_token",
          description: "httpOnly session cookie",
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

const args = parseArgs({
  options: { port: { type: "string", default: "3001" } },
});
const port = parseInt(args.values.port);
console.log(`Scalar is running on http://localhost:${port}/scalar`);

serve({ fetch: app.fetch, port });
