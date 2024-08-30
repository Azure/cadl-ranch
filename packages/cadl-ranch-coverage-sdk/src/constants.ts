export enum GeneratorMode {
  azure = "azure",
  standard = "standard",
}
export const TableConfigs: TableConfig[] = [
  { mode: GeneratorMode.azure, scenarioFilter: (name) => !name.startsWith("Azure_ResourceManager_") },
  { mode: GeneratorMode.azure, scenarioFilter: (name) => name.startsWith("Azure_ResourceManager_") },
  { mode: GeneratorMode.standard, scenarioFilter: (name) => !name.startsWith("Azure_ResourceManager_") },
];

export interface TableConfig {
  mode: GeneratorMode;
  scenarioFilter?: (scenarioName: string) => boolean;
}
