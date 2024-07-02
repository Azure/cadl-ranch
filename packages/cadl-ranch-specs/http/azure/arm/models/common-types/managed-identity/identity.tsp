import "@typespec/http";
import "@typespec/rest";
import "@azure-tools/typespec-azure-core";
import "@azure-tools/typespec-azure-resource-manager";

using TypeSpec.Http;
using TypeSpec.Rest;
using Azure.Core;
using Azure.ResourceManager;
using TypeSpec.OpenAPI;

namespace Azure.Arm.Models.CommonTypes.ManagedIdentity;

@resource("managedIdentityTrackedResources")
model ManagedIdentityTrackedResource is TrackedResource<ManagedIdentityTrackedResourceProperties> {
  @key("managedIdentityTrackedResourceName")
  @path
  @segment("managedIdentityTrackedResources")
  @doc("arm resource name for path")
  @pattern("^[A-Za-z0-9]([A-Za-z0-9-_.]{0,62}[A-Za-z0-9])?$")
  name: string;

  ...ManagedServiceIdentityProperty;
}

@doc("Managed Identity Arm Resource Properties.")
model ManagedIdentityTrackedResourceProperties {
  @visibility("read")
  @doc("The status of the last operation.")
  provisioningState?: ProvisioningState;
}

@armResourceOperations
interface ManagedIdentityTrackedResources {
  @scenario
  @scenarioDoc("""
  Resource GET operation.
  Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.Arm.Models.CommonTypes.ManagedIdentity/managedIdentityTrackedResources/identity",
  Expected query parameter: api-version=2023-12-01-preview

  Expected response body:
  ```json
  {
    "id":"/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.Arm.Models.CommonTypes.ManagedIdentity/managedIdentityTrackedResources/identity",
    "location": "eastus",
    "identity": {
      "type": "SystemAssigned",
      // this is for system-assigned
      "principalId": <any uuid string>
      // this is for system-assigned
      "tenantId": <any uuid string>
     },
    "properties": {
      "provisioningState": "Succeeded"
    }
  }
  ```
  """)
  get is ArmResourceRead<ManagedIdentityTrackedResource>;

  @scenario
  @scenarioDoc("""
  Resource PUT operation.
  Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.Arm.Models.CommonTypes.ManagedIdentity/managedIdentityTrackedResources/identity",
  Expected query parameter: api-version=2023-12-01-preview
  Expected request body:
  ```json
  {
    "location": "eastus",
    "identity": {
      "type": "SystemAssigned"
    },
    "properties": {}
  }
  ```
   Expected response body:
  ```json
  {
    "id":"/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.Arm.Models.CommonTypes.ManagedIdentity/managedIdentityTrackedResources/identity",
    "location": "eastus",
    "identity": {
      "type": "SystemAssigned",
      // this is for system-assigned
      "principalId": <any uuid string>,
      // this is for system-assigned
      "tenantId": <any uuid string>
     },
    "properties": {
      "provisioningState": "Succeeded"
    }
  }
  ```
  """)
  createWithSystemAssignedOnly is ArmResourceCreateOrReplaceAsync<ManagedIdentityTrackedResource>;

  @scenario
  @scenarioDoc("""
  Resource PATCH operation.
  Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.Arm.Models.CommonTypes.ManagedIdentity/managedIdentityTrackedResources/identity",
  Expected query parameter: api-version=2023-12-01-preview
  Expected request body:
  ```json
  {
    "identity": {
      "type": "SystemAssigned,UserAssigned",
      "userAssignedIdentities": {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1": {}
      }
    }
  }
  ```
   Expected response body:
  ```json
  {
    "id":"/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.Arm.Models.CommonTypes.ManagedIdentity/managedIdentityTrackedResources/identity",
    "location": "eastus",
    "identity": {
      "type": "SystemAssigned,UserAssigned",
      // this is user-assigned
      "userAssignedIdentities": {
        "<user-assigned-identity-id>": {
          "principalId": <any uuid string>,
          "clientId": <any uuid string>
        },
      },
      // this is for system-assigned
      "principalId": <any uuid string>,
      // this is for system-assigned
      "tenantId": <any uuid string>
    },
    "properties": {
      "provisioningState": "Succeeded"
    }
  }
  ```
  """)
  updateWithUserAssignedAndSystemAssigned is ArmResourcePatchAsync<
    ManagedIdentityTrackedResource,
    ManagedIdentityTrackedResourceProperties
  >;
}
