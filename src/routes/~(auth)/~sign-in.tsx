//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button, toast } from "@stanfordspezi/spezi-web-design-system";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { BrandIconGroup } from "@/components/interfaces/BrandIconGroup";
import { authClient } from "@/lib/authClient";
import { userFixtures } from "@/server/database/entities/user/fixtures";

const SignInRoute = () => {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  const handleSignIn = async () => {
    const user =
      userFixtures.find(({ role }) => role === "admin") ?? userFixtures[0];
    const { error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (error) {
      toast.error(error.message, { duration: 5000 });
      return;
    }

    await navigate({ to: search.redirect ?? "/" });
  };

  return (
    <div className="flex-center relative size-full flex-col gap-10 p-4">
      <div className="bg-dots absolute inset-0 -z-10" />
      <div className="bg-bg absolute inset-0 -z-10 mask-radial-from-10% mask-radial-to-140%" />
      <BrandIconGroup />
      <div className="flex-center flex-col gap-6">
        <h1 className="text-text max-w-48 text-center text-xl/snug font-medium text-balance">
          Welcome to the Spezi Study Platform
        </h1>
        <p className="text-text-secondary max-w-96 text-center text-balance">
          Create, manage, and analyze research studies together with your team.
        </p>
      </div>
      <Button onClick={handleSignIn} size="lg" variant="outline">
        Sign into the dashboard
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-text-tertiary text-sm"
        asChild
      >
        <a href="https://github.com/StanfordSpezi/spezi-web-study-platform/issues">
          Trouble signing in?
        </a>
      </Button>
    </div>
  );
};

export const Route = createFileRoute("/(auth)/sign-in")({
  component: SignInRoute,
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  beforeLoad: async ({ search }) => {
    // Check if the user is already authenticated
    // if so, redirect them to the specified path or home
    const { data, error } = await authClient.getSession();

    if (error && error.status !== 401) {
      throw new Error(error.message);
    }
    if (data?.session) {
      // User is authenticated, redirect them to the specified path or home
      return redirect({ to: search.redirect ?? "/" });
    }
  },
});
