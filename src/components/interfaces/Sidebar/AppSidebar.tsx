//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { FooterNav } from "./FooterNav";
import { MainNav } from "./MainNav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarSeparator,
} from "./Sidebar";

interface Props {
  className?: string;
}

export const AppSidebar = ({ className }: Props) => {
  return (
    <Sidebar collapsible="icon" className={className}>
      <SidebarContent>
        <MainNav />
      </SidebarContent>
      <SidebarSeparator className="border-border mx-0 border-t border-dashed bg-transparent" />
      <SidebarFooter className="px-0">
        <FooterNav />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
