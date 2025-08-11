//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { ReactNode } from "react";
import { Header } from "../interfaces/Header/Header";
import { AppSidebar } from "../interfaces/Sidebar/AppSidebar";
import { SidebarInset, SidebarProvider } from "../interfaces/Sidebar/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode | ReactNode[];
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="[--header-height:--spacing(14)]">
      <SidebarProvider className="flex flex-col">
        <Header />
        <div className="flex flex-1">
          <AppSidebar className="top-(--header-height) !h-[calc(100svh-var(--header-height))]" />
          <SidebarInset className="pt-(--header-height)">
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};
