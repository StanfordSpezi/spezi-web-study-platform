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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@stanfordspezi/spezi-web-design-system";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { UserAvatar } from "@/components/interfaces/Header/UserAvatar";
import { UserDropdownSkeleton } from "@/components/interfaces/Header/UserDropdownSkeleton";
import { authClient } from "@/lib/authClient";
import { userRetrieveQueryOptions } from "@/lib/queries/user";

export const MinimalUserDropdown = () => {
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
          className="size-10 rounded-md"
          aria-label="User menu"
        >
          <UserAvatar
            user={user}
            className="text-sm [--avatar-size:--spacing(8)]"
          />
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
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="size-3.5 opacity-80" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
