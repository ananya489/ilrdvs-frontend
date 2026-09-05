// ---------------------------------------------------------------------------
// Base API client.
//
// This project currently ships with mock implementations for every service.
// Each service module below is written so it can be swapped for a real
// HTTP call (e.g. `fetch("/api/documents")`) without changing any component
// that consumes it — components only depend on the exported function
// signatures and TypeScript types, never on how the data is fetched.
// ---------------------------------------------------------------------------

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

/** Simulates network latency for mock services so loading states are visible. */
export function simulateLatency<T>(data: T, ms = 450): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}
