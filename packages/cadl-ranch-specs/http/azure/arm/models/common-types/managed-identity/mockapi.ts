import { passOnSuccess, mockapi, json, ValidationError } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const SUBSCRIPTION_ID_EXPECTED = "00000000-0000-0000-0000-000000000000";
const RESOURCE_GROUP_EXPECTED = "test-rg";
const validManagedIdentityResource = {
  identity: {
    type: "SystemAssigned"
  }
};

// top level tracked resource
Scenarios.Azure_Arm_Models_Resources_ManagedIdentityTrackedResources_get = passOnSuccess([
  mockapi.get(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.Arm.Models.Resources/managedIdentityTrackedResources/:managedIdentityResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.topLevelResourceName.toLowerCase() !== "identity") {
        throw new ValidationError("Unexpected top level resource name", "identity", req.params.managedIdentityResourceName);
      }
      return {
        status: 200,
        body: json(validManagedIdentityResource),
      };
    },
  ),
]);

Scenarios.Azure_Arm_Models_Resources_ManagedIdentityTrackedResources_createWithSystemAssignedOnly = passOnSuccess([
  mockapi.put(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.Arm.Models.Resources/managedIdentityTrackedResources/:managedIdentityResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.managedIdentityResourceName.toLowerCase() !== "identity") {
        throw new ValidationError("Unexpected top level resource name", "identity", req.params.topLevelResourceName);
      }
      req.expect.bodyEquals({
        identity: {
          type: "SystemAssigned",
        }
      });
      return {
        status: 200,
        body: json(validManagedIdentityResource),
      };
    },
  ),
]);

Scenarios.Azure_Arm_Models_Resources_ManagedIdentityTrackedResources_updateWithUserAssignedAndSystemAssigned = passOnSuccess([
  mockapi.patch(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.Arm.Models.Resources/managedIdentityTrackedResources/:managedIdentityResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.managedIdentityResourceName.toLowerCase() !== "identity") {
        throw new ValidationError("Unexpected top level resource name", "identity", req.params.topLevelResourceName);
      }
      req.expect.bodyEquals({
        identity: {
          type: "SystemAssigned,UserAssigned",
        }
      });
      const resource = {
        ...validManagedIdentityResource,
      };
      resource.identity.type = "SystemAssigned,UserAssigned";
      return {
        status: 200,
        body: json(resource),
      };
    },
  ),
]);

Scenarios.Azure_Arm_Models_Resources_ManagedIdentityTrackedResources_updateWithUserAssignedOnly = passOnSuccess([
  mockapi.patch(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.Arm.Models.Resources/managedIdentityTrackedResources/:managedIdentityResourceName",
    (req) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError("Unexpected subscriptionId", SUBSCRIPTION_ID_EXPECTED, req.params.subscriptionId);
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError("Unexpected resourceGroup", RESOURCE_GROUP_EXPECTED, req.params.resourceGroup);
      }
      if (req.params.managedIdentityResourceName.toLowerCase() !== "identity") {
        throw new ValidationError("Unexpected top level resource name", "identity", req.params.topLevelResourceName);
      }
      req.expect.bodyEquals({
        identity: {
          type: "UserAssigned",
        }
      });
      const resource = {
        ...validManagedIdentityResource,
      };
      resource.identity.type = "UserAssigned";
      return {
        status: 200,
        body: json(resource),
      };
    },
  ),
]);
