//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { cn } from "@/utils/cn";
import { Notifications } from "./Notifications";
import { StudySelector } from "./StudySelector";
import { TeamSelector } from "./TeamSelector";
import { UserDropdown } from "./UserDropdown";

export const Header = () => {
  return (
    <header
      className={cn(
        "fixed top-0 z-10",
        "flex h-14 w-full items-center justify-between gap-2 pr-3 pl-2",
        "bg-bg-secondary border-border-secondary border-b",
      )}
    >
      <div className="flex items-center gap-3">
        <TeamSelector />
        <div className="bg-border h-5 w-px rotate-12 rounded-full"></div>
        <StudySelector />
      </div>
      <div className="flex items-center gap-2">
        <Notifications />
        <UserDropdown />
      </div>
    </header>
  );
};
