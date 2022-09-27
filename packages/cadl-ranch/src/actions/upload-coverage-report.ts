import { CadlRanchCoverageClient, CoverageReport } from "@azure-tools/cadl-ranch-coverage-sdk";
import { logger } from "../logger.js";
import pc from "picocolors";
import { readFile } from "fs/promises";
import { DefaultAzureCredential } from "@azure/identity";

export interface UploadCoverageReportConfig {
  coverageFile: string;
  storageAccountName: string;
  generatorName: string;
  generatorVersion: string;
}

export async function uploadCoverageReport({
  coverageFile,
  storageAccountName,
  generatorName,
  generatorVersion,
}: UploadCoverageReportConfig) {
  const content = await readFile(coverageFile);
  const coverage: CoverageReport = JSON.parse(content.toString());

  const client = new CadlRanchCoverageClient(storageAccountName, new DefaultAzureCredential());
  await client.coverage.upload(generatorName, generatorVersion, coverage);

  logger.info(
    `${pc.green(
      "✓",
    )} Scenario coverage file "${coverageFile}" uploaded to ${storageAccountName} storage account for ${generatorName}@${generatorVersion}.`,
  );
}
