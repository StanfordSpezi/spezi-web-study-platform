//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button } from "@stanfordspezi/spezi-web-design-system";
import { Edit } from "lucide-react";
import type { ComponentProps } from "react";

type EditButtonProps = Omit<ComponentProps<"button">, "children">;

export const EditButton = (props: EditButtonProps) => {
  return (
    <Button size="sm" variant="outline" {...props}>
      <Edit className="size-3.5" />
      Edit
    </Button>
  );
};
