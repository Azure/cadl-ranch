import { passOnSuccess, json, MockRequest } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Versioning_Removed_v2 = passOnSuccess({
  uri: `/versioning/removed/api-version:v2/v2`,
  method: `post`,
  request: {
    body: {
      prop: "foo",
      enumProp: "enumMemberV2",
      unionProp: "bar",
    },
  },
  response: {
    status: 200,
    body: json({ prop: "foo", enumProp: "enumMemberV2", unionProp: "bar" }),
  },
  handler: (req: MockRequest) => {
    req.expect.bodyEquals({ prop: "foo", enumProp: "enumMemberV2", unionProp: "bar" });
    return {
      status: 200,
      body: json({ prop: "foo", enumProp: "enumMemberV2", unionProp: "bar" }),
    };
  },
  kind: "MockApiDefinition",
});
