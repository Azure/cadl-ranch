export interface ScenarioManifest {
  commit: string;
  version: string;
  scenarios: ScenarioData[];
}

export interface ScenarioData {
  name: string;
  scenarioDoc: string;
}

export type ScenarioStatus =
  // Scenario was tested and passed
  | "pass"
  // Scenario was tested and failed
  | "fail"
  // Scenario was not tested
  | "not-implemented"
  // Scenario is explicitly not supported by the generator
  | "not-supported"
  // Scenario is not applicable in current test.
  | "not-applicable";

export interface CoverageReport {
  /**
   * Metadata for the scenario set for this report.
   */
  scenariosMetadata: ScenariosMetadata;

  /**
   * Coverage result.
   */
  results: Record<string, ScenarioStatus>;
}

export interface ScenariosMetadata {
  version: string;
  commit: string;
}
