import { simulateLatency, ApiError } from "./api";
import { CURRENT_USER } from "../data/mockData";
import type { AppUser } from "../types";

export interface LoginRequest {
  employeeId: string;
  password: string;
}

export interface LoginResponse {
  user: AppUser;
  token: string;
}

// Replace with: return fetch(`${API_BASE_URL}/auth/login`, { method: "POST", body: JSON.stringify(req) })
export async function login(req: LoginRequest): Promise<LoginResponse> {
  if (!req.employeeId || !req.password) {
    throw new ApiError("Employee ID and password are required.", 400);
  }
  return simulateLatency({ user: CURRENT_USER, token: "mock-jwt-token" }, 700);
}

export async function logout(): Promise<void> {
  return simulateLatency(undefined, 200);
}

export async function getCurrentUser(): Promise<AppUser> {
  return simulateLatency(CURRENT_USER, 200);
}
