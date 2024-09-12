import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Client_Initialization_Basic = passOnSuccess(
  mockapi.post("/client/initialization/basic/sub-client/subclient1:action", (req) => {
    return {
      status: 204,
    };
  }),
);
