import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.getModel = passOnSuccess(
  mockapi.get("/models/output/basic", (req) => {
    return {
      status: 200,
      body: json({ requiredString: "required string", requiredInt: 1 })
    };
  })
);