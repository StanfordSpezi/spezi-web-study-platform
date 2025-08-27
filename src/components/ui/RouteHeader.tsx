//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { cn } from "@stanfordspezi/spezi-web-design-system";
import { createLink, type LinkComponentProps } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import {
  useRef,
  type ComponentProps,
  type ReactNode,
  type RefObject,
} from "react";
import { useResizeObserver } from "usehooks-ts";
import { useIsScrolled } from "@/utils/useIsScrolled";
import { DashedSeparator } from "./DashedSeparator";

interface RouteHeaderProps {
  title: ReactNode;
  description: ReactNode;
  accessoryLeft?: ReactNode;
  accessoryRight?: ReactNode;
}

export const RouteHeader = ({
  title,
  description,
  accessoryLeft,
  accessoryRight,
}: RouteHeaderProps) => {
  const isScrolled = useIsScrolled();
  const headerRef = useRef<HTMLDivElement>(null);

  useResizeObserver({
    ref: headerRef as RefObject<HTMLDivElement>,
    onResize: ({ height = 0 }) => {
      document.documentElement.style.setProperty(
        "--route-header-height",
        `${height}px`,
      );
    },
  });

  return (
    <div
      className={cn(
        "bg-bg/80 sticky top-(--header-height) backdrop-blur-md transition-shadow duration-200",
        isScrolled && "shadow-lg shadow-black/2",
      )}
    >
      <div className="flex max-w-7xl items-center justify-between p-6">
        <div className="flex gap-6">
          {accessoryLeft}
          <div className="space-y-1">
            <h1 className="text-text leading-none font-medium">{title}</h1>
            <p className="text-text-tertiary text-sm">{description}</p>
          </div>
        </div>
        {accessoryRight}
      </div>
      <DashedSeparator />
    </div>
  );
};

interface BasicRouteHeaderBackLinkProps extends ComponentProps<"a"> {}

const BasicRouteHeaderBackLink = ({
  className,
  children = "Back",
  ...props
}: BasicRouteHeaderBackLinkProps) => {
  return (
    <a
      className={cn(
        "text-text-tertiary hover:text-text-tertiary-hover rounded-md text-sm transition-colors duration-200 outline-none",
        "focus-visible:ring-border-focus focus-visible:ring-2 focus-visible:ring-offset-4",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-1 leading-none">
        <ArrowLeft className="size-4 opacity-80" />
        {children}
      </div>
    </a>
  );
};

const CreatedRouteHeaderBackLink = createLink(BasicRouteHeaderBackLink);

export const RouteHeaderBackLink = ({
  to = "..",
  ...props
}: LinkComponentProps<typeof BasicRouteHeaderBackLink>) => {
  return <CreatedRouteHeaderBackLink to={to} {...props} />;
};
