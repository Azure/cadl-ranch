import { passOnSuccess, mockapi, ValidationError, json, MockApi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

function createInternalGetMockApis(route: string): MockApi {
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

Scenarios.Azure_ClientGenerator_Core_Internal_publicOnly = passOnSuccess(createInternalGetMockApis("public"));
Scenarios.Azure_ClientGenerator_Core_Internal_internalOnly = passOnSuccess(createInternalGetMockApis("internal"));
Scenarios.Azure_ClientGenerator_Core_Internal_Shared = passOnSuccess([
  createInternalGetMockApis("shared/public"),
  createInternalGetMockApis("shared/internal"),
]);

Scenarios.Azure_ClientGenerator_Core_Internal_postInternalOnly = passOnSuccess(
  mockapi.post("/azure/client-generator-core/internal/internal", (req) => {
    req.expect.bodyNotEmpty();
    return {
      status: 200,
      body: json({ result: req.body["name"] }),
    };
  }),
);
