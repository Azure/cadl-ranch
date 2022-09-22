import { BlobServiceClient } from "@azure/storage-blob";

const storageAccountName = "cadlranchcoverage";
const blobUrl = `https://${storageAccountName}.blob.core.windows.net`;

let client: BlobServiceClient | undefined;
export function getStorageClient() {
  if (client === undefined) {
    client = new BlobServiceClient(blobUrl);
  }
  return client;
}

export function getCoverageBlobContainer() {
  return getStorageClient().getContainerClient(`coverages`);
}

// TODO use common place with `cadl-ranch
export interface ScenarioManifest {
  commit: string;
  version: string;
  scenarios: ScenarioData[];
}

export interface ScenarioData {
  name: string;
  scenarioDoc: string;
}

export async function getManifest(): Promise<ScenarioManifest> {
  const containerClient = getStorageClient().getContainerClient(`coverages`);

  const blob = await containerClient.getBlobClient("manifest.json").download();
  const body = await blob.blobBody;
  const content = await body?.text();
  return content ? JSON.parse(content) : undefined;
}
