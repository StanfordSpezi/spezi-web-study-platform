//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import orgLogo from "@/assets/org-logo.webp";
import { cn } from "@/utils/cn";
import { Notifications } from "./Notifications";
import { StudySelector } from "./StudySelector";
import { TeamSelector } from "./TeamSelector";
import { UserDropdown } from "./UserDropdown";
import { SidebarTrigger } from "../Sidebar/Sidebar";

export const Header = () => {
  return (
    <header
      className={cn(
        "fixed top-0 z-10",
        "flex h-(--header-height) w-full items-center justify-between gap-2 pr-3 pl-2",
        "bg-bg-secondary border-border-secondary border-b",
      )}
    >
      <div className="flex items-center gap-3">
        <div className="bg-surface border-border-secondary md:flex-center mx-1 hidden size-6.5 rounded-md border bg-clip-padding p-1 shadow-xs">
          <img
            src={orgLogo}
            alt="Stanford Logo"
            className="size-full object-contain"
          />
        </div>
        <SidebarTrigger className="!size-8 shrink-0 !p-2 md:hidden" />
        <div
          className={cn(
            "bg-border h-5 w-px rotate-12 rounded-full",
            "hidden [&:has(+_[data-element='header-selector'])]:block",
          )}
        ></div>
        <TeamSelector />
        <div
          className={cn(
            "bg-border h-5 w-px rotate-12 rounded-full",
            "hidden [&:has(+_[data-element='header-selector'])]:block",
          )}
        ></div>
        <StudySelector />
      </div>
      <div className="flex items-center gap-2">
        <Notifications />
        <UserDropdown />
      </div>
    </header>
  );
};
