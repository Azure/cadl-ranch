import { getScenarioMetadata } from "./common.js";
import { ScenarioStatus, CoverageReport } from "./types.js";

export async function createCoverageReport(
  scenariosPath: string,
  results: Record<string, ScenarioStatus>,
): Promise<CoverageReport> {
  return {
    scenariosMetadata: await getScenarioMetadata(scenariosPath),
    results,
  };
}
