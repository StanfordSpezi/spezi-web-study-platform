//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  HelpCircle,
  MessageCircle,
  PanelLeft,
  type LucideIcon,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./Sidebar";

interface NavBarItem {
  id?: string;
  title: string;
  icon?: LucideIcon;
}

const navBarItems: NavBarItem[] = [
  {
    id: "feedback",
    title: "Feedback",
    icon: MessageCircle,
  },
  {
    id: "help",
    title: "Help",
    icon: HelpCircle,
  },
];

export const FooterNav = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {navBarItems.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Expand Sidebar" onClick={toggleSidebar}>
            <PanelLeft />
            <span>Collapse</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
};
