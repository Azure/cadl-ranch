import { passOnSuccess, ScenarioMockApi, mockapi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Server_Version_Query_valid = passOnSuccess(
  mockapi.head("/server/version/query/valid", (req) => {
    req.expect.containsQueryParam("api-version", "v1.1");
    return { status: 204 };
  }),
);
