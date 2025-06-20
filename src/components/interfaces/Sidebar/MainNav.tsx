//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Link,
  useMatchRoute,
  type ValidateLinkOptions,
} from "@tanstack/react-router";
import {
  Bolt,
  ChartBar,
  Home,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./Sidebar";

interface NavBarItem {
  id?: string;
  title: string;
  linkOptions?: ValidateLinkOptions;
  icon?: LucideIcon;
}

const navBarItems: NavBarItem[] = [
  {
    id: "search",
    title: "Search",
    icon: Search,
  },
  {
    id: "home",
    title: "Home",
    icon: Home,
    linkOptions: { to: "/$team/$study" },
  },
  {
    id: "configuration",
    title: "Configuration",
    icon: Bolt,
    linkOptions: { to: "/$team/$study/configuration" },
  },
  {
    id: "participants",
    title: "Participants",
    icon: Users,
    linkOptions: { to: "/$team/$study/participants" },
  },
  {
    id: "results",
    title: "Results",
    icon: ChartBar,
    linkOptions: { to: "/$team/$study/results" },
  },
];

const MainNavButton = ({ item }: { item: NavBarItem }) => {
  const matchRoute = useMatchRoute();
  if (item.linkOptions) {
    return (
      <SidebarMenuButton
        asChild
        tooltip={item.title}
        isActive={!!matchRoute({ to: item.linkOptions.to })}
      >
        <Link from="/" {...item.linkOptions}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenuButton tooltip={item.title}>
      {item.icon && <item.icon />}
      <span>{item.title}</span>
    </SidebarMenuButton>
  );
};

export const MainNav = () => {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {navBarItems.map((item) => (
          <SidebarMenuItem key={item.id}>
            <MainNavButton item={item} />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
