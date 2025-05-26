//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Layers2, LogOut, User } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { cn } from "@/utils/cn";
// import { UserDropdownSkeleton } from "./UserDropdownSkeleton";

const session = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    image: undefined,
  },
};

export const UserDropdown = () => {
  // if (!session) {
  //   return <UserDropdownSkeleton />;
  // }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex h-8 items-center gap-3 rounded-md p-1 text-left text-sm outline-hidden",
            "hover:bg-bg-hover",
            "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
            "focus-visible:ring-border-focus focus-visible:ring-2",
          )}
        >
          <Avatar
            className="bg-surface ring-border-shadow size-6.5! rounded-full shadow-xs ring"
            src={session.user.image}
            fallback={
              <div className="bg-surface flex-center size-full rounded-full text-xs">
                {session.user.name[0].toUpperCase()}
              </div>
            }
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-60! rounded-lg"
        side="top"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel>
          <div>{session.user.name}</div>
          <div className="text-text-tertiary truncate">
            {session.user.email}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="size-3.5" />
            Profile Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Layers2 />
            Shortcuts
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
