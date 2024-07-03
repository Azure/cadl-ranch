import { passOnSuccess, mockapi, json, ValidationError } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const SUBSCRIPTION_ID_EXPECTED = "00000000-0000-0000-0000-000000000000";
const RESOURCE_GROUP_EXPECTED = "test-rg";
const validSystemAssignedManagedIdentityResource = {
  id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.CommonTypes.ManagedIdentity/managedIdentityTrackedResources/identity",
  location: "eastus",
  identity: {
    type: "SystemAssigned",
    principalId: "00000000-0000-0000-0000-000000000000",
    tenantId: "00000000-0000-0000-0000-000000000000",
  },
  properties: {
    provisioningState: "Succeeded",
  },
};

const validUserAssignedAndSystemAssignedManagedIdentityResource = {
  id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.CommonTypes.ManagedIdentity/managedIdentityTrackedResources/identity",
  location: "eastus",
  identity: {
    type: "SystemAssigned,UserAssigned",
    userAssignedIdentities: {
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1":
        {
          principalId: "00000000-0000-0000-0000-000000000000",
          clientId: "00000000-0000-0000-0000-000000000000",
        },
    },
    principalId: "00000000-0000-0000-0000-000000000000",
    tenantId: "00000000-0000-0000-0000-000000000000",
  },
  properties: {
    provisioningState: "Succeeded",
  },
};

// managed identity tracked resource
Scenarios.Azure_ResourceManager_Models_CommonTypes_ManagedIdentity_ManagedIdentityTrackedResources_get = passOnSuccess([
  mockapi.get(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.CommonTypes.ManagedIdentity/managedIdentityTrackedResources/:managedIdentityResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.managedIdentityResourceName.toLowerCase() !== "identity") {
        throw new ValidationError(
          "Unexpected managed identity resource name",
          "identity",
          req.params.managedIdentityResourceName,
        );
      }
      return {
        status: 200,
        body: json(validSystemAssignedManagedIdentityResource),
      };
    },
  ),
]);

Scenarios.Azure_ResourceManager_Models_CommonTypes_ManagedIdentity_ManagedIdentityTrackedResources_createWithSystemAssigned =
  passOnSuccess([
    mockapi.put(
      "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.CommonTypes.ManagedIdentity/managedIdentityTrackedResources/:managedIdentityResourceName",
      (req) => {
        req.expect.containsQueryParam("api-version", "2023-12-01-preview");
        if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
          throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
        }
        if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
          throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
        }
        if (req.params.managedIdentityResourceName.toLowerCase() !== "identity") {
          throw new ValidationError(
            "Unexpected managed identity resource name",
            "identity",
            req.params.managedIdentityResourceName,
          );
        }
        req.expect.bodyEquals({
          location: "eastus",
          identity: {
            type: "SystemAssigned",
          },
          properties: {},
        });
        return {
          status: 200,
          body: json(validSystemAssignedManagedIdentityResource),
        };
      },
    ),
  ]);

Scenarios.Azure_ResourceManager_Models_CommonTypes_ManagedIdentity_ManagedIdentityTrackedResources_updateWithUserAssignedAndSystemAssigned =
  passOnSuccess([
    mockapi.patch(
      "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.CommonTypes.ManagedIdentity/managedIdentityTrackedResources/:managedIdentityResourceName",
      (req) => {
        req.expect.containsQueryParam("api-version", "2023-12-01-preview");
        if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
          throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
        }
        if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
          throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
        }
        if (req.params.managedIdentityResourceName.toLowerCase() !== "identity") {
          throw new ValidationError(
            "Unexpected managed identity resource name",
            "identity",
            req.params.managedIdentityResourceName,
          );
        }
        req.expect.bodyEquals({
          identity: {
            type: "SystemAssigned,UserAssigned",
            userAssignedIdentities: {
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1":
                {},
            },
          },
        });
        return {
          status: 200,
          body: json(validUserAssignedAndSystemAssignedManagedIdentityResource),
        };
      },
    ),
  ]);
