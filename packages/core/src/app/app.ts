import path from "path";
import { app } from "../api/index.js";
import { logger } from "../logger.js";
import { internalRouter } from "../routes/index.js";
import { MockApiServer } from "../server/index.js";
import { coverageService } from "../services/index.js";
import { findFilesFromPattern } from "../utils/index.js";
import { ApiMockAppConfig } from "./config.js";

export const ROUTE_FOLDER = path.join(__dirname, "../test-routes");

export class ApiMockApp {
  private server: MockApiServer;

  constructor(private config: ApiMockAppConfig) {
    this.server = new MockApiServer({ port: config.port });
  }

  public async start(): Promise<void> {
    this.server.use("/", internalRouter);

    await requireMockRoutes(ROUTE_FOLDER);

    // Need to init after registering the new routes but before the legacy routes.
    coverageService.init(this.config.coverageDirectory, this.config.appendCoverage);
    const apiRouter = app;
    this.server.use("/", apiRouter.router);
    this.server.start();
  }
}

export const requireMockRoutes = async (routesFolder: string): Promise<void> => {
  const files = await findFilesFromPattern(path.join(routesFolder, "/**/*.js"));
  logger.debug("Detected routes:", files);
  for (const file of files) {
    require(path.resolve(file));
  }
};
