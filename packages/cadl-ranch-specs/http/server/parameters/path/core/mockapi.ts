import { passOnSuccess, ScenarioMockApi, mockapi, json } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Server_Parameters_Path_Core_get = passOnSuccess(
  mockapi.get("/server/parameters/path/core/v1.0/products/1", (req) => {
    return { status: 200, body: json({ id: 1 }) };
  }),
);
