import type { ReactNode } from "react";
import { Header } from "../interfaces/Header/Header";
import { AppSidebar } from "../interfaces/Sidebar/AppSidebar";
import { SidebarInset, SidebarProvider } from "../interfaces/Sidebar/Sidebar";

interface Props {
  children: ReactNode | ReactNode[];
}

export const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
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
