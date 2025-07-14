//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Avatar, cn } from "@stanfordspezi/spezi-web-design-system";
import { Shield } from "lucide-react";

interface UserAvatarProps {
  user: {
    name: string;
    imageUrl?: string;
    role: "user" | "admin";
  };
  className?: string;
  /**
   * Use this to style the sizing of the avatar and badge.
   * You need to set the `--avatar-size` CSS variable in the wrapper.
   * Example: `wrapperClassName="[--avatar-size:--spacing(6.5)]"`
   */
  wrapperClassName?: string;
}

export const UserAvatar = ({
  user,
  className,
  wrapperClassName,
}: UserAvatarProps) => {
  return (
    <div
      className={cn(
        "relative [--avatar-size:--spacing(6.5)]",
        wrapperClassName,
      )}
    >
      <Avatar
        size={null}
        className={cn(
          "bg-surface border-border-secondary size-(--avatar-size) rounded-full border bg-clip-padding p-0.5 shadow-xs",
          className,
        )}
        src={user.imageUrl}
        fallback={
          <div className="flex-center bg-background size-full rounded-full text-xs">
            {user.name[0].toUpperCase()}
          </div>
        }
      />
      {user.role === "admin" && (
        <div
          className={cn(
            "[--badge-offset:calc(var(--avatar-size)/8)]",
            "absolute -right-(--badge-offset) -bottom-(--badge-offset) p-[calc(var(--avatar-size)/16)]",
            "flex-center bg-fill-info size-[calc(var(--avatar-size)/2)] rounded-full border",
          )}
        >
          <Shield className="fill-text-info-on-fill size-fill stroke-0" />
        </div>
      )}
    </div>
  );
};
