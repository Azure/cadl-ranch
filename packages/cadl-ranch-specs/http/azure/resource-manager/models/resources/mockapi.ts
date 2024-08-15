import { passOnSuccess, mockapi, json, ValidationError } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const SUBSCRIPTION_ID_EXPECTED = "00000000-0000-0000-0000-000000000000";
const RESOURCE_GROUP_EXPECTED = "test-rg";
const validTopLevelResource = {
  id: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top`,
  name: "top",
  type: "Azure.ResourceManager.Models.Resources/topLevelTrackedResources",
  location: "eastus",
  properties: {
    provisioningState: "Succeeded",
    description: "valid",
  },
  systemData: {
    createdBy: "AzureSDK",
    createdByType: "User",
    createdAt: new Date(),
    lastModifiedBy: "AzureSDK",
    lastModifiedAt: new Date(),
    lastModifiedByType: "User",
  },
};

const validNestedResource = {
  id: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top/nestedProxyResources/nested`,
  name: "nested",
  type: "Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top/nestedProxyResources",
  properties: {
    provisioningState: "Succeeded",
    description: "valid",
  },
  systemData: {
    createdBy: "AzureSDK",
    createdByType: "User",
    createdAt: new Date(),
    lastModifiedBy: "AzureSDK",
    lastModifiedAt: new Date(),
    lastModifiedByType: "User",
  },
};

