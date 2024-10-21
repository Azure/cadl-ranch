import { GeneratorMode } from "@azure-tools/cadl-ranch-coverage-sdk";

export const Colors = {
  bgSubtle: "#f7f7f7",
  borderDefault: "#f0f0f0",
  lightText: "#555",

  good: "#5E9732",
  ok: "#73A773",
  average: "#b5ad4f",
  warning: "#f7b32b",
  strongWarning: "#f37931",
  error: "#ef3e36",
};

/**
 * Ratio of coverage for a group
 */
export const GroupRatios = {
  perfect: 1,
  good: 0.8,
  average: 0.5,
  bad: 0.01,
  zero: 0,
};

export const GroupRatioColors: Record<keyof typeof GroupRatios, string> = {
  perfect: Colors.good,
  good: Colors.ok,
  average: Colors.warning,
  bad: Colors.strongWarning,
  zero: Colors.error,
};

export const ScenarioStatusColors = {
  pass: Colors.good,
  notImplemented: Colors.error,
  notReported: Colors.error,
  notApplicable: Colors.borderDefault,
  notSupported: Colors.borderDefault,
  fail: Colors.error,
};

export const TableConfigs: TableConfig[] = [
  {
    mode: GeneratorMode.azure,
    scenarioFilter: (name) => !name.startsWith("Azure_ResourceManager_"),
    name: "Azure DPG",
  },
  { mode: GeneratorMode.azure, scenarioFilter: (name) => name.startsWith("Azure_ResourceManager_"), name: "Azure MPG" },
  {
    mode: GeneratorMode.standard,
    scenarioFilter: (name) => !name.startsWith("Azure_ResourceManager_"),
  },
];

export interface TableConfig {
  mode: GeneratorMode;
  scenarioFilter?: (scenarioName: string) => boolean;
  name?: string;
}
