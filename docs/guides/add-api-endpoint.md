<!--

This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# Add a new API endpoint

This guide helps you add a new REST endpoint to the development server and wire up the matching test mocks. You will define the schema, declare the route, implement the handler, register it with OpenAPI, mount it in the app, and provide Playwright mocks so tests stay fast and reliable.

**Warnings**

- Decide whether the endpoint is public or authenticated before you start. Public endpoints must be mounted before the auth middleware, otherwise you will get 401 responses.
- Keep request/response schemas and mocks in sync. Schema mismatches cause 400 validation errors in the server and broken mocks in tests.

## 1. Choose the domain and access

- If the endpoint belongs to an existing domain (e.g. `studies`, `teams`, `users`), add it under `src/server/api/<domain>/`.
- If you need a new domain, create a new folder under `src/server/api/<newdomain>/` and add `schema.ts`, `routes.ts`, `handlers.ts`, and `index.ts`. Also add a tag in `src/server/tags.ts` so the endpoint appears under the right section in the API reference.

## 2. Define request and response schemas

- Open `src/server/api/<domain>/schema.ts`.
- Add Zod schemas for request body, params, or query and for the response shape. Reuse existing schemas where possible.
- Keep field names consistent and add `openapi()` metadata for examples and descriptions.

## 3. Declare the route

- Open `src/server/api/<domain>/routes.ts`.
- Use `createRoute` to declare the path, HTTP method, description, tags, request, and responses.
- Reference your schemas from step 2. For errors, reuse helpers such as `createErrorSchema` or `error404Schema` from `src/server/error.ts`.

## 4. Implement the handler

- Open `src/server/api/<domain>/handlers.ts`.
- Implement an `AppRouteHandler<typeof yourRoute>` that:
  - Reads validated inputs via `c.req.valid("json"|"param"|"query")`.
  - Accesses data with `getDevDatabase()` if needed.
  - Returns data with `c.json(...)`.
  - Uses `respondWithError(c, status, payload)` for errors.

## 5. Register the route with the router

- Open `src/server/api/<domain>/index.ts`.
- Register your route and handler using `.openapi(route, handler)` on the domain router.
- Export the router and routes via the domain’s `index.ts`.

## 6. Mount the router in the app

- Open `src/server/index.ts`.
- If you added a new domain, import its router and add it to the `routers` list (for authenticated routes) or mount it before `authMiddleware` (for public routes).
- Confirm the OpenAPI registry includes the correct tag by checking `src/server/tags.ts`.

## 7. Seed or update fixtures (optional)

- If your handler needs data, add or adjust fixtures under `src/server/database/entities/<entity>/fixtures.ts` and ensure they match the schemas.
- If you need a new collection, extend the database schema in `src/server/database/index.ts` and seed appropriate data.

## 8. Add Playwright mocks for tests

- Create or update `src/server/mocks/routes/<domain>.ts` and add a new `mockApiRoute` for your endpoint.
- Use the exported `routes` from your domain (for example `studiesApi.routes.<name>`) so the mock stays aligned with the path and method.
- Parse `URL` and `searchParams` or `pathParams` as needed, and return a realistic `status` and `body` from fixtures.
- Open `src/server/mocks/index.ts` and add your new mock loader to `loadApiMocks` so tests register it.

## 9. Verify the endpoint end to end

- Start the dev servers with `npm run dev`.
- Open the API reference at `http://localhost:3001/scalar` and find your endpoint under the correct tag.
- Use “Try it out” to send a request and confirm you receive the expected response or error.
- If the server returns 400, check your schemas and the handler’s use of `c.req.valid(...)`. If you get 401, ensure you placed the route on the correct side of the auth middleware and are signed in.

## 10. Check mocks in tests

- Ensure your test setup calls `loadApiMocks(page)` so your new mock is active.
- If the test fails with a network error, confirm your mock was registered for the correct route and that `pathParams` match the route definition.
- If the test asserts on fields that are missing, update either the response schema and handler or the mock to keep them in sync.

## 11. Confirm documentation

- Confirm the endpoint appears under the expected tag with examples in the docs UI.
- If the tag or examples are missing, update `openapi()` metadata on schemas and ensure the correct tag is used on the route.

You now have a working endpoint, documentation in the API reference, and a matching mock for tests. Keep schemas and mocks aligned as the contract evolves.
