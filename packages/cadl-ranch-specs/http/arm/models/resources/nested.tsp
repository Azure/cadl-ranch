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

@doc("Nested child of Top Level Arm Resource.")
@parentResource(TopLevelArmResource)
model NestedChildResource is TrackedResource<NestedChildResourceProperties> {
  @key("nextedResourceName")
  @doc("ChildResources")
  @visibility("read")
  @path
  @segment("nestedResources")
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
  Resource GET operation.
  Expected url: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Arm.Models.Resources/topLevelArmResources/{resourceName}/nestedResources/{nestedResourceName}
  Expected query parameter: api-version=2023-12-01-preview

  Expected response body:
  ```json
  {
    "id": /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Arm.Models.Resources/topLevelArmResources/{resourceName}/nestedResources/{nestedResourceName},
    "name": {nestedResourceName},
    "type": nested,
    "properties":{
      "description": <any string>,
      "provisioningState": "Succeeded"
    },
    "systemData": {
      "createdBy": "AzureSDK",
      "createdByType": "User",
      "createdAt": new Date(),
      "lastModifiedBy": "AzureSDK",
      "lastModifiedAt": new Date(),
      "lastModifiedByType": "User",
    }
  }
  ```
  """)
  get is ArmResourceRead<NestedChildResource>;

  @scenario
  @scenarioDoc("""
  Resource PUT operation.
  Expected url: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Arm.Models.Resources/topLevelArmResources/{resourceName}/nestedResources/{nestedResourceName}
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
    "id": /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Arm.Models.Resources/topLevelArmResources/{resourceName}/nestedResources/{nestedResourceName},
    "name": {nestedResourceName},
    "type": nested,
    "properties":{
      "description": <given string in request body>,
      "provisioningState": "Succeeded"
    },
    "systemData": {
      "createdBy": "AzureSDK",
      "createdByType": "User",
      "createdAt": new Date(),
      "lastModifiedBy": "AzureSDK",
      "lastModifiedAt": new Date(),
      "lastModifiedByType": "User",
    }
  }
  ```
  """)
  createOrReplace is ArmResourceCreateOrReplaceAsync<NestedChildResource>;

  @scenario
  @scenarioDoc("""
  Resource PATCH operation.
  Expected url: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Arm.Models.Resources/topLevelArmResources/{resourceName}/nestedResources/{nestedResourceName}
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
    "id": /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Arm.Models.Resources/topLevelArmResources/{resourceName}/nestedResources/{nestedResourceName},
    "name": {nestedResourceName},
    "type": nested,
    "properties":{
      "description": <given string in request body>,
      "provisioningState": "Succeeded"
    },
    "systemData": {
      "createdBy": "AzureSDK",
      "createdByType": "User",
      "createdAt": new Date(),
      "lastModifiedBy": "AzureSDK",
      "lastModifiedAt": new Date(),
      "lastModifiedByType": "User",
    }
  }
  ```
  """)
  update is ArmResourcePatchAsync<NestedChildResource, NestedChildResourceProperties>;

  @scenario
  @scenarioDoc("""
  Resource DELETE operation.
  Expected url: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Arm.Models.Resources/topLevelArmResources/{resourceName}/nestedResources/{nestedResourceName}
  Expected query parameter: api-version=2023-12-01-preview
  Expected response status code: 204
  """)
  delete is ArmResourceDeleteWithoutOkAsync<NestedChildResource>;

  @scenario
  @scenarioDoc("""
  Resource LIST operation.
  Expected url: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Arm.Models.Resources/topLevelArmResources/{resourceName}/nestedResources
  Expected query parameter: api-version=2023-12-01-preview

  Expected response body:
  ```json
  {
    "value": [{
      "id": /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Arm.Models.Resources/topLevelArmResources/{resourceName}/nestedResources,
      "name": nestedResource,
      "type": nested,
      "properties":{
        "description": <any string>,
        "provisioningState": "Succeeded"
      },
      "systemData": {
        "createdBy": "AzureSDK",
        "createdByType": "User",
        "createdAt": new Date(),
        "lastModifiedBy": "AzureSDK",
        "lastModifiedAt": new Date(),
        "lastModifiedByType": "User",
      }
    }]
  }
  ```
  """)
  listByParent is ArmResourceListByParent<NestedChildResource>;
}
