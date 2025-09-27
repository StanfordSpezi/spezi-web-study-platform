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
  RadioGroup,
  useForm,
} from "@stanfordspezi/spezi-web-design-system";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { Component } from "lucide-react";
import { type ReactNode } from "react";
import { z } from "zod";
import { FeaturedIconContainer } from "@/components/ui/FeaturedIconContainer";

const formSchema = z.object({
  componentType: z.enum(["information", "questionnaire", "health-data"]),
});

interface RadioGroupOptionProps {
  title: string;
  description: string;
}

const RadioGroupOption = ({ title, description }: RadioGroupOptionProps) => (
  <div className="flex flex-col gap-1">
    <p className="font-medium">{title}</p>
    <p className="text-text-tertiary text-sm">{description}</p>
  </div>
);

interface NewComponentDialogProps {
  children: ReactNode;
}

export const NewComponentDialog = ({ children }: NewComponentDialogProps) => {
  const navigate = useNavigate();
  const { team, study } = useParams({ strict: false });

  const form = useForm({
    formSchema,
    defaultValues: { componentType: "information" },
  });
  const { componentType } = form.watch();

  const handleSubmit = form.handleSubmit(async ({ componentType }) => {
    if (!team || !study) return;
    await navigate({
      to: "/$team/$study/configuration/components/new",
      params: { team, study },
      search: { componentType },
    });
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent size="2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="items-center sm:items-start">
            <FeaturedIconContainer className="border-border-tertiary mb-4 size-8 rounded-lg shadow-xs">
              <div className="grid size-full place-items-center">
                <Component className="text-text-tertiary size-4" />
              </div>
            </FeaturedIconContainer>
            <DialogTitle>Choose a component type</DialogTitle>
            <DialogDescription>
              Select the type of component you want to add to your study. Each
              type has different configuration options and purposes.
            </DialogDescription>
          </DialogHeader>
          <div className="pt-8">
            <Field
              control={form.control}
              name="componentType"
              render={({ field }) => (
                <RadioGroup
                  className="gap-y-6 [&_button]:-mt-px [&>label]:items-start"
                  options={[
                    {
                      value: "information",
                      label: (
                        <RadioGroupOption
                          title="Information"
                          description="Display text and images to provide instructions, explanations, or context to participants."
                        />
                      ),
                    },
                    {
                      value: "questionnaire",
                      label: (
                        <RadioGroupOption
                          title="Questionnaire"
                          description="Collect participant responses through structured questionnaires. Built on the HL7® FHIR® standard for interoperability."
                        />
                      ),
                    },
                    {
                      value: "health-data",
                      label: (
                        <RadioGroupOption
                          title="Health Data"
                          description="Gather biomarker data from participants' connected devices. Define which health metrics to track and set collection frequency."
                        />
                      ),
                    },
                  ]}
                  {...field}
                />
              )}
            />
          </div>
          <DialogFooter>
            {study && team && (
              <Button variant="default" size="sm" asChild>
                <Link
                  to="/$team/$study/configuration/components/new"
                  params={{ study, team }}
                  search={{ componentType }}
                >
                  Create component
                </Link>
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
