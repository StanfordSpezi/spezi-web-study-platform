//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { getDevDatabase, setDevDatabase } from "@/server/database";
import { respondWithError } from "@/server/error";
import { type AppRouteHandler } from "@/server/utils";
import type { GetSessionRoute, SignInRoute, SignOutRoute } from "./routes";

export const signIn: AppRouteHandler<SignInRoute> = (c) => {
  const { email, password } = c.req.valid("json");
  const db = getDevDatabase();

  const user = db.users.find((user) => user.email === email);
  if (!user) {
    return respondWithError(c, 400, {
      code: "INVALID_EMAIL",
      message: "Invalid email",
    });
  }

  if (user.password !== password) {
    return respondWithError(c, 401, {
      code: "INVALID_EMAIL_OR_PASSWORD",
      message: "Invalid email or password",
    });
  }

  setDevDatabase({ currentUser: user });

  return c.json(
    {
      redirect: false,
      token: "dev-server-token",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.imageUrl ?? null,
        emailVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
    200,
  );
};

export const getSession: AppRouteHandler<GetSessionRoute> = (c) => {
  const db = getDevDatabase();
  const user = db.currentUser;
  if (!user) {
    return c.json(null, 200);
  }
  return c.json(
    {
      session: {
        id: "dev-session-id",
        expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        token: "dev-session-token",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ipAddress: "192.168.1.1",
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        userId: user.id,
      },
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        image: user.imageUrl ?? null,
        emailVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
    200,
  );
};

export const signOut: AppRouteHandler<SignOutRoute> = (c) => {
  setDevDatabase({ currentUser: null });
  return c.json({ success: true }, 200);
};
