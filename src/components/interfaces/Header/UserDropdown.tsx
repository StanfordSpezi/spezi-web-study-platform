//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
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
import { authClient } from "@/lib/authClient";
import { userRetrieveQueryOptions } from "@/lib/queries/user";
import { UserAvatar } from "./UserAvatar";
import { UserDropdownSkeleton } from "./UserDropdownSkeleton";

export const UserDropdown = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: user } = useQuery(userRetrieveQueryOptions({ userId: "me" }));

  const handleSignOut = async () => {
    await authClient.signOut();
    queryClient.clear();
    await navigate({ to: "/sign-in" });
  };

  if (!user) {
    return <UserDropdownSkeleton />;
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={null}
          className="size-8 rounded-md"
          aria-label="User menu"
        >
          <UserAvatar user={user} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-60! rounded-lg"
        side="top"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel>
          <div className="flex items-center gap-4 font-normal">
            <UserAvatar
              user={user}
              className="text-sm [--avatar-size:--spacing(8)]"
            />
            <div>
              <div className="text-sm">{user.name}</div>
              <div className="text-text-tertiary text-xs">
                {user.role === "admin" ? "Administrator" : "User"}
              </div>
            </div>
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
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
