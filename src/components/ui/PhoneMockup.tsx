//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { cn } from "@stanfordspezi/spezi-web-design-system";
import { useEffect, useRef, type ReactNode } from "react";

const PhoneTopBar = () => {
  return (
    <div className="absolute top-(--phone-top-bar-padding-top) left-0 flex h-(--phone-top-bar-content-height) w-full items-center justify-between">
      <div className="flex h-full flex-1 items-center justify-start pl-[8%]">
        <div className="bg-fill-secondary h-1/3 w-1/2 rounded-full" />
      </div>
      <div className="flex-center h-full flex-1">
        <div className="bg-fill-secondary h-3/5 w-full rounded-full" />
      </div>
      <div className="flex h-full flex-1 items-center justify-end gap-[8%] pr-[8%]">
        <div className="bg-fill-secondary aspect-square h-1/3 rounded-full" />
        <div className="bg-fill-secondary aspect-square h-1/3 rounded-full" />
        <div className="bg-fill-secondary aspect-square h-1/3 rounded-full" />
      </div>
    </div>
  );
};

interface PhoneMockupProps {
  children?: ReactNode;
}

export const PhoneMockup = ({ children }: PhoneMockupProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = parentRef.current;
    const inner = innerRef.current;
    if (!parent || !inner) return;

    const adjustAspect = () => {
      const style = getComputedStyle(parent);
      const paddingX =
        parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      const paddingY =
        parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      const availableWidth = parent.clientWidth - paddingX;
      const availableHeight = parent.clientHeight - paddingY;
      const effectiveRatio = availableWidth / availableHeight;
      const targetRatio = 9 / 16;

      if (effectiveRatio >= targetRatio) {
        // Limit by height
        inner.style.width = "auto";
        inner.style.height = "100%";
      } else {
        // Limit by width
        inner.style.width = "100%";
        inner.style.height = "auto";
      }

      const rect = inner.getBoundingClientRect();
      inner.style.setProperty("--phone-width", `${rect.width}px`);
      inner.style.setProperty("--phone-height", `${rect.height}px`);
    };

    adjustAspect();

    let debounceTimeout: NodeJS.Timeout | null = null;
    const observer = new ResizeObserver(() => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(adjustAspect, 10);
    });

    observer.observe(parent);

    return () => {
      observer.disconnect();
      if (debounceTimeout) clearTimeout(debounceTimeout);
    };
  }, []);

  return (
    <div ref={parentRef} className="flex-center size-full px-6">
      <div
        ref={innerRef}
        className={cn(
          "[--phone-top-bar-content-height:calc(0.08*var(--phone-height))] [--phone-top-bar-padding-top:calc(0.02*var(--phone-height))]",
          "[--phone-top-bar-height:calc(var(--phone-top-bar-content-height)+var(--phone-top-bar-padding-top))]",
          "relative aspect-[9/16] size-full overflow-hidden rounded-[12%/6.75%] border shadow-lg",
        )}
      >
        {children}
        <PhoneTopBar />
      </div>
    </div>
  );
};
