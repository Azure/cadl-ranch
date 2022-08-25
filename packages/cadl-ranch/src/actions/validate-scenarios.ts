import { logger } from "../logger.js";
import pc from "picocolors";
import { createDiagnosticReporter, ensureScenariosPathExists, getSourceLocationStr } from "../utils/index.js";
import { findScenarioCadlFiles } from "../scenarios-resolver.js";
import { importCadl, importCadlRanchExpect, importCadlRest } from "../cadl-utils/import-cadl.js";
import { Scenario } from "@azure-tools/cadl-ranch-expect";
import { OperationType } from "@cadl-lang/compiler";

export interface ValidateScenarioConfig {
  scenariosPath: string;
}

export async function validateScenarios({ scenariosPath }: ValidateScenarioConfig) {
  await ensureScenariosPathExists(scenariosPath);
  const scenarioFiles = await findScenarioCadlFiles(scenariosPath);
  const invalidScenarios = [];
  const cadlCompiler = await importCadl(scenariosPath);
  const cadlRanchExpect = await importCadlRanchExpect(scenariosPath);
  const cadlRest = await importCadlRest(scenariosPath);

  const scenarioNames = new Map<string, Scenario[]>();
  const endpoints = new Map<string, OperationType[]>();
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
      cadlCompiler.logDiagnostics(program.diagnostics, {
        log: (item) =>
          logger.error(`${item.message}: ${item.sourceLocation && getSourceLocationStr(item.sourceLocation)}`),
      });
      logger.error(`${pc.red("✘")} Scenario ${name} is invalid.`);
      invalidScenarios.push(name);
      continue;
    }

    const scenarios = cadlRanchExpect.listScenarios(program);

    for (const scenario of scenarios) {
      const existing = scenarioNames.get(scenario.name);
      if (existing) {
        existing.push(scenario);
      } else {
        scenarioNames.set(scenario.name, [scenario]);
      }
    }
    for (const route of cadlRest.http.getAllRoutes(program)[0]) {
      const key = `${route.verb} ${route.path}`;
      const existing = endpoints.get(key);
      if (existing) {
        existing.push(route.operation);
      } else {
        endpoints.set(key, [route.operation]);
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

  for (const [path, operations] of endpoints.entries()) {
    if (operations.length > 1) {
      for (const operation of operations) {
        diagnostics.reportDiagnostic({
          message: `Duplicate endpoint path "${path}".`,
          target: operation,
        });
      }
    }
  }

  if (invalidScenarios.length > 0 || diagnostics.diagnostics.length > 0) {
    process.exit(-1);
  }
}
