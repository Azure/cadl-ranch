import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const resourceID = "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test/providers/_Specs_.Arm.Models.Resources/topLevelArmResources/test";

Scenarios.Arm_Models_Resources_get = passOnSuccess([
  mockapi.get(resourceID, (req) => {
    req.expect.containsQueryParam("api-version", "2023-12-01-preview");
    return {
      status: 200,
      body: json({ id: resourceID, name: "test", type: "testType"}),
    };
  }),
]);
