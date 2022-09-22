export interface ScenarioManifest {
  commit: string;
  version: string;
  scenarios: ScenarioData[];
}

export interface ScenarioData {
  name: string;
  scenarioDoc: string;
}
