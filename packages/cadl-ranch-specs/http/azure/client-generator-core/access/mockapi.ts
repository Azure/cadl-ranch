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

Scenarios.Azure_ClientGenerator_Core_Access_Public = passOnSuccess([
  createMockApis("public/noDecoratorInPublic"),
  createMockApis("public/publicDecoratorInPublic"),
]);

Scenarios.Azure_ClientGenerator_Core_Access_Internal = passOnSuccess([
  createMockApis("internal/noDecoratorInInternal"),
  createMockApis("internal/internalDecoratorInInternal"),
  createMockApis("internal/publicDecoratorInInternal"),
]);
Scenarios.Azure_ClientGenerator_Core_Access_Shared = passOnSuccess([
  createMockApis("shared/public"),
  createMockApis("shared/internal"),
]);

Scenarios.Azure_ClientGenerator_Core_Access_Relative = passOnSuccess([
  createMockApis("relative/operation"),
  createMockApis("relative/discriminator"),
]);
