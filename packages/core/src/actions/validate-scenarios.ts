import { stat } from "fs/promises";
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
  const pattern = `${scenariosPath.replace(/\\/g, "/")}/*/main.cadl`;
  logger.debug(`Looking for scenarios in ${pattern}`);
  const scenarios = await findFilesFromPattern(pattern);
  logger.info(`Found ${scenarios.length} scenarios.`);

  const invalidScenarios = [];
  for (const name of scenarios) {
    const scenarioPath = resolve(scenariosPath, name);
    logger.debug(`Found scenario ${name} at "${scenarioPath}"`);
    const { exitCode, out } = await execAsync(process.platform === "win32" ? "npx.cmd" : "npx", [
      "cadl",
      "compile",
      scenarioPath,
      "--import",
      "@azure-tools/cadl.testserver-utils",
      "--warn-as-error",
      "--no-emit",
    ]);

    if (exitCode === 0) {
      logger.info(`${pc.green("✓")} Scenario ${name} is valid.`);
    } else {
      logger.error(out);
      logger.error(`${pc.red("✘")} Scenario ${name} is invalid.`);
      invalidScenarios.push(name);
    }
  }

  if (invalidScenarios.length > 0) {
    process.exit(-1);
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
