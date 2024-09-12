import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Client_Initialization = passOnSuccess(
  mockapi.post("/client/initialization/sub-client/client1:action", (req) => {
    return {
      status: 204,
    };
  }),
);
