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

Scenarios.Versioning_Removed_modelV3WithV1 = passOnSuccess(
  mockapi.post("/versioning/removed/api-version:v1/v3withv1", (req) => {
    req.expect.bodyEquals({ id: "123", enumProp: "enumMemberV1" });
    return {
      status: 200,
      body: json({ id: "123", enumProp: "enumMemberV1" }),
    };
  }),
);

Scenarios.Versioning_Removed_modelV3WithBeta = passOnSuccess(
  mockapi.post("/versioning/removed/api-version:beta/v3withbeta", (req) => {
    req.expect.bodyEquals({ id: "123", enumProp: "enumMemberBeta" });
    return {
      status: 200,
      body: json({ id: "123", enumProp: "enumMemberBeta" }),
    };
  }),
);

Scenarios.Versioning_Removed_modelV3WithV2 = passOnSuccess(
  mockapi.post("/versioning/removed/api-version:v2/v3withv2", (req) => {
    req.expect.bodyEquals({ id: "123", enumProp: "enumMemberV1" });
    return {
      status: 200,
      body: json({ id: "123", enumProp: "enumMemberV1" }),
    };
  }),
);
