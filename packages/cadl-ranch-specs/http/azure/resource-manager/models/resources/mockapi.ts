import { passOnSuccess, mockapi, json, ValidationError } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const SUBSCRIPTION_ID_EXPECTED = "00000000-0000-0000-0000-000000000000";
const RESOURCE_GROUP_EXPECTED = "test-rg";
const LOCATION_EXPECTED = "eastus";
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

const validLocationResource = {
  id: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Azure.ResourceManager.Models.Resources/locations/${LOCATION_EXPECTED}/locationResources/resource`,
  name: "resource",
  type: "Azure.ResourceManager.Models.Resources/locationResources",
  location: "westus",
  properties: {
    description: "valid",
    provisioningState: "Succeeded",
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

Scenarios.Azure_ResourceManager_Models_Resources_LocationResources_get = passOnSuccess([
  mockapi.get(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/locations/:location/locationResources/:locationResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.location.toLowerCase() !== LOCATION_EXPECTED) {
        throw new ValidationError("Unexpected parent resource location", LOCATION_EXPECTED, req.params.location);
      }
      if (req.params.locationResourceName.toLowerCase() !== "resource") {
        throw new ValidationError("Unexpected resource name", "resource", req.params.locationResourceName);
      }
      return {
        status: 200,
        body: json(validLocationResource),
      };
    },
  ),
]);

Scenarios.Azure_ResourceManager_Models_Resources_LocationResources_createOrUpdate = passOnSuccess([
  mockapi.put(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/locations/:location/locationResources/:locationResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.location.toLowerCase() !== LOCATION_EXPECTED) {
        throw new ValidationError("Unexpected parent resource location", LOCATION_EXPECTED, req.params.location);
      }
      if (req.params.locationResourceName.toLowerCase() !== "resource") {
        throw new ValidationError("Unexpected resource name", "resource", req.params.locationResourceName);
      }
      req.expect.bodyEquals({
        location: "westus",
        properties: {
          description: "valid",
        },
      });
      return {
        status: 200,
        body: json(validLocationResource),
      };
    },
  ),
]);

Scenarios.Azure_ResourceManager_Models_Resources_LocationResources_update = passOnSuccess([
  mockapi.patch(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/locations/:location/locationResources/:locationResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.location.toLowerCase() !== LOCATION_EXPECTED) {
        throw new ValidationError("Unexpected parent resource location", LOCATION_EXPECTED, req.params.location);
      }
      if (req.params.locationResourceName.toLowerCase() !== "resource") {
        throw new ValidationError("Unexpected resource name", "resource", req.params.locationResourceName);
      }
      req.expect.bodyEquals({
        location: "westus",
        properties: {
          description: "valid2",
        },
      });
      const resource = JSON.parse(JSON.stringify(validLocationResource));
      resource.properties.description = "valid2";
      return {
        status: 200,
        body: json(resource),
      };
    },
  ),
]);

Scenarios.Azure_ResourceManager_Models_Resources_LocationResources_delete = passOnSuccess([
  mockapi.delete(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/locations/:location/locationResources/:locationResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.location.toLowerCase() !== LOCATION_EXPECTED) {
        throw new ValidationError("Unexpected parent resource location", LOCATION_EXPECTED, req.params.location);
      }
      if (req.params.locationResourceName.toLowerCase() !== "resource") {
        throw new ValidationError("Unexpected resource name", "resource", req.params.locationResourceName);
      }
      return {
        status: 204,
      };
    },
  ),
]);

Scenarios.Azure_ResourceManager_Models_Resources_LocationResources_listByLocation = passOnSuccess([
  mockapi.get(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/locations/:location/locationResources",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.location.toLowerCase() !== LOCATION_EXPECTED) {
        throw new ValidationError("Unexpected parent resource location", LOCATION_EXPECTED, req.params.location);
      }
      return {
        status: 200,
        body: json({
          value: [validLocationResource],
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
