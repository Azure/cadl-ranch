import { MockResponse, ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import { logger } from "../logger.js";
import { CoverageReport, ScenariosMetadata, ScenarioStatus } from "@azure-tools/cadl-ranch-coverage-sdk";
import { writeFileSync } from "fs";

export class CoverageTracker {
  private scenarios: Record<string, ScenarioMockApi> = {};
  private hits = new Map<string, Map<string, MockResponse>>();
  private scenariosMetadata: ScenariosMetadata = { commit: "", version: "" };

  public constructor(private coverageFile: string) {
    process.on("exit", () => {
      logger.info("Saving coverage");
      this.saveCoverageSync();
      logger.info("Coverage saved!");
    });
  }

  public setScenarios(scenariosMetadata: ScenariosMetadata, scenarios: Record<string, ScenarioMockApi>) {
    this.scenariosMetadata = scenariosMetadata;
    this.scenarios = scenarios;
  }

  public async trackEndpointResponse(scenarioName: string, endpoint: string, response: MockResponse) {
    let scenarioHits = this.hits.get(scenarioName);
    if (scenarioHits === undefined) {
      scenarioHits = new Map();
      this.hits.set(scenarioName, scenarioHits);
    }

    scenarioHits.set(endpoint, response);
  }

  public computeCoverage(): CoverageReport {
    const results: Record<string, ScenarioStatus> = {};

    for (const [name, mockApi] of Object.entries(this.scenarios)) {
      results[name] = this.computeScenarioStatus(name, mockApi);
    }
    return {
      scenariosMetadata: this.scenariosMetadata,
      results,
    };
  }

  private saveCoverageSync() {
    const coverage = this.computeCoverage();

    try {
      writeFileSync(this.coverageFile, JSON.stringify(coverage, null, 2));
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
