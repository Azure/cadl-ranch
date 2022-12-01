import { RequestExt, ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import { Response, Router } from "express";
import { getScenarioMetadata } from "../coverage/common.js";
import { CoverageTracker } from "../coverage/coverage-tracker.js";
import { internalRouter } from "../routes/index.js";
import { loadScenarioMockApis } from "../scenarios-resolver.js";
import { MockApiServer } from "../server/index.js";
import { ApiMockAppConfig } from "./config.js";
import { processRequest, processRequestWithoutCoverage } from "./request-processor.js";

export class MockApiApp {
  private router = Router();
  private server: MockApiServer;
  private coverageTracker: CoverageTracker;

  constructor(private config: ApiMockAppConfig) {
    this.server = new MockApiServer({ port: config.port });
    this.coverageTracker = new CoverageTracker(config.coverageFile);
  }

  public async start(): Promise<void> {
    this.server.use("/", internalRouter);

    const scenarios = await loadScenarioMockApis(this.config.scenarioPath);
    this.coverageTracker.setScenarios(await getScenarioMetadata(this.config.scenarioPath), scenarios);
    for (const [name, scenario] of Object.entries(scenarios)) {
      this.registerScenario(name, scenario);
    }

    if (this.config.additionalMockApiPath)
    {
      const additionalScenarios = await loadScenarioMockApis(this.config.additionalMockApiPath);
      for (const [_, scenario] of Object.entries(additionalScenarios)) {
        this.registerScenarioWithoutCoverage(scenario);
      }
    }
    
    this.router.get("/.coverage", (req, res) => {
      res.json(this.coverageTracker.computeCoverage());
    });

    this.server.use("/", this.router);
    this.server.start();
  }

  private registerScenario(name: string, scenario: ScenarioMockApi) {
    for (const endpoint of scenario.apis) {
      this.router.route(endpoint.uri)[endpoint.method](async (req: RequestExt, res: Response) => {
        await processRequest(this.coverageTracker, name, endpoint.uri, req, res, endpoint.handler);
      });
    }
  }

  private registerScenarioWithoutCoverage(scenario: ScenarioMockApi) {
    for (const endpoint of scenario.apis) {
      this.router.route(endpoint.uri)[endpoint.method](async (req: RequestExt, res: Response) => {
        await processRequestWithoutCoverage(req, res, endpoint.handler);
      });
    }
  }
}
