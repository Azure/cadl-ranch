import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Versioning_TypeChangedFrom_test = passOnSuccess(
  mockapi.post("/versioning/type-changed-from/api-version:v2/test", (req) => {
    req.expect.bodyEquals({ prop: "foo", changedProp: "bar" });
    req.expect.containsQueryParam("param", "baz");
    return {
      status: 200,
      body: json({ prop: "foo", changedProp: "bar" }),
    };
  }),
);
