import { simulateLatency } from "./api";
import { DOCUMENTS } from "../data/mockData";
import type { LandDocument } from "../types";

export interface DocumentFilters {
  search?: string;
  state?: string;
  district?: string;
  status?: LandDocument["processingStatus"];
  validationStatus?: LandDocument["validationStatus"];
  page?: number;
  pageSize?: number;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// Replace with: fetch(`${API_BASE_URL}/documents?...`)
export async function listDocuments(filters: DocumentFilters = {}): Promise<PagedResult<LandDocument>> {
  let items = [...DOCUMENTS];
  if (filters.search) {
    const q = filters.search.toLowerCase();
    items = items.filter(
      (d) =>
        d.fileName.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.location.village.toLowerCase().includes(q)
    );
  }
  if (filters.state) items = items.filter((d) => d.location.state === filters.state);
  if (filters.district) items = items.filter((d) => d.location.district === filters.district);
  if (filters.status) items = items.filter((d) => d.processingStatus === filters.status);
  if (filters.validationStatus) items = items.filter((d) => d.validationStatus === filters.validationStatus);

  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 10;
  const total = items.length;
  const start = (page - 1) * pageSize;
  const paged = items.slice(start, start + pageSize);

  return simulateLatency({ items: paged, total, page, pageSize });
}

export async function getDocumentById(id: string): Promise<LandDocument | undefined> {
  return simulateLatency(DOCUMENTS.find((d) => d.id === id));
}

export interface UploadMeta {
  documentType: string;
  state: string;
  district: string;
  tehsil: string;
  village: string;
  year?: string;
}

export async function uploadDocument(_file: File, _meta: UploadMeta): Promise<{ id: string }> {
  return simulateLatency({ id: `DOC-2024-${Math.floor(1000 + Math.random() * 8999)}` }, 900);
}
