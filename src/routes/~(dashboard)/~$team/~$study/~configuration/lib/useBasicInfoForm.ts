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

const basicInfoFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  shortTitle: z.string().min(1, "Short title is required"),
  explanation: z.string().min(1, "Explanation is required"),
  shortExplanation: z.string().min(1, "Short explanation is required"),
});

export type BasicInfoForm = ReturnType<typeof useBasicInfoForm>;

export const useBasicInfoForm = () => {
  const params = useParams({
    from: "/(dashboard)/$team/$study/configuration/basic-information",
  });
  const { data: study } = useQuery(
    studyRetrieveQueryOptions({ studyId: params.study }),
  );
  return useForm({
    formSchema: basicInfoFormSchema,
    defaultValues: study,
  });
};
