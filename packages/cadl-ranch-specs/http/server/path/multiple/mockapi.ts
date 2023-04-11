import { passOnSuccess, ScenarioMockApi, mockapi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Server_Path_Multiple_noOperationParams = passOnSuccess(
  mockapi.get("/server/path/multiple/v1.0", (req) => {
    return { status: 200 };
  }),
);

Scenarios.Server_Path_Multiple_withOperationPathParam = passOnSuccess(
  mockapi.get("/server/path/multiple/v1.0/test", (req) => {
    return { status: 200 };
  }),
);
