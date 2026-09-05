import { simulateLatency } from "./api";
import { LAND_RECORDS } from "../data/mockData";
import type { LandRecord } from "../types";

export interface RecordSearchFilters {
  owner?: string;
  surveyNumber?: string;
  khasraNumber?: string;
  khataNumber?: string;
  village?: string;
  tehsil?: string;
  district?: string;
  state?: string;
  status?: LandRecord["status"];
  page?: number;
  pageSize?: number;
}

export async function searchRecords(filters: RecordSearchFilters = {}) {
  let items = [...LAND_RECORDS];
  if (filters.owner) items = items.filter((r) => r.owner.toLowerCase().includes(filters.owner!.toLowerCase()));
  if (filters.surveyNumber) items = items.filter((r) => r.surveyNumber.includes(filters.surveyNumber!));
  if (filters.khasraNumber) items = items.filter((r) => r.khasraNumber.includes(filters.khasraNumber!));
  if (filters.khataNumber) items = items.filter((r) => r.khataNumber.includes(filters.khataNumber!));
  if (filters.village) items = items.filter((r) => r.location.village === filters.village);
  if (filters.district) items = items.filter((r) => r.location.district === filters.district);
  if (filters.state) items = items.filter((r) => r.location.state === filters.state);
  if (filters.status) items = items.filter((r) => r.status === filters.status);

  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 10;
  const total = items.length;
  const start = (page - 1) * pageSize;
  return simulateLatency({ items: items.slice(start, start + pageSize), total, page, pageSize });
}

export async function getRecordById(id: string): Promise<LandRecord | undefined> {
  return simulateLatency(LAND_RECORDS.find((r) => r.id === id));
}
