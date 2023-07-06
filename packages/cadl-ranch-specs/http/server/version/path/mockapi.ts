import { passOnSuccess, ScenarioMockApi, mockapi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Server_Version_Path_valid = passOnSuccess(
  mockapi.head("/v1.1/server/version/path/valid", (req) => {
    return { status: 204 };
  }),
);
