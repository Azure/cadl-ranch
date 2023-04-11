import { passOnSuccess, ScenarioMockApi, mockapi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Server_Parameters_Path_noOperationParams = passOnSuccess(
  mockapi.get("/server/parameters/path/v1.0", (req) => {
    return { status: 200 };
  }),
);

Scenarios.Server_Parameters_Path_withOperationPathParam = passOnSuccess(
  mockapi.get("/server/parameters/path/v1.0/test", (req) => {
    return { status: 200 };
  }),
);
