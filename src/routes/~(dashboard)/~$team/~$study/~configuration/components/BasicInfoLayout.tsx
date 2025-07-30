//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button } from "@stanfordspezi/spezi-web-design-system";
import {
  useRef,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { useResizeObserver } from "usehooks-ts";
import { RouteHeader, RouteHeaderBackLink } from "@/components/ui/RouteHeader";

interface BasicInfoLayoutProps {
  children: ReactNode;
  onSave: () => void;
}

export const BasicInfoLayout = ({ children, onSave }: BasicInfoLayoutProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { height = 0 } = useResizeObserver({
    ref: headerRef as RefObject<HTMLDivElement>,
  });

  return (
    <div style={{ "--route-header-height": `${height}px` } as CSSProperties}>
      <RouteHeader
        ref={headerRef}
        title="Basic Information"
        description="Set your study's title, description, and how it appears to participants."
        accessoryLeft={<RouteHeaderBackLink />}
        accessoryRight={<Button onClick={onSave}>Save</Button>}
      />
      {children}
    </div>
  );
};
