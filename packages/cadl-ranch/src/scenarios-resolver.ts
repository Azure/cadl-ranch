import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import { Scenario } from "@azure-tools/cadl-ranch-expect";
import { Operation } from "@typespec/compiler";
import { join, relative, resolve, dirname } from "path";
import { pathToFileURL } from "url";
import { importTypeSpec, importCadlRanchExpect, importTypeSpecHttp } from "./cadl-utils/index.js";
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
  const normalizedScenarioPath = normalizePath(scenariosPath);
  const pattern = [`${normalizedScenarioPath}/**/client.tsp`, `${normalizedScenarioPath}/**/main.tsp`];
  logger.debug(`Looking for scenarios in ${pattern}`);
  const fullScenarios = await findFilesFromPattern(pattern);
  const scenarioSet = new Set(fullScenarios);
  const scenarios = fullScenarios.filter((scenario) => {
    // Exclude main.tsp that have a client.tsp next to it, we should use that instead
    return scenario.endsWith("/main.tsp") && scenarioSet.has(normalizePath(join(dirname(scenario), "client.tsp")));
  });

  logger.info(`Found ${scenarios.length} scenarios.`);

  return scenarios.map((name) => ({
    name: normalizePath(relative(scenariosPath, name)).replace("/main.tsp", "").replace("/client.tsp", ""),
    cadlFilePath: resolve(scenariosPath, name),
  }));
}

export async function loadScenarios(scenariosPath: string): Promise<[Scenario[], readonly Diagnostic[]]> {
  const scenarioFiles = await findScenarioCadlFiles(scenariosPath);
  const typespecCompiler = await importTypeSpec(scenariosPath);
  const cadlRanchExpect = await importCadlRanchExpect(scenariosPath);
  const typespecHttp = await importTypeSpecHttp(scenariosPath);

  const scenarioNames = new Map<string, Scenario[]>();
  const endpoints = new Map<string, Operation[]>();
  const diagnostics = createDiagnosticReporter();

  for (const { name, cadlFilePath } of scenarioFiles) {
    logger.debug(`Found scenario "${cadlFilePath}"`);
    const program = await typespecCompiler.compile(typespecCompiler.NodeHost, cadlFilePath, {
      additionalImports: ["@azure-tools/cadl-ranch-expect"],
      noEmit: true,
      warningAsError: true,
    });

    // Workaround https://github.com/Azure/cadl-azure/issues/2458
    const programDiagnostics = program.diagnostics.filter(
      (d) =>
        !(
          d.code === "@azure-tools/typespec-azure-core/casing-style" &&
          typeof d.target === "object" &&
          "kind" in d.target &&
          d.target.kind === "Namespace" &&
          d.target.name === "DPG"
        ),
    );

    if (programDiagnostics.length > 0) {
      for (const item of programDiagnostics) {
        const sourceLocation = typespecCompiler.getSourceLocation(item.target);
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
    logger.debug(`  ${scenarios.length} scenarios`);

    for (const scenario of scenarios) {
      const existing = scenarioNames.get(scenario.name);
      if (existing) {
        existing.push(scenario);
      } else {
        scenarioNames.set(scenario.name, [scenario]);
      }
    }

    const service = typespecCompiler.ignoreDiagnostics(typespecHttp.getAllHttpServices(program))[0];
    const server = typespecHttp.getServers(program, service.namespace)?.[0];
    if (server?.url === undefined || !server?.url.includes("{")) {
      const serverPath = server ? new URL(server.url).pathname : "";
      for (const route of service.operations) {
        const path = serverPath + route.path;
        const key = `${route.verb} ${path}`;
        const existing = endpoints.get(key);
        if (existing) {
          existing.push(route.operation);
        } else {
          endpoints.set(key, [route.operation]);
        }
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
