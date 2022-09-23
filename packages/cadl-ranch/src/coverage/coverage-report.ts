import { getPackageJson, getCommit } from "../utils/misc-utils.js";
import { ScenarioStatus, CoverageReport } from "./types.js";

export async function createCoverageReport(
  scenariosPath: string,
  results: Record<string, ScenarioStatus>,
): Promise<CoverageReport> {
  const pkg = await getPackageJson(scenariosPath);
  return {
    commit: getCommit(scenariosPath),
    version: pkg?.version ?? "?",
    results,
  };
}
