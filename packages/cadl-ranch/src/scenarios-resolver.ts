import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import { join } from "path";
import { pathToFileURL } from "url";
import { logger } from "./logger.js";
import { findFilesFromPattern } from "./utils/file-utils.js";
import { normalizePath } from "./utils/path-utils.js";

export interface MockApiFile {
  path: string;
  scenarios: Record<string, ScenarioMockApi>;
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
