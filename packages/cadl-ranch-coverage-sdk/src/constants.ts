export enum GeneratorMode {
  azure = "azure",
  standard = "standard",
}
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
