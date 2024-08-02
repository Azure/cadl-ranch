import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Versioning_MadeOptional_test = passOnSuccess(
  mockapi.post("/versioning/made-optional/api-version:v2/test", (req) => {
    req.expect.bodyEquals({ prop: "foo" });
    return {
      status: 200,
      body: json({ prop: "foo" }),
    };
  }),
);
