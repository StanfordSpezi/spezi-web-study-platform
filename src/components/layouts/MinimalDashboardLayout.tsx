//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { ReactNode } from "react";
import { Header } from "../interfaces/Header/Header";
import { SidebarProvider } from "../interfaces/Sidebar/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode | ReactNode[];
}

export const MinimalDashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider className="flex flex-col">
      <Header />
      <div className="flex flex-1 pt-(--header-height)">{children}</div>
    </SidebarProvider>
  );
};
