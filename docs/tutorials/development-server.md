<!--

This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# Run and explore the development server

In this tutorial, we will run the dev server, sign in, view our session and user via the interactive API reference, list studies with authorization applied, and know how to reset the environment safely.

## 1. Start the UI and dev API server

We start both processes in one command so we can verify the full path end to end.

```bash
nvm use 22 || nvm install 22
npm install
npm run dev:server
```

You should see output similar to:

```
Scalar is running on http://localhost:3001/scalar
```

## 2. Open the API reference

Open the interactive docs at: http://localhost:3001/scalar

You should see the title “Spezi Study Platform API” and a list of endpoints grouped by tags.

If you get a 404 or the page does not load, confirm `npm run dev` is still running and that you can reach http://localhost:3001/doc as plain JSON.

## 3. Inspect the local data

All development data lives in a JSON file. We can inspect it at any time.

```bash
head -n 40 src/server/database/db.json
```

## 4. Sign in from the API reference

In the docs UI, open the “Authentication” section and choose `POST /api/auth/sign-in/email`.

Click "Test Request" to open the request modal. The default request body will already be populated with valid user credentials. Execute the request.

Expected: a 200 response with `user` and `token`. The server also stores the signed-in user in the development database.

Failure signs: 400 for invalid email, 401 for wrong password. Inspect the `users` array in your local development database and make sure that the email and password match the user you are trying to sign in as.

## 5. Verify the session and current user

Still in the docs UI, call `GET /api/auth/get-session`. You should receive a `session` and a `user` object. Then call `GET /api/users/me` to retrieve the current user. The `id` and `email` should match the user you signed in as.

What to notice: subsequent requests are now authorized because the dev server recognizes the current user.

## 6. List studies with authorization applied

Call `GET /api/studies`. If you signed in as an admin user, you will see all studies. If you signed in as a non-admin, you will see only studies for your teams.

Variation: sign out with `POST /api/auth/sign-out`, then sign in as a different user from `db.json` and repeat the request to observe filtered results.

## 7. Optional command line checks

You can also call the dev API directly. This development server does not require special cookies or authentication headers.

```bash
curl -s http://localhost:3001/api/auth/get-session | jq '.user.email'
```

Expected: the email of the user you signed in as. If you see `null`, sign in again from the docs UI and retry.

## 8. Clean up or start over

To sign out only:

```bash
curl -s -X POST http://localhost:3001/api/auth/sign-out | jq
```

To fully reset data back to fixtures:

```bash
rm -f src/server/database/db.json
```

Issue a new request once you have removed the file. The server will recreate `db.json` with the default data.

## What we built

We ran the dev API, signed in, verified our session and profile, and listed studies with authorization in effect. We also learned how to reset local state safely.

Read more about the development server and why we built it in the [development server explanation](../explanations/development-server.md).
