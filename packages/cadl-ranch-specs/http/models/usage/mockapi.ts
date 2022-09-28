import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const body = { requiredProp: "example-value" };

Scenarios.Records_Usage_input = passOnSuccess(
  mockapi.post("/models/usage/input", (req) => {
    req.expect.bodyEquals(body);
    return { status: 204 };
  }),
);

Scenarios.Records_Usage_output = passOnSuccess(
  mockapi.post("/models/usage/output", (req) => {
    return { status: 202, body: json(body) };
  }),
);

Scenarios.Records_Usage_inputAndOutput = passOnSuccess(
  mockapi.post("/models/usage/input-output", (req) => {
    req.expect.bodyEquals(body);
    return { status: 202, body: json(body) };
  }),
);
