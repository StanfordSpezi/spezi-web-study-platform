//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button, buttonVariance } from "@stanfordspezi/spezi-web-design-system";
import { createLink } from "@tanstack/react-router";
import { Edit } from "lucide-react";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ComponentProps,
} from "react";
import { cn } from "@/utils/cn";

type EditButtonProps = Omit<ComponentProps<typeof Button>, "children">;

export const EditButton = ({
  size = "sm",
  variant = "outline",
  ...props
}: EditButtonProps) => {
  return (
    <Button size={size} variant={variant} {...props}>
      <Edit className="size-3.5" />
      Edit
    </Button>
  );
};

type BasicEditButtonLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children"
> &
  Parameters<typeof buttonVariance>[0];

const BasicEditButtonLink = forwardRef<
  HTMLAnchorElement,
  BasicEditButtonLinkProps
>(({ className, size = "sm", variant = "outline", ...props }, ref) => {
  return (
    <a
      ref={ref}
      className={cn(buttonVariance({ variant, size }), className)}
      {...props}
    >
      <Edit className="size-3.5" />
      Edit
    </a>
  );
});
BasicEditButtonLink.displayName = "BasicEditButtonLink";

export const EditButtonLink = createLink(BasicEditButtonLink);
