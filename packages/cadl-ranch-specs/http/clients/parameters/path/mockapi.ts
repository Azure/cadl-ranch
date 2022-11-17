import { passOnSuccess, ScenarioMockApi, mockapi, json } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Clients_Parameters_Path_get = passOnSuccess(
  mockapi.get("/clients/parameters/path/v1.0/products/1", (req) => {
    return { status: 200, body: json({ id: 1 }) };
  }),
);
