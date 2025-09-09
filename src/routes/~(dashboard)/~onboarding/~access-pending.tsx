//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button } from "@stanfordspezi/spezi-web-design-system";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SearchX } from "lucide-react";
import { FeaturedIconContainer } from "@/components/ui/FeaturedIconContainer";
import { authClient } from "@/lib/authClient";

export const AccessPendingRoute = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authClient.signOut();
    queryClient.clear();
    await navigate({ to: "/sign-in" });
  };

  return (
    <div className="flex-center max-w-lg flex-col gap-6 text-center">
      <FeaturedIconContainer>
        <div className="bg-bg flex-center size-full inset-shadow-sm">
          <SearchX className="opacity-80" />
        </div>
      </FeaturedIconContainer>
      <div className="flex-center flex-col gap-2">
        <h1 className="text-text max-w-48 text-lg/tight font-medium text-balance">
          You're not on a team
        </h1>
        <p>
          You don't have access to any teams yet. Contact the person who invited
          you or your organization's administrator to get started.
        </p>
      </div>
      <Button variant="outline" onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
};

export const Route = createFileRoute("/(dashboard)/onboarding/access-pending")({
  component: AccessPendingRoute,
});
