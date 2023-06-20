import { passOnSuccess, ScenarioMockApi, mockapi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Server_Version_Union_customerDefined = passOnSuccess(
  mockapi.head("/server/version/union/customerDefined", (req) => {
    req.expect.containsQueryParam("api-version", "1.0.0");
    return { status: 204 };
  }),
);

Scenarios.Server_Version_Union_customerDefinedWithDefault = passOnSuccess(
  mockapi.head("/server/version/union/customerDefined", (req) => {
    req.expect.containsQueryParam("api-version", "2.0.0");
    return { status: 204 };
  }),
);

Scenarios.Server_Version_Union_templateDefined = passOnSuccess(
  mockapi.head("/server/version/union/Pet/dog", (req) => {
    req.expect.containsQueryParam("api-version", "1.0.0");
    return { status: 204 };
  }),
);
