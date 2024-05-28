import { passOnSuccess, mockapi, json, ValidationError } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const SUBSCRIPTION_ID_EXPECTED = "00000000-0000-0000-0000-000000000000";
const RESOURCE_GROUP_EXPECTED = "test-rg";
const validTopLevelResource = {
  id: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Arm.Models.Resources/topLevelTrackedResources/top`,
  name: "top",
  type: "topLevel",
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
  id: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Arm.Models.Resources/topLevelTrackedResources/top/nestedTrackedResources/nested`,
  name: "nested",
  type: "nested",
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

// top level tracked resource
Scenarios.Arm_Models_Resources_TopLevelTrackedResources_get = passOnSuccess([
  mockapi.get(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Arm.Models.Resources/topLevelTrackedResources/:topLevelResourceName",
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

Scenarios.Arm_Models_Resources_TopLevelTrackedResources_createOrReplace = passOnSuccess([
  mockapi.put(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Arm.Models.Resources/topLevelTrackedResources/:topLevelResourceName",
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

Scenarios.Arm_Models_Resources_TopLevelTrackedResources_update = passOnSuccess([
  mockapi.patch(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Arm.Models.Resources/topLevelTrackedResources/:topLevelResourceName",
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
        properties: {
          description: "valid2",
        },
      });
      const resource = {
        ...validTopLevelResource,
      };
      resource.properties.description = "valid2";
      return {
        status: 200,
        body: json(resource),
      };
    },
  ),
]);

Scenarios.Arm_Models_Resources_TopLevelTrackedResources_delete = passOnSuccess([
  mockapi.delete(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Arm.Models.Resources/topLevelTrackedResources/:topLevelResourceName",
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

Scenarios.Arm_Models_Resources_TopLevelTrackedResources_listByResourceGroup = passOnSuccess([
  mockapi.get(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Arm.Models.Resources/topLevelTrackedResources",
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

Scenarios.Arm_Models_Resources_TopLevelTrackedResources_listBySubscription = passOnSuccess([
  mockapi.get("/subscriptions/:subscriptionId/providers/Arm.Models.Resources/topLevelTrackedResources", (req) => {
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
  }),
]);

// nested tracked resource
Scenarios.Arm_Models_Resources_NestedTrackedResources_get = passOnSuccess([
  mockapi.get(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Arm.Models.Resources/topLevelTrackedResources/:topLevelResourceName/nestedTrackedResources/:nestedResourceName",
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

Scenarios.Arm_Models_Resources_NestedTrackedResources_createOrReplace = passOnSuccess([
  mockapi.put(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Arm.Models.Resources/topLevelTrackedResources/:topLevelResourceName/nestedTrackedResources/:nestedResourceName",
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
        location: "eastus",
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

Scenarios.Arm_Models_Resources_NestedTrackedResources_update = passOnSuccess([
  mockapi.patch(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Arm.Models.Resources/topLevelTrackedResources/:topLevelResourceName/nestedTrackedResources/:nestedResourceName",
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
      const resource = {
        ...validNestedResource,
      };
      resource.properties.description = "valid2";
      return {
        status: 200,
        body: json(resource),
      };
    },
  ),
]);

Scenarios.Arm_Models_Resources_NestedTrackedResources_delete = passOnSuccess([
  mockapi.delete(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Arm.Models.Resources/topLevelTrackedResources/:topLevelResourceName/nestedTrackedResources/:nestedResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      return {
        status: 204,
      };
    },
  ),
]);

Scenarios.Arm_Models_Resources_NestedTrackedResources_listByTopLevelTrackedResource = passOnSuccess([
  mockapi.get(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Arm.Models.Resources/topLevelTrackedResources/:topLevelResourceName/nestedTrackedResources",
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
