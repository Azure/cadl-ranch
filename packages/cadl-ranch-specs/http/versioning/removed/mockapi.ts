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

Scenarios.Versioning_Removed_modelV3_V1 = passOnSuccess({
  uri: `/versioning/removed/api-version[:]v1/v3`,
  method: "post",
  request: {
    body: {
      id: "123",
      enumProp: "enumMemberV1",
    },
  },
  response: {
    status: 200,
    body: json({ id: "123", enumProp: "enumMemberV1" }),
  },
  handler: (req: MockRequest) => {
    req.expect.bodyEquals({ id: "123", enumProp: "enumMemberV1" });
    return { status: 200, body: json({ id: "123", enumProp: "enumMemberV1" }) };
  },
  kind: "MockApiDefinition",
});

Scenarios.Versioning_Removed_modelV3_V2 = passOnSuccess({
  uri: `/versioning/removed/api-version[:]v2/v3`,
  method: "post",
  request: {
    body: {
      id: "123",
      enumProp: "enumMemberV1",
    },
  },
  response: {
    status: 200,
    body: json({ id: "123", enumProp: "enumMemberV1" }),
  },
  handler: (req: MockRequest) => {
    req.expect.bodyEquals({ id: "123", enumProp: "enumMemberV1" });
    return { status: 200, body: json({ id: "123", enumProp: "enumMemberV1" }) };
  },
  kind: "MockApiDefinition",
});

Scenarios.Versioning_Removed_modelV3_V2preview = passOnSuccess({
  uri: `/versioning/removed/api-version[:]v2preview/v3`,
  method: "post",
  request: {
    body: {
      id: "123",
    },
  },
  response: {
    status: 200,
    body: json({ id: "123" }),
  },
  handler: (req: MockRequest) => {
    req.expect.bodyEquals({ id: "123" });
    return { status: 200, body: json({ id: "123" }) };
  },
  kind: "MockApiDefinition",
});
