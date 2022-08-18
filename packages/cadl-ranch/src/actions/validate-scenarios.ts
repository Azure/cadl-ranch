import { logger } from "../logger.js";
import pc from "picocolors";
import { createDiagnosticReporter, ensureScenariosPathExists } from "../utils/index.js";
import { findScenarioCadlFiles } from "../scenarios-resolver.js";
import { importCadl, importCadlRanchExpect } from "../cadl-utils/import-cadl.js";
import { Scenario } from "@azure-tools/cadl-ranch-expect";

export interface ValidateScenarioConfig {
  scenariosPath: string;
}

export async function validateScenarios({ scenariosPath }: ValidateScenarioConfig) {
  await ensureScenariosPathExists(scenariosPath);
  const scenarioFiles = await findScenarioCadlFiles(scenariosPath);
  const invalidScenarios = [];
  const cadlCompiler = await importCadl(scenariosPath);
  const scenarioNames = new Map<string, Scenario[]>();
  const endpoints = new Map<string, Scenario[]>();
  const diagnostics = createDiagnosticReporter();

  for (const { name, cadlFilePath } of scenarioFiles) {
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
      continue;
    }

    const cadlRanchExpect = await importCadlRanchExpect(scenariosPath);
    const scenarios = cadlRanchExpect.listScenarios(program);

    for (const scenario of scenarios) {
      const existing = scenarioNames.get(scenario.name);
      if (existing) {
        existing.push(scenario);
      } else {
        scenarioNames.set(scenario.name, [scenario]);
      }
    }
  }

  for (const [name, scenarios] of scenarioNames.entries()) {
    if (scenarios.length > 1) {
      for (const scenario of scenarios) {
        diagnostics.reportDiagnostic({
          message: `Duplicate scenario name "${name}".`,
          target: scenario.target,
        });
      }
    }
  }

  if (invalidScenarios.length > 0 || diagnostics.diagnostics.length > 0) {
    process.exit(-1);
  }
}
