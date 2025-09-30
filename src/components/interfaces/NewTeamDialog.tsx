//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
  useForm,
} from "@stanfordspezi/spezi-web-design-system";
import { ListPlus } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { type ReactNode } from "react";
import { z } from "zod";
import { useCreateTeamMutation } from "@/lib/queries/team";
import type { Team } from "@/server/database/entities/team/schema";
import { FeaturedIconContainer } from "../ui/FeaturedIconContainer";
import { IconPicker } from "../ui/IconPicker";

const formSchema = z.object({
  icon: z.string().min(1, { message: "Icon is required" }),
  name: z.string().min(1, { message: "Name is required" }),
});

interface NewStudyDialogContentProps {
  onSuccess?: (team: Team) => Promise<void> | void;
}

export const NewTeamDialogContent = ({
  onSuccess,
}: NewStudyDialogContentProps) => {
  const createTeam = useCreateTeamMutation();
  const form = useForm({
    formSchema,
    defaultValues: { icon: "tree-pine", name: "" },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const team = await createTeam.mutateAsync(data);
    await onSuccess?.(team);
  });

  return (
    <DialogContent className="max-w-md">
      <form onSubmit={handleSubmit}>
        <DialogHeader className="items-center sm:items-start">
          <FeaturedIconContainer className="border-border-tertiary mb-4 size-8 rounded-lg shadow-xs">
            <div className="grid size-full place-items-center">
              <ListPlus className="text-text-tertiary size-4 opacity-80" />
            </div>
          </FeaturedIconContainer>
          <DialogTitle>Create a new team</DialogTitle>
          <DialogDescription>
            Teams are shared spaces where you and your colleagues can design and
            run studies together
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 pt-4">
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
                  <DynamicIcon
                    name={value as IconName}
                    className="size-4 opacity-80"
                  />
                </Button>
              </IconPicker>
            )}
          />
          <Field
            control={form.control}
            name="name"
            className="flex-1"
            render={({ field: { ...field } }) => (
              <Input placeholder="Enter team name" {...field} />
            )}
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            variant="default"
            size="sm"
            isPending={createTeam.isPending}
          >
            Create team
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

interface NewTeamDialogProps {
  children: ReactNode;
}

export const NewTeamDialog = ({ children }: NewTeamDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <NewTeamDialogContent />
    </Dialog>
  );
};
