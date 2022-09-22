import { CadlRanchCoverageClient, ScenarioManifest } from "@azure-tools/cadl-ranch-coverage-sdk";

const storageAccountName = "cadlranchcoverage";

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
