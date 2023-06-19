import { passOnSuccess, ScenarioMockApi, mockapi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Server_Version_Path_myOp = passOnSuccess(
  mockapi.head("/v1.1/server/version/path/myOp", (req) => {
    return { status: 200 };
  }),
);
