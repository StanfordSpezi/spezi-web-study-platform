//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { z } from "zod";
import type { Prettify } from "./types";

/**
 * Raw type helper to extract schemas from a route definition.
 * Returns undefined for missing schemas (query, body, or response).
 * Use this internally when you need the raw type structure.
 *
 * @example
 * type RawSchemas = ExtractRouteSchemasRaw<typeof studiesApi.routes.list>;
 */
interface ExtractRouteSchemasRaw<TRoute> {
  Query: TRoute extends { request: { query: infer Q } } ?
    Q extends z.ZodType ?
      z.infer<Q>
    : undefined
  : undefined;

  Body: TRoute extends (
    {
      request: {
        body: { content: { "application/json": { schema: infer B } } };
      };
    }
  ) ?
    B extends z.ZodType ?
      z.infer<B>
    : undefined
  : undefined;

  Response: TRoute extends (
    {
      responses: {
        200: { content: { "application/json": { schema: infer R } } };
      };
    }
  ) ?
    R extends z.ZodType ?
      z.infer<R>
    : undefined
  : undefined;
}

/**
 * Generic type helper to extract schemas from a route definition.
 * Returns undefined for missing schemas (query, body, or response).
 * This is the main type helper you should use for better IDE experience.
 *
 * @example
 * type StudySchemas = ExtractRouteSchemas<typeof studiesApi.routes.list>;
 * // Result: { Query: { teamId?: string }, Body: undefined, Response: Study[] }
 */
export type ExtractRouteSchemas<TRoute> = Prettify<
  ExtractRouteSchemasRaw<TRoute>
>;
