import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Type_Model_Empty_input = passOnSuccess(
  mockapi.post("/type/model/empty/input", (req) => {
    req.expect.bodyEquals({});
    return { status: 204 };
  }),
);

Scenarios.Type_Model_Empty_output = passOnSuccess(
  mockapi.get("/type/model/empty/output", (req) => {
    return { status: 200, body: json({}) };
  }),
);
