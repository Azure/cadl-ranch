import { MockApiDefinition, MockRequest, RequestExt, ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import { Response, Router } from "express";
import { getScenarioMetadata } from "../coverage/common.js";
import { CoverageTracker } from "../coverage/coverage-tracker.js";
import { internalRouter } from "../routes/index.js";
import { loadScenarioMockApis } from "../scenarios-resolver.js";
import { MockApiServer } from "../server/index.js";
import { ApiMockAppConfig } from "./config.js";
import { processRequest } from "./request-processor.js";
import { logger } from "../logger.js";

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
    this.router.get("/.coverage", (req, res) => {
      res.json(this.coverageTracker.computeCoverage());
    });

    this.server.use("/", this.router);
    this.server.start();
  }

  private registerScenario(name: string, scenario: ScenarioMockApi) {
    for (const endpoint of scenario.apis) {
      if (endpoint.kind !== "MockApiDefinition") {
        this.router.route(endpoint.uri)[endpoint.method]((req: RequestExt, res: Response) => {
          processRequest(this.coverageTracker, name, endpoint.uri, req, res, endpoint.handler).catch((e) => {
            logger.error("Unexpected request error", e);
            res.status(500).end();
          });
        });
      } else {
        if (!endpoint.handler) {
          endpoint.handler = createHandler(endpoint);
        }
        this.router.route(endpoint.uri)[endpoint.method]((req: RequestExt, res: Response) => {
          processRequest(this.coverageTracker, name, endpoint.uri, req, res, endpoint.handler!).catch((e) => {
            logger.error("Unexpected request error", e);
            res.status(500).end();
          });
        });
      }
    }
  }
}

function createHandler(apiDefinition: MockApiDefinition) {
  return (req: MockRequest) => {
    // Validate body if present in the request
    if (apiDefinition.request.body) {
      if (apiDefinition.request.headers && apiDefinition.request.headers["Content-Type"] === "application/xml") {
        req.expect.xmlBodyEquals(
          apiDefinition.request.body.rawContent.replace(`<?xml version='1.0' encoding='UTF-8'?>`, ""),
        );
      } else {
        req.expect.coercedBodyEquals(apiDefinition.request.body);
      }
    }

    // Validate headers if present in the request
    if (apiDefinition.request.headers) {
      Object.entries(apiDefinition.request.headers).forEach(([key, value]) => {
        if (key !== "Content-Type") {
          if (Array.isArray(value)) {
            req.expect.deepEqual(req.headers[key], value);
          } else {
            req.expect.containsHeader(key.toLowerCase(), String(value));
          }
        }
      });
    }

    // Validate query params if present in the request
    if (apiDefinition.request.params) {
      Object.entries(apiDefinition.request.params).forEach(([key, value]) => {
        if (!req.query[key]) {
          if (Array.isArray(value)) {
            req.expect.deepEqual(req.params[key], value);
          } else {
            req.expect.deepEqual(req.params[key], String(value));
          }
        } else {
          if (Array.isArray(value)) {
            req.expect.deepEqual(req.query[key], value);
          } else {
            req.expect.containsQueryParam(key, String(value));
          }
        }
      });
    }

    // Validations are done. Now return the response
    return {
      status: apiDefinition.response.status,
      body: apiDefinition.response.body,
      headers: apiDefinition.response.headers,
    };
  };
}
