import { simulateLatency } from "./api";
import { DOCUMENTS } from "../data/mockData";
import type { ProcessingStage } from "../types";

export async function getProcessingPipeline(documentId: string): Promise<ProcessingStage[]> {
  const doc = DOCUMENTS.find((d) => d.id === documentId) ?? DOCUMENTS[0];
  return simulateLatency(doc.stages);
}
