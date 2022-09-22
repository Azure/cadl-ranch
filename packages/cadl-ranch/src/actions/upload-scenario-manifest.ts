import { computeScenarioManifest } from "../coverage/scenario-manifest.js";
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";
import { logger } from "../logger.js";
import pc from "picocolors";

export interface UploadScenarioManifestConfig {
  scenariosPath: string;
  storageAccountName: string;
}

export async function uploadScenarioManifest({ scenariosPath, storageAccountName }: UploadScenarioManifestConfig) {
  const [manifest, diagnostics] = await computeScenarioManifest(scenariosPath);

  if (diagnostics.length > 0) {
    process.exit(-1);
  }

  const containerClient = await getCoverageBlob(storageAccountName);
  const blockBlobClient = containerClient.getBlockBlobClient("manifest.json");

  const content = JSON.stringify(manifest, null, 2);
  await blockBlobClient.upload(content, content.length, {
    blobHTTPHeaders: {
      blobContentType: "application/json; charset=utf-8",
    },
  });

  logger.info(`${pc.green("✓")} Scenario manifest uploaded to ${storageAccountName} storage account.`);
}

export async function getCoverageBlob(storageAccountName: string): Promise<ContainerClient> {
  const blobSvc = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net`,
    new DefaultAzureCredential(),
  );
  const containerClient = blobSvc.getContainerClient(`coverages`);
  await containerClient.createIfNotExists({
    access: "blob",
  });
  return containerClient;
}
