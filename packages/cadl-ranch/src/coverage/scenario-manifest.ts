import { Scenario } from "@azure-tools/cadl-ranch-expect";
import { loadScenarios } from "../scenarios-resolver.js";
import { Diagnostic } from "../utils/diagnostic-reporter.js";
import { getCommit, getPackageJson } from "../utils/misc-utils.js";
import { ScenarioManifest } from "./types.js";

export async function computeScenarioManifest(
  scenariosPath: string,
): Promise<[ScenarioManifest | undefined, readonly Diagnostic[]]> {
  const [scenarios, diagnostics] = await loadScenarios(scenariosPath);
  if (diagnostics.length > 0) {
    return [undefined, diagnostics];
  }

  const commit = getCommit(scenariosPath);
  const pkg = await getPackageJson(scenariosPath);
  return [createScenarioManifest(pkg?.version ?? "?", commit, scenarios), []];
}

export function createScenarioManifest(version: string, commit: string, scenarios: Scenario[]): ScenarioManifest {
  return {
    version,
    commit,
    scenarios: scenarios.map(({ name, scenarioDoc }) => {
      return { name, scenarioDoc };
    }),
  };
}
