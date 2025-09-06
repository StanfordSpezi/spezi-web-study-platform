//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//
import {
  Button,
  Field,
  Input,
  Label,
  useForm,
} from "@stanfordspezi/spezi-web-design-system";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { z } from "zod";
import { Card } from "@/components/ui/Card";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { IconPicker } from "@/components/ui/IconPicker";
import { useCreateTeamMutation } from "@/lib/queries/team";
import { OnboardingTitleGroup } from "./components/OnboardingTitleGroup";

const formSchema = z.object({
  icon: z.string().min(1, { message: "Icon is required" }),
  name: z.string().min(1, { message: "Name is required" }),
});

const CreateTeamRoute = () => {
  const navigate = useNavigate();
  const { mutateAsync: createTeam } = useCreateTeamMutation();
  const form = useForm({
    formSchema,
    defaultValues: { icon: "tree-pine", name: "" },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const { id } = await createTeam({ ...data });
    await navigate({
      from: "/onboarding",
      to: "/onboarding/invite",
      search: { team: id },
    });
  });

  return (
    <>
      <OnboardingTitleGroup
        title="Create your first team"
        description="Teams are shared spaces where you and your colleagues can design and run studies together."
      />
      <form
        onSubmit={handleSubmit}
        className="flex-center w-full max-w-xl flex-col gap-10"
      >
        <Card className="p-8 pb-2">
          <Label className="mb-2 flex">
            <FieldLabel title="Team icon & name" />
          </Label>
          <div className="flex gap-4">
            <Field
              control={form.control}
              name="icon"
              render={({ field: { value, onChange, ...field } }) => (
                <IconPicker
                  value={value as IconName}
                  onValueChange={onChange}
                  {...field}
                >
                  <Button
                    size={null}
                    variant="outline"
                    className="bg-bg size-10 rounded-md"
                  >
                    <DynamicIcon name={value as IconName} className="size-4" />
                  </Button>
                </IconPicker>
              )}
            />
            <Field
              control={form.control}
              name="name"
              className="flex-1"
              render={({ field: { onChange, value, ...field } }) => (
                <Input
                  placeholder="Enter team name"
                  value={value}
                  onChange={onChange}
                  {...field}
                />
              )}
            />
          </div>
        </Card>
        <Button type="submit">Create team</Button>
      </form>
    </>
  );
};

export const Route = createFileRoute("/(dashboard)/onboarding/")({
  component: CreateTeamRoute,
});