const validSingletonResource = {
  id: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Azure.ResourceManager.Models.Resources/singletonTrackedResources/singleton`,
  name: "singleton",
  type: "singletonResources",
  location: "eastus",
  properties: {
    provisioningState: "Succeeded",
    description: "valid",
  },
  systemData: {
    createdBy: "AzureSDK",
    createdByType: "User",
    createdAt: new Date(),
    lastModifiedBy: "AzureSDK",
    lastModifiedAt: new Date(),
    lastModifiedByType: "User",
  },
};

// singleton tracked resource
Scenarios.Azure_ResourceManager_Models_Resources_SingletonTrackedResources_get = passOnSuccess([
  mockapi.get(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/singletonTrackedResources/:singletonResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.singletonResourceName.toLowerCase() !== "singleton") {
        throw new ValidationError("Unexpected singleton resource name", "singleton", req.params.singletonResourceName);
      }
      return {
        status: 200,
        body: json(validSingletonResource),
      };
    },
  ),
]);

Scenarios.Azure_ResourceManager_Models_Resources_SingletonTrackedResources_createOrUpdate = passOnSuccess([
  mockapi.put(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/singletonTrackedResources/:singletonResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.singletonResourceName.toLowerCase() !== "singleton") {
        throw new ValidationError("Unexpected singleton resource name", "singleton", req.params.singletonResourceName);
      }
      req.expect.bodyEquals({
        location: "eastus",
        properties: {
          description: "valid",
        },
      });
      return {
        status: 200,
        body: json(validSingletonResource),
      };
    },
  ),
]);

Scenarios.Azure_ResourceManager_Models_Resources_SingletonTrackedResources_update = passOnSuccess([
  mockapi.patch(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/singletonTrackedResources/:singletonResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.singletonResourceName.toLowerCase() !== "singleton") {
        throw new ValidationError("Unexpected singleton resource name", "singleton", req.params.singletonResourceName);
      }
      req.expect.deepEqual(req.body.properties, {
        description: "valid2",
      });
      const resource = JSON.parse(JSON.stringify(validSingletonResource));
      resource.properties.description = "valid2";
      return {
        status: 200,
        body: json(resource),
      };
    },
  ),
]);

Scenarios.Azure_ResourceManager_Models_Resources_SingletonTrackedResources_listByResourceGroup = passOnSuccess([
  mockapi.get(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/singletonTrackedResources",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      return {
        status: 200,
        body: json({
          value: [validSingletonResource],
        }),
      };
    },
  ),
]);

Scenarios.Azure_ResourceManager_Models_Resources_TopLevelTrackedResources_actionSync = passOnSuccess([
  mockapi.post(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/:topLevelResourceName/actionSync",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.topLevelResourceName.toLowerCase() !== "top") {
        throw new ValidationError("Unexpected top level resource name", "top", req.params.topLevelResourceName);
      }
      req.expect.bodyEquals({
        message: "Resource action at top level.",
        urgent: true,
      });
      return {
        status: 204,
      };
    },
  ),
]);

// top level tracked resource
Scenarios.Azure_ResourceManager_Models_Resources_TopLevelTrackedResources_get = passOnSuccess([
  mockapi.get(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/:topLevelResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.topLevelResourceName.toLowerCase() !== "top") {
        throw new ValidationError("Unexpected top level resource name", "top", req.params.topLevelResourceName);
      }
      return {
        status: 200,
        body: json(validTopLevelResource),
      };
    },
  ),
]);

Scenarios.Azure_ResourceManager_Models_Resources_TopLevelTrackedResources_createOrReplace = passOnSuccess([
  mockapi.put(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/:topLevelResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.topLevelResourceName.toLowerCase() !== "top") {
        throw new ValidationError("Unexpected top level resource name", "top", req.params.topLevelResourceName);
      }
      req.expect.bodyEquals({
        location: "eastus",
        properties: {
          description: "valid",
        },
      });
      return {
        status: 200,
        body: json(validTopLevelResource),
      };
    },
  ),
]);

Scenarios.Azure_ResourceManager_Models_Resources_TopLevelTrackedResources_update = passOnSuccess([
  mockapi.patch(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/:topLevelResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.topLevelResourceName.toLowerCase() !== "top") {
        throw new ValidationError("Unexpected top level resource name", "top", req.params.topLevelResourceName);
      }
      req.expect.deepEqual(req.body.properties, {
        description: "valid2",
      });
      const resource = JSON.parse(JSON.stringify(validTopLevelResource));
      resource.properties.description = "valid2";
      return {
        status: 200,
        body: json(resource),
      };
    },
  ),
]);

Scenarios.Azure_ResourceManager_Models_Resources_TopLevelTrackedResources_delete = passOnSuccess([
  mockapi.delete(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/:topLevelResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.topLevelResourceName.toLowerCase() !== "top") {
        throw new ValidationError("Unexpected top level resource name", "top", req.params.topLevelResourceName);
      }
      return {
        status: 204,
      };
    },
  ),
]);

Scenarios.Azure_ResourceManager_Models_Resources_TopLevelTrackedResources_listByResourceGroup = passOnSuccess([
  mockapi.get(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      return {
        status: 200,
        body: json({
          value: [validTopLevelResource],
        }),
      };
    },
  ),
]);

Scenarios.Azure_ResourceManager_Models_Resources_TopLevelTrackedResources_listBySubscription = passOnSuccess([
  mockapi.get(
    "/subscriptions/:subscriptionId/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      return {
        status: 200,
        body: json({
          value: [validTopLevelResource],
        }),
      };
    },
  ),
]);

// nested proxy resource
Scenarios.Azure_ResourceManager_Models_Resources_NestedProxyResources_get = passOnSuccess([
  mockapi.get(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/:topLevelResourceName/nestedProxyResources/:nestedResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.topLevelResourceName.toLowerCase() !== "top") {
        throw new ValidationError("Unexpected top level resource name", "top", req.params.topLevelResourceName);
      }
      if (req.params.nestedResourceName.toLowerCase() !== "nested") {
        throw new ValidationError("Unexpected nested resource name", "nested", req.params.nestedResourceName);
      }
      return {
        status: 200,
        body: json(validNestedResource),
      };
    },
  ),
]);

Scenarios.Azure_ResourceManager_Models_Resources_NestedProxyResources_createOrReplace = passOnSuccess([
  mockapi.put(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/:topLevelResourceName/nestedProxyResources/:nestedResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.topLevelResourceName.toLowerCase() !== "top") {
        throw new ValidationError("Unexpected top level resource name", "top", req.params.topLevelResourceName);
      }
      if (req.params.nestedResourceName.toLowerCase() !== "nested") {
        throw new ValidationError("Unexpected nested resource name", "nested", req.params.nestedResourceName);
      }
      req.expect.bodyEquals({
        properties: {
          description: "valid",
        },
      });
      return {
        status: 200,
        body: json(validNestedResource),
      };
    },
  ),
]);

Scenarios.Azure_ResourceManager_Models_Resources_NestedProxyResources_update = passOnSuccess([
  mockapi.patch(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/:topLevelResourceName/nestedProxyResources/:nestedResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.topLevelResourceName.toLowerCase() !== "top") {
        throw new ValidationError("Unexpected top level resource name", "top", req.params.topLevelResourceName);
      }
      if (req.params.nestedResourceName.toLowerCase() !== "nested") {
        throw new ValidationError("Unexpected nested resource name", "nested", req.params.nestedResourceName);
      }
      req.expect.bodyEquals({
        properties: {
          description: "valid2",
        },
      });
      const resource = JSON.parse(JSON.stringify(validNestedResource));
      resource.properties.description = "valid2";
      return {
        status: 200,
        body: json(resource),
      };
    },
  ),
]);

Scenarios.Azure_ResourceManager_Models_Resources_NestedProxyResources_delete = passOnSuccess([
  mockapi.delete(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/:topLevelResourceName/nestedProxyResources/:nestedResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      return {
        status: 204,
      };
    },
  ),
]);

Scenarios.Azure_ResourceManager_Models_Resources_NestedProxyResources_listByTopLevelTrackedResource = passOnSuccess([
  mockapi.get(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/:topLevelResourceName/nestedProxyResources",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.topLevelResourceName.toLowerCase() !== "top") {
        throw new ValidationError("Unexpected top level resource name", "top", req.params.topLevelResourceName);
      }
      return {
        status: 200,
        body: json({
          value: [validNestedResource],
        }),
      };
    },
  ),
]);
