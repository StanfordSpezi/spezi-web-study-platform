//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@stanfordspezi/spezi-web-design-system";
import { useBlocker } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { FeaturedIconContainer } from "../ui/FeaturedIconContainer";

interface NavigationBlockerProps {
  shouldBlock: boolean;
}

export const NavigationBlocker = ({ shouldBlock }: NavigationBlockerProps) => {
  const { proceed, reset, status } = useBlocker({
    shouldBlockFn: () => shouldBlock,
    withResolver: true,
    enableBeforeUnload: shouldBlock,
  });

  return (
    <Dialog open={status === "blocked"} onOpenChange={reset}>
      <DialogContent className="max-w-sm">
        <DialogHeader className="items-center sm:items-start">
          <FeaturedIconContainer className="mb-4 size-10">
            <div className="size-full p-(--inner-padding) [--inner-padding:--spacing(0.5)]">
              <div className="flex-center border-border-tertiary size-full rounded-[calc(var(--container-radius)-var(--container-padding)-var(--inner-padding))] border-2">
                <ArrowLeft className="text-text-tertiary size-4" />
              </div>
            </div>
          </FeaturedIconContainer>
          <DialogTitle>Leave this page?</DialogTitle>
          <DialogDescription>
            You have unsaved changes that will be lost.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-4 pt-2">
          <Button
            onClick={reset}
            variant="outline"
            size="sm"
            className="sm:flex-1"
          >
            Stay
          </Button>
          <Button
            onClick={proceed}
            variant="default"
            size="sm"
            className="sm:flex-1"
          >
            Leave anyway
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
