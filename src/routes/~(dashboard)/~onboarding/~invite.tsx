//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button, Label } from "@stanfordspezi/spezi-web-design-system";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { z } from "zod";
import { Card } from "@/components/ui/Card";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { cn } from "@/utils/cn";
import { createLinkOptions } from "@/utils/createLinkOptions";
import { InvitationRow } from "./components/InvitationRow";
import { OnboardingTitleGroup } from "./components/OnboardingTitleGroup";
import { useInvitationForm } from "./lib/useInvitationForm";

const InviteTeamRoute = () => {
  const searchParams = Route.useSearch();
  const navigate = useNavigate();

  const linkOptions =
    searchParams.team ?
      createLinkOptions({
        from: "/onboarding/invite",
        to: "/$team",
        params: { team: searchParams.team },
      })
      // Fallback to the root route. This will pick the first available team for the user.
    : createLinkOptions({
        from: "/onboarding/invite",
        to: "/",
      });

  const { form, defaultInvitation } = useInvitationForm();
  const formValues = form.watch();

  const addInvitation = () => {
    form.setValue("invitations", [
      ...formValues.invitations,
      defaultInvitation,
    ]);
  };

  const submit = form.handleSubmit(async (data) => {
    // Here we would typically send the invitations to your server
    // For now, we just log them to the console
    console.log("Invitations to send:", data.invitations);
    await navigate(linkOptions);
  });

  return (
    <div className="flex size-full flex-col">
      <div
        className={cn(
          // We "undo" the center layout and fake it with the margin-top so there is
          // no layout shift when the user adds more invitations.
          "[--default-height:34rem]",
          "mt-[calc((100vh-var(--default-height))/2+var(--layout-padding))]",
          "min-h-(--default-height)",
          "flex flex-col items-center gap-10",
        )}
      >
        <OnboardingTitleGroup
          title="Invite teammates"
          description="Invite co-workers to join the team. Invitations will be valid for 14 days."
        />
        <div className="flex-center w-full max-w-xl flex-col gap-10">
          <Card className="p-8 pb-2">
            <Label className="mb-2 flex">
              <FieldLabel title="Emails" />
            </Label>
            <ul className="flex flex-col">
              {formValues.invitations.map((_, index) => (
                <InvitationRow key={index} index={index} form={form} />
              ))}
            </ul>
            <div className="py-4">
              <Button variant="outline" size="xs" onClick={addInvitation}>
                <Plus className="size-2.5" />
                Add another
              </Button>
            </div>
          </Card>
          <div className="flex-center flex-col gap-4">
            <Button onClick={submit}>Invite team members</Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-text-tertiary text-sm"
              asChild
            >
              <Link {...linkOptions}>I'll do this later</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/(dashboard)/onboarding/invite")({
  component: InviteTeamRoute,
  validateSearch: z.object({
    team: z.string().optional(),
  }),
});
