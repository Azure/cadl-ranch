import { passOnSuccess, ScenarioMockApi, mockapi, json } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Models_Usage_output = passOnSuccess(
  mockapi.get("/clients/parameters/path/v1.0/products/1", (req) => {
    return { status: 200, body: json({ id: 1 }) };
  }),
);
