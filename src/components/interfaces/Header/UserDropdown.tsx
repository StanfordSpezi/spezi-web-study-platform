//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Avatar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@stanfordspezi/spezi-web-design-system";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Layers2, LogOut, User } from "lucide-react";
import { mockApi } from "@/lib/mockApi";
import { currentUserRetrieveQueryOptions } from "@/lib/queries/currentUser";
import { cn } from "@/utils/cn";
import { UserDropdownSkeleton } from "./UserDropdownSkeleton";

export const UserDropdown = () => {
  const { data: user } = useQuery(currentUserRetrieveQueryOptions());
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    mockApi.auth.signOut();
    queryClient.clear();
    await navigate({ to: "/sign-in" });
  };

  if (!user) {
    return <UserDropdownSkeleton />;
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="User menu"
          className={cn(
            "flex h-8 items-center gap-3 rounded-md p-1 text-left text-sm outline-hidden",
            "hover:bg-bg-secondary-hover",
            "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
            "focus-visible:ring-border-focus focus-visible:ring-2",
          )}
        >
          <Avatar
            className="bg-surface border-border-secondary size-6.5! rounded-full border bg-clip-padding shadow-xs"
            src={user.imageUrl}
            fallback={
              <div className="bg-surface flex-center size-full rounded-full text-xs">
                {user.name[0].toUpperCase()}
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
          <div>{user.name}</div>
          <div className="text-text-tertiary truncate">{user.email}</div>
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
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
