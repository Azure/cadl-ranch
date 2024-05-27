import { passOnSuccess, mockapi, json, MockApi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const resource = {
  id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource",
  name: "topLevelResource",
  type: "dummy",
  properties: {
    "provisioningState": "Succeeded",
    "description": "any string"
  },
  systemData: {
    createdBy: "AzureSDK",
    createdByType: "User",
    createdAt: new Date(),
    lastModifiedBy: "AzureSDK",
    lastModifiedAt: new Date(),
    lastModifiedByType: "User",
  }
}

Scenarios.Arm_Models_Resources_TopLevelArmResources_get = passOnSuccess([
  mockapi.get("/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource", (req) => {
    req.expect.containsQueryParam("api-version", "2023-12-01-preview");
    return {
      status: 200,
      body: json(resource)
    }
  })
]);

Scenarios.Arm_Models_Resources_TopLevelArmResources_createOrReplace = passOnSuccess([
  mockapi.put("/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource", (req) => {
    req.expect.containsQueryParam("api-version", "2023-12-01-preview");
    req.expect.bodyNotEmpty();
    const body = req.body;
    const description = body.properties?.description;
    if (!Boolean(description)) {
      return {
        status: "400"
      }
    }
    return {
      status: 200,
      body: json(resource)
    }
  })
]);

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
