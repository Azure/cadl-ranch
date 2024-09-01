import {
  CadlRanchCoverageClient,
  GeneratorMode,
  ResolvedCoverageReport,
  ScenarioData,
  ScenarioManifest,
  TableConfig,
  TableConfigs,
} from "@azure-tools/cadl-ranch-coverage-sdk";

const storageAccountName = "azuresdkcadlranch";

export type GeneratorNames =
  | "python"
  | "typescript/rlc"
  | "typescript/modular"
  | "csharp"
  | "@typespec/http-client-csharp"
  | "java"
  | "go"
  | "cpp"
  | "rust"
  | "test";
const query = new URLSearchParams(window.location.search);
const generatorNames: GeneratorNames[] = [
  "python",
  "typescript/rlc",
  "typescript/modular",
  "csharp",
  "@typespec/http-client-csharp",
  "java",
  "go",
  "cpp",
  "rust",
  ...(query.has("showtest") ? (["test"] as const) : []),
];

export interface CoverageSummary {
  manifest: ScenarioManifest;
  generatorReports: Record<GeneratorNames, ResolvedCoverageReport | undefined>;
  tableConfig: TableConfig;
}

let client: CadlRanchCoverageClient | undefined;
export function getCoverageClient() {
  if (client === undefined) {
    client = new CadlRanchCoverageClient(storageAccountName);
  }
  return client;
}

export async function getManifest(): Promise<ScenarioManifest> {
  const coverageClient = getCoverageClient();
  return await coverageClient.manifest.get();
}

export async function getCoverageSummaries(): Promise<CoverageSummary[]> {
  const coverageClient = getCoverageClient();
  const [manifest, generatorReports] = await Promise.all([
    coverageClient.manifest.get(),
    loadReports(coverageClient, generatorNames),
  ]);
  return TableConfigs.map((config) => {
    const copiedManifest: ScenarioManifest = JSON.parse(JSON.stringify(manifest));
    copiedManifest.scenarios = manifest.scenarios.filter((scenarioData: ScenarioData) =>
      config.scenarioFilter ? config.scenarioFilter(scenarioData.name) : () => true,
    );
    return {
      manifest: copiedManifest,
      generatorReports: generatorReports[config.mode],
      tableConfig: config,
    };
  });
}

async function loadReports(
  coverageClient: CadlRanchCoverageClient,
  generatorNames: GeneratorNames[],
): Promise<{ [mode: string]: Record<GeneratorNames, ResolvedCoverageReport | undefined> }> {
  const results = await Promise.all(
    Object.keys(GeneratorMode).map(
      async (mode): Promise<[string, Record<GeneratorNames, ResolvedCoverageReport | undefined>]> => {
        const items = await Promise.all(
          generatorNames.map(async (generatorName): Promise<[GeneratorNames, ResolvedCoverageReport | undefined]> => {
            try {
              const report = await coverageClient.coverage.getLatestCoverageFor(generatorName, mode);
              return [generatorName, report];
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error("Error resolving report", error);

              return [generatorName, undefined];
            }
          }),
        );
        return [mode, Object.fromEntries(items) as any];
      },
    ),
  );

  return results.reduce<{ [mode: string]: Record<GeneratorNames, ResolvedCoverageReport | undefined> }>(
    (results, [mode, reports]) => {
      results[mode] = reports;
      return results;
    },
    {},
  );
}
