import { passOnSuccess, mockapi, json, MockApi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import { ResourceRepository } from "../../repository.js";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Arm_Models_Resources_TopLevelArmResources = passOnSuccess([
  createGetApi(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/:provider/topLevelArmResources/:topLevelResourceName",
  ),
  createPutApi(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/:provider/topLevelArmResources/:topLevelResourceName",
  ),
  createListBySubscriptionApi(
    "/subscriptions/:subscriptionId/providers/:provider/topLevelArmResources",
  ),
  createListByResourceGroupApi(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/:provider/topLevelArmResources",
  ),
  createDeleteApi(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/:provider/topLevelArmResources/:topLevelResourceName",
  )
]);

const repository = new ResourceRepository();

function createGetApi(url: string): MockApi {
  return mockapi.get(url, (req) => {
    req.expect.containsQueryParam("api-version", "2023-12-01-preview");
    const topLevelArmResource = repository.get(req.originalRequest.path);
    if (!Boolean(topLevelArmResource)) {
      return {
        status: 404,
      };
    } else {
      return {
        status: 200,
        body: json(topLevelArmResource),
      };
    }
  });
}

function createPutApi(url: string): MockApi {
  return mockapi.put(url, (req) => {
    req.expect.containsQueryParam("api-version", "2023-12-01-preview");
    req.expect.bodyNotEmpty();
    return {
      status: 200,
      body: json(repository.put(req.originalRequest.path, req.params.topLevelResourceName, req.body)),
    };
  });
}

function createListBySubscriptionApi(url: string): MockApi {
  return mockapi.get(url, (req) => {
    req.expect.containsQueryParam("api-version", "2023-12-01-preview");
    const resources = repository.listBySubscription(req.originalRequest.path)
    return {
      status: 200,
      body: json(resources),
    };
  });
}

function createListByResourceGroupApi(url: string): MockApi {
  return mockapi.get(url, (req) => {
    req.expect.containsQueryParam("api-version", "2023-12-01-preview");
    const resources = repository.listByResourceGroup(req.originalRequest.path)
    return {
      status: 200,
      body: json(resources),
    };
  });
}

function createDeleteApi(url: string): MockApi {
  return mockapi.delete(url, (req) => {
    req.expect.containsQueryParam("api-version", "2023-12-01-preview");
    repository.delete(req.originalRequest.path);
    return {
      status: 204
    }
  })
}
