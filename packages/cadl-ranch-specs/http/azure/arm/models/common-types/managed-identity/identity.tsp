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
model ManagedIdentityTrackedResource is TrackedResource<ManagedIdentityTrackedResourceIdentities> {
  @key("managedIdentityTrackedResourceName")
  @path
  @segment("managedIdentityTrackedResources")
  @doc("arm resource name for path")
  @pattern("^[A-Za-z0-9]([A-Za-z0-9-_.]{0,62}[A-Za-z0-9])?$")
  name: string;
}

@doc("Managed Identity Tracked Resource Identities.")
model ManagedIdentityTrackedResourceIdentities {
  @doc("The type of managed identity.")
  type?: string;
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
    "identity":{
      "type": "SystemAssigned"
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
    "identity":{
      "type": "SystemAssigned"
    }
  }
  ```
   Expected response body:
  ```json
  {
    "identity":{
      "type": "SystemAssigned"
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
    "identity":{
      "type": "SystemAssigned,UserAssigned"
    }
  }
  ```
   Expected response body:
  ```json
  {
    "identity":{
      "type": "SystemAssigned,UserAssigned"
    }
  }
  ```
  """)
  updateWithUserAssignedAndSystemAssigned is ArmResourcePatchAsync<ManagedIdentityTrackedResource, ManagedIdentityTrackedResourceIdentities>;

  @scenario
  @scenarioDoc("""
  Resource PATCH operation.
  Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.Arm.Models.CommonTypes.ManagedIdentity/managedIdentityTrackedResources/identity",
  Expected query parameter: api-version=2023-12-01-preview
  Expected request body:
  ```json
  {
    "identity":{
      "type": "UserAssigned"
    }
  }
  ```
   Expected response body:
  ```json
  {
    "identity":{
      "type": "UserAssigned"
    }
  }
  ```
  """)
  updateWithUserAssignedOnly is ArmResourcePatchAsync<ManagedIdentityTrackedResource, ManagedIdentityTrackedResourceIdentities>;
}
