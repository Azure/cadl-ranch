import { CoverageReport, ScenarioStatus } from "@azure-tools/cadl-ranch-coverage-sdk";
import { getScenarioMetadata } from "./common.js";

export async function createCoverageReport(
  scenariosPath: string,
  results: Record<string, ScenarioStatus>,
): Promise<CoverageReport> {
  return {
    scenariosMetadata: await getScenarioMetadata(scenariosPath),
    results,
  };
}
