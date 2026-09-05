import { simulateLatency } from "./api";
import { AUDIT_LOG } from "../data/mockData";
import type { AuditEntry } from "../types";

export async function listAuditLog(documentId?: string): Promise<AuditEntry[]> {
  const items = documentId ? AUDIT_LOG.filter((a) => a.documentId === documentId) : AUDIT_LOG;
  return simulateLatency(items);
}
