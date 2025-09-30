//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useForm } from "@stanfordspezi/spezi-web-design-system";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";
import { componentRetrieveQueryOptions } from "@/lib/queries/component";

const baseSchema = z.object({
  studyId: z.string().min(1),
});

type OmitBaseSchema<T> = Omit<T, keyof z.infer<typeof baseSchema>>;

const informationSchema = baseSchema.extend({
  type: z.literal("information"),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  image: z.string().nullable(),
});

const defaultInformationValues: OmitBaseSchema<
  z.infer<typeof informationSchema>
> = {
  type: "information",
  title: "",
  content: "",
  image: null,
};

const healthDataSchema = baseSchema.extend({
  type: z.literal("health-data"),
  sampleTypes: z
    .string()
    .array()
    .min(1, "At least one sample type is required"),
  historicalDataCollection: z.number().nullable(),
});

const defaultHealthDataValues: OmitBaseSchema<
  z.infer<typeof healthDataSchema>
> = {
  type: "health-data",
  sampleTypes: [],
  historicalDataCollection: null,
};

const questionnaireSchema = baseSchema.extend({
  type: z.literal("questionnaire"),
  fhirQuestionnaireJson: z
    .string()
    .min(1, "Questionnaire JSON is required")
    .refine((val) => {
      try {
        JSON.parse(val);
        return true;
      } catch {
        return false;
      }
    }, "Invalid FHIR Questionnaire JSON"),
});

const defaultQuestionnaireValues: OmitBaseSchema<
  z.infer<typeof questionnaireSchema>
> = {
  type: "questionnaire",
  fhirQuestionnaireJson: "",
};

const componentSchema = z.discriminatedUnion("type", [
  informationSchema,
  healthDataSchema,
  questionnaireSchema,
]);

export type ComponentForm = ReturnType<typeof useComponentForm>;
type ComponentType = z.infer<typeof componentSchema>["type"];

/**
 * Returns default form values for the given component type.
 */
const getDefaultValuesForType = (type: ComponentType, studyId?: string) => {
  switch (type) {
    case "information":
      return { ...defaultInformationValues, studyId, type } as const;
    case "health-data":
      return { ...defaultHealthDataValues, studyId, type } as const;
    case "questionnaire":
      return { ...defaultQuestionnaireValues, studyId, type } as const;
  }
};

/**
 * Builds a component form instance that pre-populates default values, hydrates remote data,
 * and keeps the form state in sync with the currently selected component.
 */
export const useComponentForm = () => {
  const { componentType = "information" } = useSearch({ strict: false });
  const params = useParams({ strict: false });
  const { data: component } = useQuery({
    ...componentRetrieveQueryOptions({ componentId: params.component ?? "" }),
    enabled: !!params.component,
  });

  const form = useForm({
    formSchema: componentSchema,
    defaultValues:
      component ?? getDefaultValuesForType(componentType, params.study),
  });

  useEffect(() => {
    if (component) form.reset(component);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component]);

  useEffect(() => {
    if (component) return; // don't override existing component data
    form.reset(getDefaultValuesForType(componentType, params.study));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentType, params.study, component]);

  return form;
};
