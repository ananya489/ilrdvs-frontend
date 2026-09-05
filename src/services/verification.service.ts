import { simulateLatency } from "./api";
import { VERIFICATION_TASKS } from "../data/mockData";
import type { VerificationTask } from "../types";

export interface VerificationFilters {
  onlyLowConfidence?: boolean;
  onlyValidationFailed?: boolean;
  onlyDuplicate?: boolean;
  onlyGisMismatch?: boolean;
  assignedToMe?: boolean;
  onlyHighPriority?: boolean;
  onlyOverdue?: boolean;
}

export async function listVerificationTasks(filters: VerificationFilters = {}): Promise<VerificationTask[]> {
  let items = [...VERIFICATION_TASKS];
  if (filters.onlyLowConfidence) items = items.filter((t) => t.flags.includes("low_confidence"));
  if (filters.onlyValidationFailed) items = items.filter((t) => t.flags.includes("validation_failed"));
  if (filters.onlyDuplicate) items = items.filter((t) => t.flags.includes("duplicate"));
  if (filters.onlyGisMismatch) items = items.filter((t) => t.flags.includes("gis_mismatch"));
  if (filters.onlyHighPriority) items = items.filter((t) => t.priority === "High");
  if (filters.onlyOverdue) items = items.filter((t) => t.flags.includes("overdue"));
  if (filters.assignedToMe) items = items.filter((t) => t.assignedTo === "A. Sharma");
  return simulateLatency(items);
}

export async function getVerificationTask(id: string): Promise<VerificationTask | undefined> {
  return simulateLatency(VERIFICATION_TASKS.find((t) => t.id === id));
}

export type VerificationDecision = "approve" | "reject" | "request_review";

export async function submitVerificationDecision(
  _taskId: string,
  _decision: VerificationDecision,
  _comment?: string
): Promise<void> {
  return simulateLatency(undefined, 600);
}
