import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Versioning_Added_v1 = passOnSuccess(
  mockapi.post("/versioning/added/api-version:v2/v1", (req) => {
    req.expect.bodyEquals({ prop: "foo", enumProp: "enumMemberV2", unionProp: 10 });
    req.expect.containsHeader("header-v2", "bar");
    return {
      status: 200,
      body: json({ prop: "foo", enumProp: "enumMemberV2", unionProp: 10 }),
    };
  }),
);

Scenarios.Versioning_Added_v2 = passOnSuccess(
  mockapi.post("/versioning/added/api-version:v2/v2", (req) => {
    req.expect.bodyEquals({ prop: "foo", enumProp: "enumMember", unionProp: "bar" });
    return {
      status: 200,
      body: json({ prop: "foo", enumProp: "enumMember", unionProp: "bar" }),
    };
  }),
);

Scenarios.Versioning_Added_InterfaceV2 = passOnSuccess(
  mockapi.post("/versioning/added/api-version:v2/interface-v2/v2", (req) => {
    req.expect.bodyEquals({ prop: "foo", enumProp: "enumMember", unionProp: "bar" });
    return {
      status: 200,
      body: json({ prop: "foo", enumProp: "enumMember", unionProp: "bar" }),
    };
  }),
);
