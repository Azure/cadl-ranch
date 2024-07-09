import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Versioning_Removed_v2 = passOnSuccess(
  mockapi.post("/versioning/removed/api-version:v2/v2", (req) => {
    req.expect.bodyEquals({ prop: "foo", enumProp: "enumMemberV2", unionProp: "bar" });
    return {
      status: 200,
      body: json({ prop: "foo", enumProp: "enumMemberV2", unionProp: "bar" }),
    };
  }),
);

Scenarios.Versioning_Removed_v3 = passOnSuccess(
  mockapi.post("/versioning/removed/api-version:v3/v3", (req) => {
    req.expect.bodyEquals({ id: "123", type: "bar" });
    return {
      status: 200,
      body: json({ id: "123", type: "bar" }),
    };
  }),
);
