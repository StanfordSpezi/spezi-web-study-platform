//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useForm } from "@stanfordspezi/spezi-web-design-system";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { z } from "zod";
import { studyRetrieveQueryOptions } from "@/lib/queries/study";

const enrollmentFormSchema = z.object({
  enrollmentPeriod: z
    .object({
      start: z.string().nullable(),
      end: z.string().nullable(),
    })
    .nullable()
    .refine(
      (data) => {
        const startDate = data?.start ? new Date(data.start) : null;
        const endDate = data?.end ? new Date(data.end) : null;
        if (startDate && endDate) {
          return endDate >= startDate;
        }
        return true; // If one of the dates is not set, we consider it valid
      },
      {
        message: "End date cannot be earlier than start date.",
        path: ["end"],
      },
    ),
  studyDuration: z.number().nullable(),
  isPrivateStudy: z.boolean(),
  participationCriteria: z
    .array(
      z.object({
        attribute: z.string().min(1, "An attribute is required"),
        operator: z.string().min(1, "An operator is required"),
        value: z
          .array(z.string().min(1, "A value is required"))
          .min(1, "A value is required"),
      }),
    )
    .nullable(),
});

export type EnrollmentForm = ReturnType<typeof useEnrollmentForm>;

export const useEnrollmentForm = () => {
  const params = useParams({
    from: "/(dashboard)/$team/$study/configuration/enrollment",
  });
  const { data: study } = useQuery(
    studyRetrieveQueryOptions({ studyId: params.study }),
  );
  return useForm({
    formSchema: enrollmentFormSchema,
    defaultValues: study,
  });
};
