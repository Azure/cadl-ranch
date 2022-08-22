import { MockResponse, ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import { writeFile } from "fs/promises";
import { logger } from "../logger.js";
import { ScenarioStatus } from "./types.js";

export class CoverageTracker {
  private scenarios: Record<string, ScenarioMockApi> = {};
  private hits = new Map<string, Map<string, MockResponse>>();

  public constructor(private coverageFile: string) {}

  public setScenarios(scenarios: Record<string, ScenarioMockApi>) {
    this.scenarios = scenarios;
  }

  public async trackEndpointResponse(scenarioName: string, endpoint: string, response: MockResponse) {
    let scenarioHits = this.hits.get(scenarioName);
    if (scenarioHits === undefined) {
      scenarioHits = new Map();
      this.hits.set(scenarioName, scenarioHits);
    }

    scenarioHits.set(endpoint, response);
    await this.saveCoverage();
  }

  public commputeCoverage(): Record<string, ScenarioStatus> {
    const results: Record<string, ScenarioStatus> = {};

    for (const [name, mockApi] of Object.entries(this.scenarios)) {
      results[name] = this.computeScenarioStatus(name, mockApi);
    }
    return results;
  }

  private async saveCoverage() {
    const coverage = this.commputeCoverage();

    try {
      await writeFile(this.coverageFile, JSON.stringify(coverage, null, 2));
    } catch (e) {
      logger.warn("Error while saving coverage", e);
    }
  }

  private computeScenarioStatus(name: string, mockApi: ScenarioMockApi): ScenarioStatus {
    const scenarioHits = this.hits.get(name);
    switch (mockApi.passCondition) {
      case "response-success":
        return checkAll((x) => x.status >= 200 && x.status < 300);
      case "status-code":
        return checkAll((x) => x.status === mockApi.code);
      default:
        const _assertNever: never = mockApi;
        throw new Error("Unreachable");
    }

    function checkAll(condition: (res: MockResponse) => boolean): ScenarioStatus {
      for (const endpoint of mockApi.apis) {
        const hit = scenarioHits?.get(endpoint.uri);
        if (hit === undefined) {
          return "not-implemented";
        }

        if (!condition(hit)) {
          return "fail";
        }
      }

      return "pass";
    }
  }
}
