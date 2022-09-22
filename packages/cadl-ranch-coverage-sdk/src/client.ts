import {
  AnonymousCredential,
  BlobServiceClient,
  BlockBlobClient,
  ContainerClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { TokenCredential } from "@azure/identity";
import { ScenarioManifest } from "./types.js";

export class CadlRanchCoverageClient {
  #container: ContainerClient;
  manifest: CadlRanchManifestOperations;

  constructor(
    storageAccountName: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
  ) {
    this.#container = getCoverageContainer(storageAccountName, credential);
    this.manifest = new CadlRanchManifestOperations(this.#container);
  }

  public async createIfNotExists() {
    await this.#container.createIfNotExists({
      access: "blob",
    });
  }
}

export class CadlRanchManifestOperations {
  #blob: BlockBlobClient;
  #container: ContainerClient;

  constructor(container: ContainerClient) {
    this.#container = container;
    this.#blob = this.#container.getBlockBlobClient("manifest.json");
  }

  public async upload(manifest: ScenarioManifest): Promise<void> {
    const content = JSON.stringify(manifest, null, 2);
    await this.#blob.upload(content, content.length, {
      blobHTTPHeaders: {
        blobContentType: "application/json; charset=utf-8",
      },
    });
  }

  public async get(): Promise<ScenarioManifest> {
    const blob = await this.#blob.download();
    const body = await blob.blobBody;
    const content = await body?.text();
    return content ? JSON.parse(content) : undefined;
  }
}

function getCoverageContainer(
  storageAccountName: string,
  credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
): ContainerClient {
  const blobSvc = new BlobServiceClient(`https://${storageAccountName}.blob.core.windows.net`, credential);
  const containerClient = blobSvc.getContainerClient(`coverages`);
  return containerClient;
}
