//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  OpenAPIHono,
  z,
  type RouteConfig,
  type RouteHandler,
} from "@hono/zod-openapi";
import type { User } from "./database/entities/user/schema";
import { respondWithError } from "./error";

export interface HonoAppVariables {
  user: User;
}

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  { Variables: HonoAppVariables }
>;

/**
 * Creates a new instance of `OpenAPIHono` configured with custom variables
 * and hooks.
 */
export const createHonoApp = () =>
  new OpenAPIHono<{ Variables: HonoAppVariables }>({
    defaultHook: (result, c) => {
      if (!result.success) {
        return respondWithError(c, 400, {
          code: "invalid_request",
          message: z.prettifyError(result.error),
        });
      }
    },
  });

/**
 * Retrieves the port number from the command-line arguments.
 *
 * Searches for an argument in the format `--port=<number>` or `--port <number>`.
 * If found, parses and returns the port number.
 * If not found or if the value is not a valid number, returns the default port `3001`.
 */
export const getPortFromArgs = (): number => {
  const defaultPort = 3001;
  const args = process.argv;
  const portEqArg = args.find((arg) => arg.startsWith("--port="));
  if (portEqArg) {
    const portValue = portEqArg.split("=")[1];
    const parsedPort = Number(portValue);
    return isNaN(parsedPort) ? defaultPort : parsedPort;
  }
  const portFlagIndex = args.findIndex((arg) => arg === "--port");
  if (portFlagIndex !== -1 && args[portFlagIndex + 1]) {
    const parsedPort = Number(args[portFlagIndex + 1]);
    return isNaN(parsedPort) ? defaultPort : parsedPort;
  }
  return defaultPort;
};
