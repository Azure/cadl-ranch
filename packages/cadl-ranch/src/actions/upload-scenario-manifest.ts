import { computeScenarioManifest } from "../coverage/scenario-manifest.js";
import { CadlRanchCoverageClient } from "@azure-tools/cadl-ranch-coverage-sdk";
import { logger } from "../logger.js";
import pc from "picocolors";

export interface UploadScenarioManifestConfig {
  scenariosPath: string;
  storageAccountName: string;
}

export async function uploadScenarioManifest({ scenariosPath, storageAccountName }: UploadScenarioManifestConfig) {
  const [manifest, diagnostics] = await computeScenarioManifest(scenariosPath);

  if (manifest === undefined || diagnostics.length > 0) {
    process.exit(-1);
  }
  const client = new CadlRanchCoverageClient(storageAccountName);
  await client.createIfNotExists();
  await client.manifest.upload(manifest);

  logger.info(`${pc.green("✓")} Scenario manifest uploaded to ${storageAccountName} storage account.`);
}
