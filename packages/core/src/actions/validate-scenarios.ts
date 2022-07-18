import { stat, readdir } from "fs/promises";
import { resolve } from "path";
import { logger } from "../logger.js";
import { execAsync } from "../utils/exec.js";
import pc from "picocolors";
import { findFilesFromPattern } from "../utils/file-utils.js";

export interface ValidateScenarioConfig {
  scenariosPath: string;
}

export async function validateScenarios({ scenariosPath }: ValidateScenarioConfig) {
  await ensureScenariosPathExists(scenariosPath);
  const scenarios = await findFilesFromPattern(`${scenariosPath}/**/main.cadl`);
  logger.info(`Found ${scenarios.length} scenarios.`);

  for (const name of scenarios) {
    const scenarioPath = resolve(scenariosPath, name);
    logger.debug("Found scenario", name, scenarioPath);
    const { exitCode, out } = await execAsync("npx", [
      "cadl",
      "compile",
      scenarioPath,
      "--import",
      "@azure-tools/cadl.testserver-utils",
    ]);

    if (exitCode === 0) {
      logger.info(`${pc.green("✓")} Scenario ${name} is valid.`);
    } else {
      logger.error(out);
      logger.error(`${pc.red("✘")} Scenario ${name} is invalid.`);
    }
  }
}

async function ensureScenariosPathExists(scenariosPath: string) {
  try {
    const stats = await stat(scenariosPath);
    if (!stats.isDirectory()) {
      throw new Error(`Scenarios path ${scenariosPath} is not a directory.`);
    }
  } catch (e) {
    throw new Error(`Scenarios path ${scenariosPath} doesn't exists.`);
  }
}
