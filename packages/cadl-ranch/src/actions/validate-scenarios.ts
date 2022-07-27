import { logger } from "../logger.js";
import pc from "picocolors";
import { ensureScenariosPathExists } from "../utils/index.js";
import { findScenarioCadlFiles } from "../scenarios-resolver.js";
import { importCadl } from "../cadl-utils/import-cadl.js";

export interface ValidateScenarioConfig {
  scenariosPath: string;
}

export async function validateScenarios({ scenariosPath }: ValidateScenarioConfig) {
  await ensureScenariosPathExists(scenariosPath);
  const scenarios = await findScenarioCadlFiles(scenariosPath);
  const invalidScenarios = [];
  const cadlCompiler = await importCadl(scenariosPath);
  for (const { name, cadlFilePath } of scenarios) {
    logger.debug(`Found scenario "${cadlFilePath}"`);
    const program = await cadlCompiler.compile(cadlFilePath, cadlCompiler.NodeHost, {
      additionalImports: ["@azure-tools/cadl-ranch-expect"],
      noEmit: true,
      warningAsError: true,
    });

    if (program.diagnostics.length === 0) {
      logger.info(`${pc.green("✓")} Scenario ${name} is valid.`);
    } else {
      cadlCompiler.logDiagnostics(program.diagnostics, { log: logger.error });
      logger.error(`${pc.red("✘")} Scenario ${name} is invalid.`);
      invalidScenarios.push(name);
    }
  }

  if (invalidScenarios.length > 0) {
    process.exit(-1);
  }
}
