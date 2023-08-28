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

Scenarios.Azure_ClientGenerator_Core_Access_PublicOperation = passOnSuccess([
  createMockApis("publicOperation/noDecoratorInPublic"),
  createMockApis("publicOperation/publicDecoratorInPublic"),
]);

Scenarios.Azure_ClientGenerator_Core_Access_InternalOperation = passOnSuccess([
  createMockApis("internalOperation/noDecoratorInInternal"),
  createMockApis("internalOperation/internalDecoratorInInternal"),
  createMockApis("internalOperation/publicDecoratorInInternal"),
]);

Scenarios.Azure_ClientGenerator_Core_Access_SharedModelInOperation = passOnSuccess([
  createMockApis("sharedModelInOperation/public"),
  createMockApis("sharedModelInOperation/internal"),
]);

Scenarios.Azure_ClientGenerator_Core_Access_RelativeModelInOperation = passOnSuccess([
  mockapi.get("/azure/client-generator-core/access/relativeModelInOperation/operation", (req) => {
    if (!("name" in req.query)) {
      throw new ValidationError("Should submit name query", "any string", undefined);
    }
    return {
      status: 200,
      body: json({ name: "Madge", inner: { name: "Madge" } }),
    };
  }),
  mockapi.get("/azure/client-generator-core/access/relativeModelInOperation/discriminator", (req) => {
    if (!("kind" in req.query)) {
      throw new ValidationError("Should submit name query", "any string", undefined);
    }
    return {
      status: 200,
      body: json({ name: "Madge", kind: "real" }),
    };
  }),
]);
