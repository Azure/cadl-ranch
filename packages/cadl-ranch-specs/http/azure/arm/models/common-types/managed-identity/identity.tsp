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

@doc("Nested child of Top Level Tracked Resource.")
@resource("managedIdentityTrackedResources")
model ManagedIdentityProxyResource is ProxyResource<ManagedIdentityProxyResourceIdentities> {
  @key("managedIdentityProxyResourceName")
  @doc("Name of the managed identity resource.")
  @visibility("read")
  @path
  @segment("managedIdentityProxyResources")
  @pattern("^[A-Za-z0-9]([A-Za-z0-9-_.]{0,62}[A-Za-z0-9])?$")
  name: string;
}

@doc("Managed Identity Proxy Resource Identities.")
model ManagedIdentityProxyResourceIdentities {
  @doc("The type of managed identity.")
  type?: string;
}

@armResourceOperations
interface ManagedIdentityTrackedResources {
  @scenario
  @scenarioDoc("""
  Resource GET operation.
  Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.Arm.Models.Resources/managedIdentityTrackedResources/identity",
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
  Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.Arm.Models.Resources/managedIdentityTrackedResources/identity",
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
  createWithSystemAssignedOnly is ArmResourceCreateOrReplaceAsync<ManagedIdentityTrackedResources>;

  @scenario
  @scenarioDoc("""
  Resource PATCH operation.
  Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.Arm.Models.Resources/managedIdentityTrackedResources/identity",
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
  updateWithUserAssignedAndSystemAssigned is ArmResourcePatchAsync<ManagedIdentityTrackedResource, ManagedIdentityTrackedIdentities>;

  @scenario
  @scenarioDoc("""
  Resource PATCH operation.
  Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.Arm.Models.Resources/managedIdentityTrackedResources/identity",
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
  updateWithUserAssignedOnly is ArmResourcePatchAsync<ManagedIdentityTrackedResource, ManagedIdentityTrackedIdentities>;
}
