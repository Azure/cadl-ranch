import { logger } from "../logger.js";
import pc from "picocolors";
import { findScenarioCadlFiles, loadScenarioMockApiFiles } from "../scenarios-resolver.js";
import { importCadl, importCadlRanchExpect } from "../cadl-utils/import-cadl.js";

export interface ValidateMockApisConfig {
  scenariosPath: string;
}

interface Diagnostic {
  message: string;
}

export interface Diagnosticreporter {
  readonly diagnostics: Diagnostic[];
  reportDiagnostic(diagnostic: Diagnostic): void;
}

function createDiagnosticReporter(): Diagnosticreporter {
  const diagnostics: Diagnostic[] = [];

  return {
    diagnostics,
    reportDiagnostic(diagnostic: Diagnostic) {
      logger.error(`${pc.red("✘")} ${diagnostic.message}`);
      diagnostics.push(diagnostic);
    },
  };
}

export async function validateMockApis({ scenariosPath }: ValidateMockApisConfig) {
  const mockApis = await loadScenarioMockApiFiles(scenariosPath);
  const scenarioFiles = await findScenarioCadlFiles(scenariosPath);

  const cadlCompiler = await importCadl(scenariosPath);
  const cadlRanchExpect = await importCadlRanchExpect(scenariosPath);
  const diagnostics = createDiagnosticReporter();
  for (const { name, cadlFilePath } of scenarioFiles) {
    logger.debug(`Found scenario "${cadlFilePath}"`);
    const program = await cadlCompiler.compile(cadlFilePath, cadlCompiler.NodeHost, {
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

    const scenarios = cadlRanchExpect.listScenarios(program as any);

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
  // Anne
  "models/collections-basic",
  "models/collections-models",
  "models/enum-properties",
  "models/inheritance",
  "models/readonly-properties",
  "models/roundtrip-basic",
  "models/nested-models",
  "models/primitive-properties",
  "models/optional-properties",
  "models/output-basic",
  "clients/interfaces",

  // Laurent
  "resiliency/dev-driven",
  "resiliency/srv-driven-1",
  "resiliency/srv-driven-2",
];
