import { mockapi, MockApi, passOnSuccess, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

export const commonBase = "/resiliency/service-driven";

type PassResiliencyOptions = {
  version: string;
};

function createResilientMockApi(options: PassResiliencyOptions): MockApi[] {
  return [
    mockapi.post(`/versioning/removed/api-version:${options.version}/v3`, (req) => {
      req.expect.bodyEquals({ id: "123", enumProp: "enumMemberV1" });
      return {
        status: 204,
        body: json({ id: "123", enumProp: "enumMemberV1" }),
      };
    }),
    mockapi.post("/versioning/removed/api-version:beta/v3", (req) => {
      req.expect.bodyEquals({ id: "123", enumProp: "enumMemberBeta" });
      return {
        status: 204,
        body: json({ id: "123", enumProp: "enumMemberBeta" }),
      };
    }),
    mockapi.post("/versioning/removed/api-version:v2/v3", (req) => {
      req.expect.bodyEquals({ id: "123", enumProp: "enumMemberV1" });
      return {
        status: 204,
        body: json({ id: "123", enumProp: "enumMemberV1" }),
      };
    }),
  ];
}

Scenarios.Versioning_Removed_v2 = passOnSuccess(
  mockapi.post("/versioning/removed/api-version:v2/v2", (req) => {
    req.expect.bodyEquals({ prop: "foo", enumProp: "enumMemberV2", unionProp: "bar" });
    return {
      status: 200,
      body: json({ prop: "foo", enumProp: "enumMemberV2", unionProp: "bar" }),
    };
  }),
);

Scenarios.Versioning_Removed_modelV3_version1 = passOnSuccess(
  createResilientMockApi({
    version: "v1",
  }),
);

Scenarios.Versioning_Removed_modelV3_versionbeta = passOnSuccess(
  createResilientMockApi({
    version: "beta",
  }),
);

Scenarios.Versioning_Removed_modelV3_version2 = passOnSuccess(
  createResilientMockApi({
    version: "v2",
  }),
);
