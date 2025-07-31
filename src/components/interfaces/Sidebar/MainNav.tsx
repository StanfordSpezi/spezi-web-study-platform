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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./Sidebar";

interface NavBarItem {
  id?: string;
  title: string;
  linkOptions?: ValidateLinkOptions;
  icon?: LucideIcon;
  subMenu?: NavBarItem[];
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
    subMenu: [
      {
        id: "basic-information",
        title: "Basic Information",
        linkOptions: { to: "/$team/$study/configuration/basic-information" },
      },
      {
        id: "enrollment",
        title: "Enrollment",
      },
      {
        id: "components",
        title: "Components",
      },
    ],
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

const MainNavButton = ({
  item,
  isSubMenu,
}: {
  item: NavBarItem;
  isSubMenu?: boolean;
}) => {
  const matchRoute = useMatchRoute();
  const Comp = isSubMenu ? SidebarMenuSubButton : SidebarMenuButton;
  if (item.linkOptions) {
    return (
      <Comp
        asChild
        tooltip={item.title}
        isActive={!!matchRoute({ to: item.linkOptions.to })}
      >
        <Link from="/" {...item.linkOptions}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </Comp>
    );
  }

  return (
    <Comp tooltip={item.title}>
      {item.icon && <item.icon />}
      <span>{item.title}</span>
    </Comp>
  );
};

export const MainNav = () => {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {navBarItems.map((item) => (
          <SidebarMenuItem key={item.id}>
            <MainNavButton item={item} />
            {item.subMenu && (
              <SidebarMenuSub>
                {item.subMenu.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.id}>
                    <MainNavButton item={subItem} isSubMenu />
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
