import { passOnSuccess, mockapi, ValidationError, json, MockApi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

function createMockApis(route: string): MockApi {
  const url = `/azure/client-generator-core/access/${route}`;
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

Scenarios.Azure_ClientGenerator_Core_Access_Public_noDecoratorInPublic = passOnSuccess(createMockApis("public/noDecoratorInPublic"));
Scenarios.Azure_ClientGenerator_Core_Access_Public_publicDecoratorInPublic = passOnSuccess(createMockApis("public/publicDecoratorInPublic"));

Scenarios.Azure_ClientGenerator_Core_Access_Internal_noDecoratorInInternal = passOnSuccess(createMockApis("internal/noDecoratorInInternal"));
Scenarios.Azure_ClientGenerator_Core_Access_Internal_internalDecoratorInInternal = passOnSuccess(createMockApis("internal/internalDecoratorInInternal"));
Scenarios.Azure_ClientGenerator_Core_Access_Internal_publicDecoratorInInternal = passOnSuccess(createMockApis("internal/publicDecoratorInInternal"));

Scenarios.Azure_ClientGenerator_Core_Access_Shared_public = passOnSuccess(createMockApis("shared/public"));
Scenarios.Azure_ClientGenerator_Core_Access_Shared_internal = passOnSuccess(createMockApis("shared/internal"));

Scenarios.Azure_ClientGenerator_Core_Access_Relative_operation = passOnSuccess(createMockApis("relative/operation"));
Scenarios.Azure_ClientGenerator_Core_Access_Relative_discriminator = passOnSuccess(createMockApis("relative/discriminator"));