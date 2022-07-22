import { join, resolve } from "path";
import { logger } from "../logger.js";
import { execAsync } from "../utils/exec.js";
import pc from "picocolors";
import { findFilesFromPattern } from "../utils/file-utils.js";
import { ensureScenariosPathExists } from "../utils/index.js";
import { normalizePath } from "../utils/path-utils.js";

export interface ValidateScenarioConfig {
  scenariosPath: string;
}

export async function validateScenarios({ scenariosPath }: ValidateScenarioConfig) {
  await ensureScenariosPathExists(scenariosPath);
  const pattern = `${normalizePath(scenariosPath)}/**/main.cadl`;
  logger.debug(`Looking for scenarios in ${pattern}`);
  const scenarios = await findFilesFromPattern(pattern);
  logger.info(`Found ${scenarios.length} scenarios.`);

  const invalidScenarios = [];
  for (const name of scenarios) {
    const scenarioPath = resolve(scenariosPath, name);
    logger.debug(`Found scenario ${name} at "${scenarioPath}"`);
    const base = join(process.cwd(), "node_modules", ".bin", "cadl");
    const cmd = process.platform === "win32" ? `${base}.cmd` : base;
    const args = [
      "compile",
      scenarioPath,
      "--import",
      "@azure-tools/cadl-ranch-expect",
      "--warn-as-error",
      "--no-emit",
    ];
    logger.debug(`Running: ${cmd} ${args.join(" ")}`);

    const { exitCode, out } = await execAsync(cmd, args);

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
