import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const dummyTopLevelResource = {
  id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource",
  name: "topLevelResource",
  type: "topLevel",
  properties: {
    provisioningState: "Succeeded",
    description: "any string",
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

Scenarios.Arm_Models_Resources_TopLevelArmResources_get = passOnSuccess([
  mockapi.get(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Arm.Models.Resources/topLevelArmResources/:topLevelResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      return {
        status: 200,
        body: json({
          id: req.originalRequest.path,
          name: req.params.topLevelResourceName,
          type: "topLevel",
          properties: {
            provisioningState: "Succeeded",
            description: "any string",
          },
          systemData: {
            createdBy: "AzureSDK",
            createdByType: "User",
            createdAt: new Date(),
            lastModifiedBy: "AzureSDK",
            lastModifiedAt: new Date(),
            lastModifiedByType: "User",
          },
        }),
      };
    },
  ),
]);

Scenarios.Arm_Models_Resources_TopLevelArmResources_createOrReplace = passOnSuccess([
  mockapi.put(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Arm.Models.Resources/topLevelArmResources/:topLevelResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      req.expect.bodyNotEmpty();
      const body = req.body;
      const description = body.properties?.description;
      if (!Boolean(description)) {
        return {
          status: 400,
        };
      }
      return {
        status: 200,
        body: json({
          id: req.originalRequest.path,
          name: req.params.topLevelResourceName,
          type: "topLevel",
          properties: {
            provisioningState: "Succeeded",
            description: description,
          },
          systemData: {
            createdBy: "AzureSDK",
            createdByType: "User",
            createdAt: new Date(),
            lastModifiedBy: "AzureSDK",
            lastModifiedAt: new Date(),
            lastModifiedByType: "User",
          },
        }),
      };
    },
  ),
]);

Scenarios.Arm_Models_Resources_TopLevelArmResources_update = passOnSuccess([
  mockapi.put(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Arm.Models.Resources/topLevelArmResources/:topLevelResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      req.expect.bodyNotEmpty();
      const body = req.body;
      const description = body.properties?.description;
      if (!Boolean(description)) {
        return {
          status: 400,
        };
      }
      return {
        status: 200,
        body: json({
          id: req.originalRequest.path,
          name: req.params.topLevelResourceName,
          type: "topLevel",
          properties: {
            provisioningState: "Succeeded",
            description: description,
          },
          systemData: {
            createdBy: "AzureSDK",
            createdByType: "User",
            createdAt: new Date(),
            lastModifiedBy: "AzureSDK",
            lastModifiedAt: new Date(),
            lastModifiedByType: "User",
          },
        }),
      };
    },
  ),
]);

Scenarios.Arm_Models_Resources_TopLevelArmResources_delete = passOnSuccess([
  mockapi.delete(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Arm.Models.Resources/topLevelArmResources/:topLevelResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      return {
        status: 204,
      };
    },
  ),
]);

Scenarios.Arm_Models_Resources_TopLevelArmResources_listByResourceGroup = passOnSuccess([
  mockapi.get(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Arm.Models.Resources/topLevelArmResources",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      const resource = {
        ...dummyTopLevelResource,
      };
      resource.id = resource.id
        .replace("00000000-0000-0000-0000-000000000000", req.params.subscriptionId)
        .replace("/test-rg/", `/${req.params.resourceGroup}/`);
      return {
        status: 200,
        body: json({
          value: [resource],
        }),
      };
    },
  ),
]);

Scenarios.Arm_Models_Resources_TopLevelArmResources_listBySubscription = passOnSuccess([
  mockapi.get("/subscriptions/:subscriptionId/providers/Arm.Models.Resources/topLevelArmResources", (req) => {
    req.expect.containsQueryParam("api-version", "2023-12-01-preview");
    const resource = {
      ...dummyTopLevelResource,
    };
    resource.id = resource.id.replace("00000000-0000-0000-0000-000000000000", req.params.subscriptionId);
    return {
      status: 200,
      body: json({
        value: [resource],
      }),
    };
  }),
]);

