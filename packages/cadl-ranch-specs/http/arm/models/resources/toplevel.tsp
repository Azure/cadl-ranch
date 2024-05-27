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
  Expected url: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Arm.Models.Resources/topLevelArmResources/{resourceName}
  Expected query parameter: api-version=2023-12-01-preview

  Expected response body:
  ```json
  {
    "id": /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Arm.Models.Resources/topLevelArmResources/{resourceName},
    "name": {resourceName},
    "type": topLevel,
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
  get is ArmResourceRead<TopLevelArmResource>;

  @scenario
  @scenarioDoc("""
  Resource PUT operation.
  Expected url: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Arm.Models.Resources/topLevelArmResources/{resourceName}
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
    "id": /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Arm.Models.Resources/topLevelArmResources/{resourceName},
    "name": {resourceName},
    "type": topLevel,
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
  createOrReplace is ArmResourceCreateOrReplaceAsync<TopLevelArmResource>;

  @scenario
  @scenarioDoc("""
  Resource PATCH operation.
  Expected url: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Arm.Models.Resources/topLevelArmResources/{resourceName}
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
    "id": /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Arm.Models.Resources/topLevelArmResources/{resourceName},
    "name": {resourceName},
    "type": topLevel,
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
  update is ArmResourcePatchAsync<TopLevelArmResource, TopLevelArmResourceProperties>;

  @scenario
  @scenarioDoc("""
  Resource DELETE operation.
  Expected url: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Arm.Models.Resources/topLevelArmResources/{resourceName}
  Expected query parameter: api-version=2023-12-01-preview
  ```
  Expected response status code: 204
  """)
  delete is ArmResourceDeleteWithoutOkAsync<TopLevelArmResource>;

  @scenario
  @scenarioDoc("""
  Resource LIST operation.
  Expected url: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Arm.Models.Resources/topLevelArmResources
  Expected query parameter: api-version=2023-12-01-preview

  Expected response body:
  ```json
  {
    "value": [{
      "id": /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Arm.Models.Resource/topLevelArmResources/topLevelResource,
      "name": topLevelResource,
      "type": topLevel,
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
  listByResourceGroup is ArmResourceListByParent<TopLevelArmResource>;

  @scenario
  @scenarioDoc("""
  Resource LIST operation.
  Expected url: /subscriptions/{subscriptionId}/providers/Arm.Models.Resources/topLevelArmResources
  Expected query parameter: api-version=2023-12-01-preview

  Expected response body:
  ```json
  {
    "value": [{
      "id": /subscriptions/{subscriptionId}/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource,
      "name": topLevelResource,
      "type": topLevel,
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
  listBySubscription is ArmListBySubscription<TopLevelArmResource>;
}
