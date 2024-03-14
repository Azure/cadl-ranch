import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Server_Endpoint_NotDefined_operation = passOnSuccess(
  mockapi.head("/server/endpoint/not-defined/operation", (req) => {
    return { status: 200 };
  }),
);