// nested child resource
Scenarios.Arm_Models_Resources_NestedChildResources_get = passOnSuccess([
  mockapi.get(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Arm.Models.Resources/topLevelArmResources/:topLevelResourceName/nestedResources/:nestedResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      return {
        status: 200,
        body: json({
          id: req.originalRequest.path,
          name: req.params.nestedResourceName,
          type: "nested",
          properties: {
            provisioningState: "Succeeded",
            description: "any string",
          },
          systemData: {
            createdBy: "AzureSDK",
            createdByType: "User",
            createdAt: new Date(),
            lastModifiedBy: "AzureSDK",
            lastModifiedAt: new Date(),
            lastModifiedByType: "User",
          },
        }),
      };
    },
  ),
]);

Scenarios.Arm_Models_Resources_NestedChildResources_createOrReplace = passOnSuccess([
  mockapi.put(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Arm.Models.Resources/topLevelArmResources/:topLevelResourceName/nestedResources/:nestedResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      req.expect.bodyNotEmpty();
      const body = req.body;
      const description = body.properties?.description;
      if (!Boolean(description)) {
        return {
          status: 400,
        };
      }
      return {
        status: 200,
        body: json({
          id: req.originalRequest.path,
          name: req.params.nestedResourceName,
          type: "nested",
          properties: {
            provisioningState: "Succeeded",
            description: description,
          },
          systemData: {
            createdBy: "AzureSDK",
            createdByType: "User",
            createdAt: new Date(),
            lastModifiedBy: "AzureSDK",
            lastModifiedAt: new Date(),
            lastModifiedByType: "User",
          },
        }),
      };
    },
  ),
]);

Scenarios.Arm_Models_Resources_NestedChildResources_update = passOnSuccess([
  mockapi.put(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Arm.Models.Resources/topLevelArmResources/:topLevelResourceName/nestedResources/:nestedResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      req.expect.bodyNotEmpty();
      const body = req.body;
      const description = body.properties?.description;
      if (!Boolean(description)) {
        return {
          status: 400,
        };
      }
      return {
        status: 200,
        body: json({
          id: req.originalRequest.path,
          name: req.params.nestedResourceName,
          type: "nested",
          properties: {
            provisioningState: "Succeeded",
            description: description,
          },
          systemData: {
            createdBy: "AzureSDK",
            createdByType: "User",
            createdAt: new Date(),
            lastModifiedBy: "AzureSDK",
            lastModifiedAt: new Date(),
            lastModifiedByType: "User",
          },
        }),
      };
    },
  ),
]);

Scenarios.Arm_Models_Resources_NestedChildResources_delete = passOnSuccess([
  mockapi.delete(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Arm.Models.Resources/topLevelArmResources/:topLevelResourceName/nestedResources/:nestedResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      return {
        status: 204,
      };
    },
  ),
]);

Scenarios.Arm_Models_Resources_NestedChildResources_listByTopLevelArmResource = passOnSuccess([
  mockapi.get(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Arm.Models.Resources/topLevelArmResources/:topLevelResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      return {
        status: 200,
        body: json({
          value: [
            {
              id: `/subscriptions/${req.params.subscriptionId}/resourceGroups/${req.params.resourceGroup}/providers/Arm.Models.Resources/topLevelArmResources/${req.params.topLevelResourceName}/nestedResources/nestedResource`,
              name: req.params.nestedResourceName,
              type: "nested",
              properties: {
                provisioningState: "Succeeded",
                description: "any string",
              },
              systemData: {
                createdBy: "AzureSDK",
                createdByType: "User",
                createdAt: new Date(),
                lastModifiedBy: "AzureSDK",
                lastModifiedAt: new Date(),
                lastModifiedByType: "User",
              },
            },
          ],
        }),
      };
    },
  ),
]);
