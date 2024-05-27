import "@typespec/http";
import "@typespec/rest";
import "@azure-tools/typespec-azure-core";
import "@azure-tools/typespec-azure-resource-manager";

using TypeSpec.Http;
using TypeSpec.Rest;
using Azure.Core;
using Azure.ResourceManager;
using TypeSpec.OpenAPI;

namespace Arm.Models.Resources;

@resource("topLevelArmResources")
model TopLevelArmResource is TrackedResource<TopLevelArmResourceProperties> {
  @key("topLevelArmResourceName")
  @path
  @segment("topLevelArmResources")
  @doc("arm resource name for path")
  @pattern("^[A-Za-z0-9]([A-Za-z0-9-_.]{0,62}[A-Za-z0-9])?$")
  name: string;
}

@doc("Top Level Arm Resource Properties.")
model TopLevelArmResourceProperties {
  @visibility("read")
  @doc("The status of the last operation.")
  provisioningState?: ProvisioningState;

  @doc("The description of the resource.")
  description?: string;
}

@armResourceOperations
interface TopLevelArmResources {
  @scenario
  @scenarioDoc("""
  Resource GET operation.
  Expected url: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource
  Expected query parameter: api-version=2023-12-01-preview

  Expected response body:
  ```json
  {
    "id": /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource,
    "name": topLevelResource,
    "type": topLevel,
    "properties":{
      "description": <any string>,
      "provisioningState": "Succeeded"
    },
    "systemData": <any object>
  }
  ```
  """)
  get is ArmResourceRead<TopLevelArmResource>;

  @scenario
  @scenarioDoc("""
  Resource PUT operation.
  Expected url: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource
  Expected query parameter: api-version=2023-12-01-preview
  Expected request body:
  ```json
  {
    "properties":{
      "description": <any string>
    }
  }
  ```
  Expected response body:
  ```json
  {
    "id": /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource,
    "name": topLevelResource,
    "type": topLevel,
    "properties":{
      "description": <given string in request body>,
      "provisioningState": "Succeeded"
    },
    "systemData": <any object>
  }
  ```
  """)
  createOrReplace is ArmResourceCreateOrReplaceAsync<TopLevelArmResource>;

  @scenario
  @scenarioDoc("""
  Resource PATCH operation.
  Expected url: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource
  Expected query parameter: api-version=2023-12-01-preview
  Expected request body:
  ```json
  {
    "properties":{
      "description": <any string>
    }
  }
  ```
  Expected response body:
  ```json
  {
    "id": /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource,
    "name": topLevelResource,
    "type": topLevel,
    "properties":{
      "description": <given string in request body>,
      "provisioningState": "Succeeded"
    },
    "systemData": <any object>
  }
  ```
  """)
  update is ArmResourcePatchAsync<TopLevelArmResource, TopLevelArmResourceProperties>;

  @scenario
  @scenarioDoc("""
  Resource DELETE operation.
  Expected url: /subscriptions/00000000-000000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource
  Expected query parameter: api-version=2023-12-01-preview
  ```
  Expected response status code: 204
  """)
  delete is ArmResourceDeleteWithoutOkAsync<TopLevelArmResource>;

  @scenario
  @scenarioDoc("""
  Resource LIST operation.
  Expected url: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelArmResources
  Expected query parameter: api-version=2023-12-01-preview

  Expected response body:
  ```json
  {
    "value": [{
      "id": /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource,
      "name": topLevelResource,
      "type": topLevel,
      "properties":{
        "description": <any string>,
        "provisioningState": "Succeeded"
      },
      "systemData": <any object>
    }]
  }
  ```
  """)
  listByResourceGroup is ArmResourceListByParent<TopLevelArmResource>;

  @scenario
  @scenarioDoc("""
  Resource LIST operation.
  Expected url: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelArmResources
  Expected query parameter: api-version=2023-12-01-preview

  Expected response body:
  ```json
  {
    "value": [{
      "id": /subscriptions/00000000-0000-0000-0000-000000000000/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource,
      "name": topLevelResource,
      "type": topLevel,
      "properties":{
        "description": <any string>,
        "provisioningState": "Succeeded"
      },
      "systemData": <any object>
    }]
  }
  ```
  """)
  listBySubscription is ArmListBySubscription<TopLevelArmResource>;
}
