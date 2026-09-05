import { simulateLatency } from "./api";
import { STATE_PROGRESS, DISTRICT_PROGRESS } from "../data/mockData";

export async function getStateProgress() {
  return simulateLatency(STATE_PROGRESS);
}

export async function getDistrictProgress() {
  return simulateLatency(DISTRICT_PROGRESS);
}

export interface AnalyticsSummary {
  totalDigitized: number;
  processingSuccessRate: number;
  ocrConfidence: number;
  extractionConfidence: number;
  validationPassRate: number;
  humanVerificationRate: number;
  avgProcessingTimeMin: number;
  avgVerificationTimeMin: number;
  errorRate: number;
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  return simulateLatency({
    totalDigitized: 124560,
    processingSuccessRate: 94.7,
    ocrConfidence: 91.2,
    extractionConfidence: 88.4,
    validationPassRate: 88.2,
    humanVerificationRate: 35.7,
    avgProcessingTimeMin: 6.4,
    avgVerificationTimeMin: 11.8,
    errorRate: 3.1,
  });
}
