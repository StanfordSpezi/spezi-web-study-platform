//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { isObject } from "@stanfordspezi/spezi-web-design-system";
import { truncate } from "es-toolkit/compat";
import {
  Activity,
  CheckSquare,
  FileText,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import type { Component } from "@/server/database/entities/component/schema";
import { cn } from "@/utils/cn";
import { formatSchedule } from "./formatSchedule";
import { healthDataTypes } from "./healthDataTypes";

interface ComponentLabel {
  text: string;
  icon: LucideIcon;
  className: string;
}

/**
 * Derives a visual label (icon, text, and styling) for a component based on its type and metadata.
 *
 * @example
 * ```ts
 * const label = getComponentLabel(component);
 * // label.text might be "Health data" and label.icon Activity
 * ```
 */
export const getComponentLabel = (component: Component): ComponentLabel => {
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
      try {
        const parsedJson = JSON.parse(component.fhirQuestionnaireJson);
        if (
          isObject(parsedJson) &&
          "title" in parsedJson &&
          typeof parsedJson.title === "string"
        ) {
          const title = parsedJson.title || "Questionnaire";
          return {
            icon: CheckSquare,
            text: title,
            className: cn("bg-orange-500 text-orange-50"),
          };
        }
      } catch {
        // Fall through to default label below
      }
      return {
        icon: CheckSquare,
        text: "Questionnaire",
        className: cn("bg-orange-500 text-orange-50"),
      };
    case "health-data":
      return {
        icon: Activity,
        text: "Health data",
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

/**
 * Generates a concise, human-friendly summary for a component by inspecting its type-specific fields.
 */
export const getComponentSummary = (component: Component): string => {
  switch (component.type) {
    case "information":
      return truncate(component.content, { length: 200, omission: "…" });
    case "questionnaire": {
      try {
        const parsedJson = JSON.parse(component.fhirQuestionnaireJson);
        const stringifiedJson = JSON.stringify(parsedJson, null, 2);
        if (
          isObject(parsedJson) &&
          "description" in parsedJson &&
          typeof parsedJson.description === "string"
        ) {
          const description = parsedJson.description || stringifiedJson;
          return truncate(description, { length: 200, omission: "…" });
        }

        return stringifiedJson;
      } catch {
        // Fall through to default label below
      }
      return "Invalid questionnaire data";
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

/**
 * Produces schedule copy for a component, falling back to sensible defaults when no schedule is configured.
 */
export const getComponentSchedule = (component: Component): string => {
  if (component.type === "health-data") {
    return "Continuous";
  }
  if (!component.schedule) {
    return "Not scheduled";
  }
  return formatSchedule(component.schedule);
};
