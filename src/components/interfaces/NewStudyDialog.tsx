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
  parseUnknownError,
  toast,
  useForm,
} from "@stanfordspezi/spezi-web-design-system";
import { ListPlus } from "lucide-react";
import { type ReactNode } from "react";
import { z } from "zod";
import { useCreateStudyMutation } from "@/lib/queries/study";
import type { Study } from "@/server/database/entities/study/schema";
import { FeaturedIconContainer } from "../ui/FeaturedIconContainer";
import { FieldLabel } from "../ui/FieldLabel";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

interface NewStudyDialogContentProps {
  teamId: string;
  onSuccess?: (study: Study) => Promise<void> | void;
}

export const NewStudyDialogContent = ({
  teamId,
  onSuccess,
}: NewStudyDialogContentProps) => {
  const createStudy = useCreateStudyMutation();
  const form = useForm({
    formSchema,
    defaultValues: { title: "" },
  });

  const handleSubmit = form.handleSubmit(async ({ title }) => {
    try {
      const study = await createStudy.mutateAsync({
        teamId,
        title,
        shortTitle: null,
        icon: null,
        explanation: null,
        shortExplanation: null,
        isPublished: false,
        enrollmentPeriod: null,
        studyDuration: null,
        isPrivateStudy: false,
        participationCriteria: null,
      });
      await onSuccess?.(study);
    } catch (error) {
      toast.error("Failed to create study.", {
        description: parseUnknownError(error),
      });
    }
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
          <DialogTitle>Create a new study</DialogTitle>
          <DialogDescription>
            Enter a title to get started. You can always change this later.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4">
          <Field
            control={form.control}
            name="title"
            label={<FieldLabel title="Study title" />}
            render={({ field }) => (
              <Input placeholder="Enter study title" {...field} />
            )}
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            variant="default"
            size="sm"
            isPending={createStudy.isPending}
          >
            Create study
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

interface NewStudyDialogProps {
  teamId: string;
  children: ReactNode;
}

export const NewStudyDialog = ({ children, teamId }: NewStudyDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <NewStudyDialogContent teamId={teamId} />
    </Dialog>
  );
};
