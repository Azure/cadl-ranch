import { MockApiApp } from "../app/app.js";
import { ensureScenariosPathExists } from "../utils/index.js";

export interface ServeConfig {
  scenariosPath: string;
  port: number;
}

export async function serve(config: ServeConfig) {
  await ensureScenariosPathExists(config.scenariosPath);

  const server = new MockApiApp({ port: config.port, scenarioPath: config.scenariosPath });
  await server.start();
}
