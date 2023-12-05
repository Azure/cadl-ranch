import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Server_Versions_AllOperations_myOp = passOnSuccess(
  mockapi.head("/server/versions/allOperations/myOp", (req) => {
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    return { status: 200 };
  }),
);
