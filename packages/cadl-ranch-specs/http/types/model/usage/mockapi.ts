import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const body = { requiredProp: "example-value" };

Scenarios.Types_Model_Usage_input = passOnSuccess(
  mockapi.post("/types/model/usage/input", (req) => {
    req.expect.bodyEquals(body);
    return { status: 204 };
  }),
);

Scenarios.Types_Model_Usage_output = passOnSuccess(
  mockapi.get("/types/model/usage/output", (req) => {
    return { status: 200, body: json(body) };
  }),
);

Scenarios.Types_Model_Usage_inputAndOutput = passOnSuccess(
  mockapi.post("/types/model/usage/input-output", (req) => {
    req.expect.bodyEquals(body);
    return { status: 200, body: json(body) };
  }),
);
