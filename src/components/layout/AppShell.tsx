import { useState } from "react";
import { Outlet, useMatches } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export interface RouteBreadcrumbHandle {
  breadcrumb?: Array<{ label: string; to?: string }>;
}

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const matches = useMatches();
  const last = [...matches].reverse().find((m) => (m.handle as RouteBreadcrumbHandle)?.breadcrumb);
  const breadcrumb = (last?.handle as RouteBreadcrumbHandle)?.breadcrumb ?? [{ label: "Dashboard" }];

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header breadcrumb={breadcrumb} />
        <main className="flex-1 p-5 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
