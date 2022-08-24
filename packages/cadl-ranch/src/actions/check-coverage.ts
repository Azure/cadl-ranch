import { readFile } from "fs/promises";
import { loadCadlRanchConfig } from "../config/config.js";
import { CoverageResult } from "../coverage/types.js";
import { loadScenarioMockApis } from "../scenarios-resolver.js";
import { createDiagnosticReporter, findFilesFromPattern } from "../utils/index.js";

export interface CheckCoverageConfig {
  scenariosPath: string;
  configFile?: string;
  coverageFiles: string[];
  mergedCoverageFile: string;
  ignoreNotImplemented?: boolean;
}

export async function checkCoverage(config: CheckCoverageConfig) {
  const inputCoverageFiles = (await Promise.all(config.coverageFiles.map((x) => findFilesFromPattern(x)))).flat();

  const coverage: CoverageResult = {};
  const diagnosticsReporter = createDiagnosticReporter();
  const scenarios = await loadScenarioMockApis(config.scenariosPath);

  for (const scenarioName of Object.keys(scenarios)) {
    coverage[scenarioName] = "not-implemented";
  }

  if (config.configFile) {
    const [cadlRanchConfig, diagnostics] = await loadCadlRanchConfig(config.configFile);
    diagnosticsReporter.reportDiagnostics(diagnostics);

    for (const scenarioName of cadlRanchConfig.unsupportedScenarios) {
      coverage[scenarioName] = "not-supported";
    }
  }

  for (const coverageFile of inputCoverageFiles) {
    const content = await readFile(coverageFile);
    const inputCoverage: CoverageResult = JSON.parse(content.toString());

    for (const [scenarioName, scenarioStatus] of Object.entries(inputCoverage)) {
      const existing = coverage[scenarioName];
      if (existing === undefined) {
        diagnosticsReporter.reportDiagnostic({
          message: `Scenario ${scenarioName} with coverage in file "${coverageFile}" is not defined in the scenarios in path "${config.scenariosPath}".`,
        });
        continue;
      }

      switch (scenarioStatus) {
        case "fail":
          coverage[scenarioName] = "fail";
          diagnosticsReporter.reportDiagnostic({
            message: `Scenario ${scenarioName} failed in "${coverageFile}".`,
          });
          break;
        case "pass":
        case "not-applicable":
        case "not-supported":
          if (existing === "not-implemented") {
            coverage[scenarioName] = scenarioStatus;
          }
          break;
        case "not-implemented":
        // nothing
      }
    }
  }

  if (!config.ignoreNotImplemented) {
    for (const [scenarioName, scenarioStatus] of Object.entries(coverage)) {
      if (scenarioStatus === "not-implemented") {
        diagnosticsReporter.reportDiagnostic({
          message: `Scenario ${scenarioName} is not implemented.`,
        });
      }
    }
  }

  if (diagnosticsReporter.diagnostics.length) {
    process.exit(1);
  }
}
