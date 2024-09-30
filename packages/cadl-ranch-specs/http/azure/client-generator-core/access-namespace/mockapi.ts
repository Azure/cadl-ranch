import { passOnSuccess, mockapi, ValidationError, json, MockApi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Azure_ClientGenerator_Core_AccessNamespace_InternalOperation = passOnSuccess(
  mockapi.get("/azure/client-generator-core/access-namespace/internal-output", (req) => {
    return { status: 200, body: json({ name: "Madge" }) };
  }),
);
