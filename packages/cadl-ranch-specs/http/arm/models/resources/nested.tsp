import "@typespec/http";
import "@typespec/rest";
import "@azure-tools/typespec-azure-core";
import "@azure-tools/typespec-azure-resource-manager";
import "./toplevel.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using Azure.Core;
using Azure.ResourceManager;
using TypeSpec.OpenAPI;

namespace Arm.Models.Resources;

@doc("Nested child of Top Level Arm Resource.")
@parentResource(TopLevelArmResource)
model NestedChildResource is TrackedResource<NestedChildResourceProperties> {
  @key("childResourceName")
  @doc("ChildResources")
  @visibility("read")
  @path
  @segment("childResources")
  @pattern("^[A-Za-z0-9]([A-Za-z0-9-_.]{0,62}[A-Za-z0-9])?$")
  name: string;
}

@doc("Nested child Resource Properties.")
model NestedChildResourceProperties {
  @visibility("read")
  @doc("Provisioning State of Top Level Arm Resource")
  provisioningState?: ProvisioningState;
}

@armResourceOperations
interface NestedChildResources {
  @scenario
  @scenarioDoc("""
  Resource Get operation.
  Expected resourceId: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource
  Expected query parameter: api-version=2023-12-01-preview
  Expected response body:
  ```json
  {
    "id": <any string>,
    "name": <any string>,
    "type": <any string>,
    "description": <any string>,
    "systemData": <any object>
  }
  ```
  """)
  get is ArmResourceRead<NestedChildResource>;

  @scenario
  @scenarioDoc("""
  Resource PUT operation.
  Expected resourceId: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource
  Expected query parameter: api-version=2023-12-01-preview
  Expected request body:
  ```json
  {
    "description": <any string>
  }
  ```
  Expected response body:
  ```json
  {
    "id": <any string>,
    "name": <any string>,
    "type": <any string>,
    "description": <given string in request body>,
    "systemData": <any object>
  }
  ```
  """)
  createOrReplace is ArmResourceCreateOrReplaceAsync<NestedChildResource>;

  @scenario
  @scenarioDoc("""
  Resource PATCH operation.
  Expected resourceId: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource
  Expected query parameter: api-version=2023-12-01-preview
  Expected request body:
  ```json
  {
    "description": <any string>
  }
  ```
  Expected response body:
  ```json
  {
    "id": <any string>,
    "name": <any string>,
    "type": <any string>,
    "description": <given string in request body>,
    "systemData": <any object>
  }
  ```
  """)
  update is ArmResourcePatchAsync<NestedChildResource, NestedChildResourceProperties>;

  @scenario
  @scenarioDoc("""
  Resource PATCH operation.
  Expected resourceId: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource
  Expected query parameter: api-version=2023-12-01-preview
  Expected request body:
  ```json
  {
    "description": <any string>
  }
  ```
  Expected response body:
  ```json
  {
    "id": <any string>,
    "name": <any string>,
    "type": <any string>,
    "description": <given string in request body>,
    "systemData": <any object>
  }
  ```
  """)
  delete is ArmResourceDeleteWithoutOkAsync<NestedChildResource>;

  @scenario
  @scenarioDoc("""
  Resource PATCH operation.
  Expected resourceId: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource
  Expected query parameter: api-version=2023-12-01-preview
  Expected request body:
  ```json
  {
    "description": <any string>
  }
  ```
  Expected response body:
  ```json
  {
    "id": <any string>,
    "name": <any string>,
    "type": <any string>,
    "description": <given string in request body>,
    "systemData": <any object>
  }
  ```
  """)
  listByResourceGroup is ArmResourceListByParent<NestedChildResource>;

  @scenario
  @scenarioDoc("""
  Resource PATCH operation.
  Expected resourceId: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource
  Expected query parameter: api-version=2023-12-01-preview
  Expected request body:
  ```json
  {
    "description": <any string>
  }
  ```
  Expected response body:
  ```json
  {
    "id": <any string>,
    "name": <any string>,
    "type": <any string>,
    "description": <given string in request body>,
    "systemData": <any object>
  }
  ```
  """)
  listBySubscription is ArmListBySubscription<NestedChildResource>;
}
