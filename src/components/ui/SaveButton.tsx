//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button } from "@stanfordspezi/spezi-web-design-system";
import { Check, CircleAlert } from "lucide-react";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

interface SaveButtonProps
  extends Omit<ComponentProps<typeof Button>, "children"> {
  isSuccess?: boolean;
  successTimeout?: number;
  isError?: boolean;
  errorTimeout?: number;
}

export const SaveButton = ({
  className,
  isPending,
  disabled,
  isSuccess,
  successTimeout = 2000,
  isError,
  errorTimeout = 5000,
  ...props
}: SaveButtonProps) => {
  const [localIsSuccess, setLocalIsSuccess] = useState(false);
  const [localIsError, setLocalIsError] = useState(false);
  const successTimeoutRef = useRef<NodeJS.Timeout>(null);
  const errorTimeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (isSuccess) {
      setLocalIsSuccess(true);
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
      successTimeoutRef.current = setTimeout(() => {
        setLocalIsSuccess(false);
      }, successTimeout);
    }

    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, [isSuccess, successTimeout]);

  useEffect(() => {
    if (isError) {
      setLocalIsError(true);
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
      errorTimeoutRef.current = setTimeout(() => {
        setLocalIsError(false);
      }, errorTimeout);
    }

    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, [isError, errorTimeout]);

  return (
    <Button
      disabled={disabled ?? isPending}
      isPending={isPending}
      className={cn(
        "w-20 border-2 border-transparent !transition-all",
        localIsSuccess &&
          "border-fill-success text-text-success-on-fill w-28 shadow-[inset_0_0_16px_--alpha(var(--color-fill-success)_/_50%)]",
        localIsError &&
          "border-fill-tertiary !bg-fill-tertiary text-text-tertiary-on-fill w-28",
        className,
      )}
      {...props}
    >
      {localIsSuccess && (
        <div className="flex items-center gap-2">
          <span>Saved</span>
          <Check className="top-px size-4" strokeWidth={2.5} />
        </div>
      )}
      {localIsError && (
        <div className="flex w-full items-center gap-2">
          <CircleAlert className="relative top-[0.5px] size-4.5" />
          Error
        </div>
      )}
      {!localIsSuccess && !localIsError && "Save"}
    </Button>
  );
};
