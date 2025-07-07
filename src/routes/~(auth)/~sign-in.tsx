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
import speziImage from "@/assets/spezi.webp";
import stanfordImage from "@/assets/stanford.webp";
import { FeaturedIconContainer } from "@/components/ui/FeaturedIconContainer";
import { mockApi } from "@/lib/mockApi";
import { currentUserRetrieveQueryOptions } from "@/lib/queries/currentUser";

const SignInComponent = () => {
  const queryClient = useQueryClient();
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  const handleSignIn = async () => {
    mockApi.auth.signIn();
    await queryClient.invalidateQueries(currentUserRetrieveQueryOptions());
    await navigate({ to: search.redirect ?? "/" });
  };

  return (
    <div className="flex-center relative isolate size-full flex-col gap-10">
      <div className="bg-dots absolute inset-0 -z-10" />
      <div className="bg-bg absolute inset-0 -z-10 mask-radial-from-10% mask-radial-to-140%" />
      <div className="flex -space-x-2">
        <FeaturedIconContainer className="translate-y-1 -rotate-12">
          <div className="flex-center size-full inset-shadow-sm">
            {/* Compensate the round Spezi Image */}
            <img src={speziImage} alt="Spezi Logo" className="scale-125" />
          </div>
        </FeaturedIconContainer>
        <FeaturedIconContainer className="z-10">
          <div className="flex-center bg-brand-500 text-brand-50 size-full inset-shadow-sm">
            <div className="scale-y-110 font-serif text-2xl font-semibold text-shadow-xs">
              S
            </div>
          </div>
        </FeaturedIconContainer>
        <FeaturedIconContainer className="translate-y-1 rotate-12">
          <div className="flex-center bg-bg size-full inset-shadow-sm">
            <img src={stanfordImage} alt="Stanford Logo" />
          </div>
        </FeaturedIconContainer>
      </div>
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
