import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Versioning_RenamedFrom_test = passOnSuccess(
  mockapi.post("/versioning/renamed-from/api-version:v2/test", (req) => {
    req.expect.bodyEquals({ newProp: "foo", enumProp: "newEnumMember", unionProp: 10 });
    req.expect.containsQueryParam("newQuery", "bar");
    return {
      status: 200,
      body: json({ newProp: "foo", enumProp: "newEnumMember", unionProp: 10 }),
    };
  }),
);

Scenarios.Versioning_RenamedFrom_NewInterface_test = passOnSuccess(
  mockapi.post("/versioning/renamed-from/api-version:v2/interface/test", (req) => {
    req.expect.bodyEquals({ newProp: "foo", enumProp: "newEnumMember", unionProp: 10 });
    return {
      status: 200,
      body: json({ newProp: "foo", enumProp: "newEnumMember", unionProp: 10 }),
    };
  }),
);
