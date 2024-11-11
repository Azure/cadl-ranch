import { passOnSuccess } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Server_Path_Single_myOp = passOnSuccess({
  uri: "/server/path/single/myOp",
  method: "head",
  request: {},
  response: {
    status: 200,
  },
  kind: "MockApiDefinition",
});
