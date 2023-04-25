import { passOnSuccess, mockapi, ValidationError, json, MockApi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

function createInternalMockApis(route: string): MockApi {
  const url = `/azure/client-generator-core/internal/${route}`;
  return mockapi.get(url, (req) => {
    if (!("name" in req.query)) {
      throw new ValidationError("Should submit name query", "any string", undefined);
    }
    return {
      status: 200,
      body: json({ name: req.query["name"] }),
    };
  });
}

Scenarios.Azure_ClientGenerator_Core_Internal_publicOnly = passOnSuccess(createInternalMockApis("public"));
Scenarios.Azure_ClientGenerator_Core_Internal_internalOnly = passOnSuccess(createInternalMockApis("internal"));
Scenarios.Azure_ClientGenerator_Core_Internal_Shared_public = passOnSuccess(createInternalMockApis("shared/public"));
Scenarios.Azure_ClientGenerator_Core_Internal_Shared_internal = passOnSuccess(createInternalMockApis("shared/internal"));
