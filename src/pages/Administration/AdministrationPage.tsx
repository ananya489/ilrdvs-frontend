import { useState } from "react";
import { Users, ShieldCheck, Settings2, ListChecks, Database, Plug, Plus } from "lucide-react";
import { Card, CardBody } from "../../components/ui/Card";
import { Tabs } from "../../components/ui/Tabs";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { CURRENT_USER } from "../../data/mockData";

const USERS = [
  { name: "Officer Anjali Sharma", id: "MRD-UP-10245", role: "Verification Officer", dept: "Mathura", status: "Active" },
  { name: "R. Verma", id: "MRD-UP-10112", role: "Supervisor", dept: "Mathura", status: "Active" },
  { name: "S. Yadav", id: "MRD-RJ-20044", role: "Data Entry Officer", dept: "Jaipur", status: "Active" },
  { name: "K. Rathore", id: "MRD-RJ-20087", role: "GIS Officer", dept: "Jaipur", status: "Inactive" },
  { name: "D. Singh", id: "MRD-BH-30021", role: "Auditor", dept: "Patna", status: "Active" },
];

const ROLES = ["Administrator", "Data Entry Officer", "Verification Officer", "Supervisor", "GIS Officer", "Auditor"];

const RULES = [
  { name: "Owner name must match reference database", severity: "Failed" },
  { name: "Survey number format validation", severity: "Warning" },
  { name: "Duplicate survey number + village check", severity: "Warning" },
  { name: "Land area within GIS tolerance (±5%)", severity: "Failed" },
  { name: "Mandatory field completeness check", severity: "Failed" },
];

const INTEGRATIONS = [
  { name: "State Land Records Database", status: "Connected" },
  { name: "GIS / Cadastral Survey Service", status: "Connected" },
  { name: "OCR / HTR Processing Engine", status: "Connected" },
  { name: "Aadhaar Verification Gateway", status: "Not Configured" },
];

export function AdministrationPage() {
  const [tab] = useState("users");
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-navy-900">Administration</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage users, roles, validation rules, and system integrations.</p>
      </div>

      <Card>
        <CardBody>
          <Tabs
            defaultTab={tab}
            items={[
              {
                id: "users",
                label: "Users",
                icon: <Users className="h-3.5 w-3.5" />,
                content: (
                  <div>
                    <div className="flex justify-end mb-3">
                      <Button size="sm" icon={<Plus className="h-3.5 w-3.5" />}>Add User</Button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-xs text-slate-500 border-b border-slate-100">
                            <th className="py-2.5 font-medium">Name</th>
                            <th className="py-2.5 font-medium">Employee ID</th>
                            <th className="py-2.5 font-medium">Role</th>
                            <th className="py-2.5 font-medium">Department</th>
                            <th className="py-2.5 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {USERS.map((u) => (
                            <tr key={u.id}>
                              <td className="py-3 font-medium text-navy-900">{u.name}</td>
                              <td className="py-3 text-slate-600 font-ids">{u.id}</td>
                              <td className="py-3 text-slate-600">{u.role}</td>
                              <td className="py-3 text-slate-600">{u.dept}</td>
                              <td className="py-3"><Badge tone={u.status === "Active" ? "success" : "neutral"}>{u.status}</Badge></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ),
              },
              {
                id: "roles",
                label: "Roles & Permissions",
                icon: <ShieldCheck className="h-3.5 w-3.5" />,
                content: (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {ROLES.map((r) => (
                      <div key={r} className="rounded-md border border-slate-200 p-3.5">
                        <p className="text-sm font-medium text-navy-900">{r}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {r === "Administrator" && "Full system access, including user and rule management."}
                          {r === "Data Entry Officer" && "Upload documents and manage metadata."}
                          {r === "Verification Officer" && "Review and approve AI-extracted land records."}
                          {r === "Supervisor" && "Assign tasks and oversee verification workload."}
                          {r === "GIS Officer" && "Manage cadastral maps and spatial validation."}
                          {r === "Auditor" && "Read-only access to audit trail and reports."}
                        </p>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                id: "rules",
                label: "Validation Rules",
                icon: <ListChecks className="h-3.5 w-3.5" />,
                content: (
                  <div className="divide-y divide-slate-50">
                    {RULES.map((r) => (
                      <div key={r.name} className="flex items-center justify-between py-2.5">
                        <span className="text-sm text-navy-800">{r.name}</span>
                        <Badge tone={r.severity === "Failed" ? "danger" : "warning"}>{r.severity}</Badge>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                id: "reference",
                label: "Reference Data",
                icon: <Database className="h-3.5 w-3.5" />,
                content: (
                  <p className="text-sm text-slate-500">
                    Manage the master lists of states, districts, tehsils, and villages used to validate extracted locations.
                  </p>
                ),
              },
              {
                id: "integrations",
                label: "Integration Status",
                icon: <Plug className="h-3.5 w-3.5" />,
                content: (
                  <div className="divide-y divide-slate-50">
                    {INTEGRATIONS.map((i) => (
                      <div key={i.name} className="flex items-center justify-between py-2.5">
                        <span className="text-sm text-navy-800">{i.name}</span>
                        <Badge tone={i.status === "Connected" ? "success" : "neutral"}>{i.status}</Badge>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                id: "config",
                label: "System Configuration",
                icon: <Settings2 className="h-3.5 w-3.5" />,
                content: (
                  <p className="text-sm text-slate-500">
                    Signed in as {CURRENT_USER.name} ({CURRENT_USER.role}). System-wide configuration is managed by Administrators.
                  </p>
                ),
              },
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
}
