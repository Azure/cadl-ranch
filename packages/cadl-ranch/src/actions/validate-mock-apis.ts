import { logger } from "../logger.js";
import pc from "picocolors";
import { findScenarioCadlFiles, loadScenarioMockApiFiles } from "../scenarios-resolver.js";
import { importCadl, importCadlRanchExpect } from "../cadl-utils/import-cadl.js";
import { createDiagnosticReporter } from "../utils/diagnostic-reporter.js";

export interface ValidateMockApisConfig {
  scenariosPath: string;
}

export async function validateMockApis({ scenariosPath }: ValidateMockApisConfig) {
  const mockApis = await loadScenarioMockApiFiles(scenariosPath);
  const scenarioFiles = await findScenarioCadlFiles(scenariosPath);

  const cadlCompiler = await importCadl(scenariosPath);
  const cadlRanchExpect = await importCadlRanchExpect(scenariosPath);
  const diagnostics = createDiagnosticReporter();
  for (const { name, cadlFilePath } of scenarioFiles) {
    logger.debug(`Found scenario "${cadlFilePath}"`);
    const program = await cadlCompiler.compile(cadlCompiler.NodeHost, cadlFilePath, {
      noEmit: true,
      warningAsError: true,
    });

    if (program.diagnostics.length > 0) {
      cadlCompiler.logDiagnostics(program.diagnostics, { log: logger.error });
      diagnostics.reportDiagnostic({
        message: `Scenario ${name} is invalid.`,
      });
      continue;
    }

    // THIS IS FOR BACK SUPPORT ONLY DO NOT ADD ANY NEW IGNORE. IMPLEMENT THE API.
    if (NOT_IMPLEMENTED.some((x) => name.includes(x))) {
      logger.warn(`${pc.yellow("✓")} Scenario ${name} is being ignored as not having mock api implemented.`);
      continue;
    }

    const mockApiFile = mockApis.find((x) => x.path.includes(`/${name}`));
    if (mockApiFile === undefined) {
      diagnostics.reportDiagnostic({
        message: `Scenario ${name} is missing a mockapi file. Make sure to have a mockapi.ts that is built.`,
      });
      continue;
    }

    const scenarios = cadlRanchExpect.listScenarios(program);

    let foundFailure = false;
    for (const scenario of scenarios) {
      if (mockApiFile.scenarios[scenario.name] === undefined) {
        foundFailure = true;
        diagnostics.reportDiagnostic({
          message: `Scenario ${scenario.name} is missing implementation in for ${name} scenario file.`,
        });
      }
    }

    if (!foundFailure) {
      logger.info(`${pc.green("✓")} Scenario ${name} has all implemented mock apis.`);
    }
  }

  if (diagnostics.diagnostics.length) {
    process.exit(1);
  }
}

// THIS IS FOR BACK SUPPORT ONLY DO NOT ADD ANY NEW IGNORE. IMPLEMENT THE API.
const NOT_IMPLEMENTED = [
  // Laurent
  "resiliency/srv-driven-1",
  "resiliency/srv-driven-2",
];
