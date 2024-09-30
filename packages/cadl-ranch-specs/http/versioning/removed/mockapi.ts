import { mockapi, passOnSuccess, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const pathsAndProperties = [
  {
    path: "/versioning/removed/api-version:v1/v3",
    expectedBody: { id: "123", enumProp: "enumMemberV1" },
    responseBody: { id: "123", enumProp: "enumMemberV1" },
    status: 200,
  },
  {
    path: "/versioning/removed/api-version:v2/v3",
    expectedBody: { id: "123", enumProp: "enumMemberV1" },
    responseBody: { id: "123", enumProp: "enumMemberV1" },
    status: 200,
  },
];

Scenarios.Versioning_Removed_v2 = passOnSuccess(
  mockapi.post("/versioning/removed/api-version:v2/v2", (req) => {
    req.expect.bodyEquals({ prop: "foo", enumProp: "enumMemberV2", unionProp: "bar" });
    return {
      status: 200,
      body: json({ prop: "foo", enumProp: "enumMemberV2", unionProp: "bar" }),
    };
  }),
);

const mockHandlers = pathsAndProperties.map(({ path, expectedBody, responseBody, status }) =>
  mockapi.post(path, (req) => {
    req.expect.bodyEquals(expectedBody);
    return {
      status,
      body: json(responseBody),
    };
  }),
);

Scenarios.Versioning_Removed_modelV3 = passOnSuccess(mockHandlers);

Scenarios.Versioning_Removed_preview = passOnSuccess(
  mockapi.post("/versioning/removed/api-version:v2preview/pewview", (req) => {
    req.expect.bodyEquals({ id: "123" });
    return {
      status: 200,
      body: json({ id: "123" }),
    };
  }),
);
