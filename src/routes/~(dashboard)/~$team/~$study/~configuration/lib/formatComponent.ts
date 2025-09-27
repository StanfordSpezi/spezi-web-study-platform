//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Activity,
  CheckSquare,
  FileText,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import type { Component } from "@/server/database/entities/component/schema";
import { cn } from "@/utils/cn";
import { truncate } from "@/utils/truncate";
import { formatSchedule } from "./formatSchedule";
import { healthDataTypes } from "./healthDataTypes";

interface ComponentLabel {
  text: string;
  icon: LucideIcon;
  className: string;
}

const getComponentLabel = (component: Component): ComponentLabel => {
  switch (component.type) {
    case "information":
      return {
        icon: FileText,
        text: component.title,
        // Using cn() here to get intellisense for the Tailwind class names
        // Enable in .vscode/settings.json: "tailwindCSS.classFunctions": ["cva", "cn"]
        className: cn("bg-blue-500 text-blue-50"),
      };
    case "questionnaire":
      return {
        icon: CheckSquare,
        text: "Questionnaire",
        className: cn("bg-orange-500 text-orange-50"),
      };
    case "health-data":
      return {
        icon: Activity,
        text: "Health Data",
        className: cn("bg-green-500 text-green-50"),
      };
    default:
      return {
        icon: HelpCircle,
        text: "Component",
        className: cn("bg-fill"),
      };
  }
};

const getComponentSummary = (component: Component): string => {
  switch (component.type) {
    case "information":
      return truncate(component.content, 200);
    case "questionnaire": {
      const jsonString = JSON.stringify(
        JSON.parse(component.fhirQuestionnaireJson),
        null,
        2,
      );
      return truncate(jsonString, 200);
    }
    case "health-data": {
      const healthDataTypeItems = Object.values(healthDataTypes).flat();
      const types = component.sampleTypes.slice(0, 10).map((type) => {
        const item = healthDataTypeItems.find((item) => item.value === type);
        return item ? item.label : type;
      });
      return component.sampleTypes.length > 10 ?
          types.join(",\n") + "…"
        : types.join(",\n");
    }
    default:
      return "No summary available";
  }
};

const getComponentSchedule = (component: Component): string => {
  if (!component.schedule) {
    return "Not scheduled";
  }
  return formatSchedule(component.schedule);
};

/**
 * Formats a component by extracting values for label, summary, and schedule.
 */
export const formatComponent = (component: Component) => {
  const label = getComponentLabel(component);
  const summary = getComponentSummary(component);
  const schedule = getComponentSchedule(component);

  return { label, summary, schedule };
};
