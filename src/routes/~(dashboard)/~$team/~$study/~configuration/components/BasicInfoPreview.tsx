//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { cn } from "@/utils/cn";
import type { BasicInfoForm } from "../lib/useBasicInfoForm";

interface BasicInfoPreviewProps {
  form: BasicInfoForm;
}

export const BasicInfoPreview = ({ form }: BasicInfoPreviewProps) => {
  const title = form.watch("title");
  const explanation = form.watch("explanation");
  return (
    <>
      <div className="bg-bg-secondary flex-center absolute top-0 left-0 h-1/2 w-full flex-col gap-[8%] px-[10%] pt-(--phone-top-bar-height)">
        <div className="bg-surface aspect-square h-2/5 rounded-[10%] shadow-md"></div>
        <div
          id="phone-title"
          className={cn(
            "max-w-full text-center text-[calc(var(--phone-width)*0.07)] leading-tight break-words",
            !title && "text-text-tertiary",
          )}
        >
          <span>{title || "Title"}</span>
        </div>
      </div>
      <div className="absolute top-1/2 left-0 h-1/2 w-full p-[10%]">
        <div id="phone-explanation" className="flex size-full flex-col">
          <div className="text-[calc(var(--phone-width)*0.05)] font-medium">
            Explanation
          </div>
          <div
            className={cn(
              "scrollbar-thin size-full overflow-y-auto rounded-md text-[calc(var(--phone-width)*0.05)] text-ellipsis outline-none",
              "focus-visible:ring-border-focus focus-visible:ring-2 focus-visible:ring-offset-4",
              !explanation && "text-text-tertiary",
            )}
          >
            <span>{explanation || "Explanation"}</span>
          </div>
        </div>
      </div>
    </>
  );
};
