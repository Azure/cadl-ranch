import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Server_Parameterized_myOp = passOnSuccess(
  mockapi.head("/server/parameterized/myOp", (req) => {
    return { status: 200 };
  }),
);
