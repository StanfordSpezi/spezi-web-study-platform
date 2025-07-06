//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  parseUnknownError,
} from "@stanfordspezi/spezi-web-design-system";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { mockApi } from "@/lib/mockApi";
import { currentUserRetrieveQueryOptions } from "@/lib/queries/currentUser";

const SignInComponent = () => {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const queryClient = useQueryClient();

  const handleSignIn = async () => {
    mockApi.auth.signIn();
    await queryClient.invalidateQueries(currentUserRetrieveQueryOptions());
    await navigate({ to: search.redirect ?? "/" });
  };

  return (
    <div className="flex-center size-full flex-col">
      <h1 className="text-text pb-4 text-lg">Sign into the study platform</h1>
      <Button onClick={handleSignIn}>Sign in</Button>
    </div>
  );
};

export const Route = createFileRoute("/(auth)/sign-in")({
  component: SignInComponent,
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  beforeLoad: async ({ context: { queryClient }, search }) => {
    try {
      // Check if the user is already authenticated
      // if so, redirect them to the specified path or home
      await queryClient.ensureQueryData(currentUserRetrieveQueryOptions());
      return redirect({ to: search.redirect ?? "/" });
    } catch (error) {
      if (parseUnknownError(error) === "Unauthorized") {
        // User is not authenticated, allow the sign-in page to load.
        return;
      }

      throw error;
    }
  },
});
