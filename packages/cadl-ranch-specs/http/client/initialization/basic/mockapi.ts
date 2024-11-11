import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Client_Initialization_Basic = passOnSuccess({
  uri: "/client/initialization/basic/sub-client/subclient1:action",
  method: "post",
  request: {},
  response: {
    status: 204,
  },
  kind: "MockApiDefinition",
});
