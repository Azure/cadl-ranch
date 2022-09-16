import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import { Scenario } from "@azure-tools/cadl-ranch-expect";
import { Operation } from "@cadl-lang/compiler";
import { join, relative, resolve } from "path";
import { pathToFileURL } from "url";
import { importCadl, importCadlRanchExpect, importCadlRest } from "./cadl-utils/index.js";
import { logger } from "./logger.js";
import { findFilesFromPattern } from "./utils/file-utils.js";
import {
  createDiagnosticReporter,
  Diagnostic,
  ensureScenariosPathExists,
  getSourceLocationStr,
} from "./utils/index.js";
import { normalizePath } from "./utils/path-utils.js";
import pc from "picocolors";

export interface MockApiFile {
  path: string;
  scenarios: Record<string, ScenarioMockApi>;
}

interface CadlRanchScenarioFile {
  name: string;
  cadlFilePath: string;
}

export async function findScenarioCadlFiles(scenariosPath: string): Promise<CadlRanchScenarioFile[]> {
  await ensureScenariosPathExists(scenariosPath);
  const pattern = `${normalizePath(scenariosPath)}/**/main.cadl`;
  logger.debug(`Looking for scenarios in ${pattern}`);
  const scenarios = await findFilesFromPattern(pattern);
  logger.info(`Found ${scenarios.length} scenarios.`);

  return scenarios.map((name) => ({
    name: normalizePath(relative(scenariosPath, name)).replace("/main.cadl", ""),
    cadlFilePath: resolve(scenariosPath, name),
  }));
}

export async function loadScenarios(scenariosPath: string): Promise<[Scenario[], readonly Diagnostic[]]> {
  const scenarioFiles = await findScenarioCadlFiles(scenariosPath);
  const cadlCompiler = await importCadl(scenariosPath);
  const cadlRanchExpect = await importCadlRanchExpect(scenariosPath);
  const cadlRest = await importCadlRest(scenariosPath);

  const scenarioNames = new Map<string, Scenario[]>();
  const endpoints = new Map<string, Operation[]>();
  const diagnostics = createDiagnosticReporter();

  for (const { name, cadlFilePath } of scenarioFiles) {
    logger.debug(`Found scenario "${cadlFilePath}"`);
    const program = await cadlCompiler.compile(cadlFilePath, cadlCompiler.NodeHost, {
      additionalImports: ["@azure-tools/cadl-ranch-expect"],
      noEmit: true,
      warningAsError: true,
    });

    if (program.diagnostics.length > 0) {
      for (const item of program.diagnostics) {
        const sourceLocation = cadlCompiler.getSourceLocation(item.target);
        diagnostics.reportDiagnostic({
          message: `${item.message}: ${sourceLocation && getSourceLocationStr(sourceLocation)}`,
        });
      }

      diagnostics.reportDiagnostic({
        message: `${pc.red("✘")} Scenario ${name} is invalid.`,
      });
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

  return [[...scenarioNames.values()].map((x) => x[0]), diagnostics.diagnostics];
}

export async function loadScenarioMockApiFiles(scenariosPath: string): Promise<MockApiFile[]> {
  const pattern = normalizePath(join(scenariosPath, "../dist/**/*.js"));
  logger.debug(`Looking for mock api files in ${pattern}`);
  const files = await findFilesFromPattern(pattern);
  logger.debug(`Detected ${files.length} mock api files: ${files}`);
  const results: MockApiFile[] = [];
  for (const file of files) {
    const result = await import(pathToFileURL(file).href);
    if (result.Scenarios) {
      logger.debug(`File '${file}' contains ${Object.keys(result.Scenarios).length} scenarios.`);
      results.push({
        path: file,
        scenarios: result.Scenarios,
      });
    } else {
      logger.debug(`File '${file}' is not exporting any scenarios.`);
    }
  }
  return results;
}

export async function loadScenarioMockApis(scenariosPath: string): Promise<Record<string, ScenarioMockApi>> {
  const files = await loadScenarioMockApiFiles(scenariosPath);
  const result: Record<string, ScenarioMockApi> = {};

  for (const file of files) {
    for (const [key, scenario] of Object.entries(file.scenarios)) {
      if (key in result) {
        logger.warn(`Scenario ${key} is being defined twice.`);
      }
      result[key] = scenario;
    }
  }
  return result;
}
