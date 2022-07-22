import { RequestExt, ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import { Response, Router } from "express";
import { internalRouter } from "../routes/index.js";
import { loadScenarioMockApis } from "../scenarios-resolver.js";
import { MockApiServer } from "../server/index.js";
import { ApiMockAppConfig } from "./config.js";
import { processRequest } from "./request-processor.js";

export class MockApiApp {
  private router = Router();
  private server: MockApiServer;

  constructor(private config: ApiMockAppConfig) {
    this.server = new MockApiServer({ port: config.port });
  }

  public async start(): Promise<void> {
    this.server.use("/", internalRouter);

    const scenarios = await loadScenarioMockApis(this.config.scenarioPath);
    for (const [name, scenario] of Object.entries(scenarios)) {
      this.registerScenario(name, scenario);
    }
    this.server.use("/", this.router);
    this.server.start();
  }

  private registerScenario(name: string, scenario: ScenarioMockApi) {
    for (const endpoint of scenario.apis) {
      this.router.route(endpoint.uri)[endpoint.method](async (req: RequestExt, res: Response) => {
        await processRequest(name, req, res, endpoint.handler);
      });
    }
  }
}
