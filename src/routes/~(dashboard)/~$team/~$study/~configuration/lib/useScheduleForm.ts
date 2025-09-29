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
import { useEffect } from "react";
import { z } from "zod";
import { componentRetrieveQueryOptions } from "@/lib/queries/component";

const scheduleSchema = z.object({
  startOffset: z.number().min(0),
  repeatType: z.enum(["none", "daily", "weekly"]),
  repeatInterval: z.number().min(0),
  displayHour: z.number().min(0).max(23),
  displayMinute: z.number().min(0).max(59),
  completionPolicy: z.enum(["after-start", "anytime", "same-day-after-start"]),
});

export type ScheduleForm = ReturnType<typeof useScheduleForm>;

export const useScheduleForm = () => {
  const params = useParams({
    from: "/(dashboard)/$team/$study/configuration/components/$component",
  });
  const { data: component } = useQuery({
    ...componentRetrieveQueryOptions({ componentId: params.component }),
  });

  const form = useForm({
    formSchema: scheduleSchema,
    defaultValues: component?.schedule ?? {
      repeatType: "daily",
      displayHour: 9,
      displayMinute: 0,
      completionPolicy: "anytime",
    },
  });

  useEffect(() => {
    if (component) form.reset(component.schedule ?? undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component]);

  return { form, component };
};
