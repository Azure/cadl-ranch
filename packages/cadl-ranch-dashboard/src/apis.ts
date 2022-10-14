import { CadlRanchCoverageClient, CoverageReport, ScenarioManifest } from "@azure-tools/cadl-ranch-coverage-sdk";

const storageAccountName = "cadlranchcoverage";

export type GeneratorNames = "python" | "typescript" | "csharp" | "java" | "test";
const query = new URLSearchParams(window.location.search);
const generatorNames: GeneratorNames[] = [
  "python",
  "typescript",
  "csharp",
  "java",
  ...(query.has("showtest") ? (["test"] as const) : []),
];

export interface CoverageSummary {
  manifest: ScenarioManifest;
  generatorReports: Record<GeneratorNames, CoverageReport | undefined>;
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

export async function getCoverageSummary(): Promise<CoverageSummary> {
  const coverageClient = getCoverageClient();
  const [manifest, generatorReports] = await Promise.all([
    coverageClient.manifest.get(),
    loadReports(coverageClient, generatorNames),
  ]);
  return {
    manifest,
    generatorReports,
  };
}

async function loadReports(
  coverageClient: CadlRanchCoverageClient,
  generatorNames: GeneratorNames[],
): Promise<Record<GeneratorNames, CoverageReport | undefined>> {
  const items: [GeneratorNames, CoverageReport | undefined][] = await Promise.all(
    generatorNames.map(async (generatorName) => {
      try {
        const report = await coverageClient.coverage.getLatestCoverageFor(generatorName);
        return [generatorName, report];
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error resolving report", error);

        return [generatorName, undefined];
      }
    }),
  );

  return Object.fromEntries(items) as any;
}
