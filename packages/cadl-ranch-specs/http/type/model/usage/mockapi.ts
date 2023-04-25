import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const body = { requiredProp: "example-value" };

Scenarios.Type_Model_Usage_input = passOnSuccess(
  mockapi.post("/type/model/usage/input", (req) => {
    req.expect.bodyEquals(body);
    return { status: 204 };
  }),
);

Scenarios.Type_Model_Usage_output = passOnSuccess(
  mockapi.get("/type/model/usage/output", (req) => {
    return { status: 200, body: json(body) };
  }),
);

Scenarios.Type_Model_Usage_inputAndOutput = passOnSuccess(
  mockapi.post("/type/model/usage/input-output", (req) => {
    req.expect.bodyEquals(body);
    return { status: 200, body: json(body) };
  }),
);
