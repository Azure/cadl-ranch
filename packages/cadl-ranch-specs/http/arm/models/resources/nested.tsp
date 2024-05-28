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

@doc("Nested child of Top Level Tracked Resource.")
@parentResource(TopLevelTrackedResource)
model NestedTrackedResource is TrackedResource<NestedTrackedResourceProperties> {
  @key("nextedTrackedResourceName")
  @doc("Name of the nested resource.")
  @visibility("read")
  @path
  @segment("nestedTrackedResources")
  @pattern("^[A-Za-z0-9]([A-Za-z0-9-_.]{0,62}[A-Za-z0-9])?$")
  name: string;
}

@doc("Nested tracked Resource Properties.")
model NestedTrackedResourceProperties {
  @visibility("read")
  @doc("Provisioning State of the nested child Resource")
  provisioningState?: ProvisioningState;

  @doc("Nested resource description.")
  description?: string;
}

@armResourceOperations
interface NestedTrackedResources {
  @scenario
  @scenarioDoc("""
  Resource GET operation.
  Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelTrackedResources/top/nestedTrackedResources/nested
  Expected query parameter: api-version=2023-12-01-preview

  Expected response body:
  ```json
  {
    "id": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelTrackedResources/top/nestedTrackedResources/nested",
    "name": "nested",
    "type": "nested",
    "location": "eastus",
    "properties":{
      "description": "valid",
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
  get is ArmResourceRead<NestedTrackedResource>;

  @scenario
  @scenarioDoc("""
  Resource PUT operation.
  Expected path: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Arm.Models.Resources/topLevelArmResources/{resourceName}/nestedResources/{nestedResourceName}
  Expected query parameter: api-version=2023-12-01-preview
  Expected request body:
  ```json
  {
    "location": "eastus",
    "properties":{
      "description": "valid"
    }
  }
  ```
  Expected response body:
  ```json
  {
    "id": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelTrackedResources/top/nestedTrackedResources/nested",
    "name": "nested",
    "type": "nested",
    "location": "eastus",
    "properties":{
      "description": "valid",
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
  createOrReplace is ArmResourceCreateOrReplaceAsync<NestedTrackedResource>;

  @scenario
  @scenarioDoc("""
  Resource PATCH operation.
  Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelTrackedResources/top/nestedTrackedResources/nested
  Expected query parameter: api-version=2023-12-01-preview
  Expected request body:
  ```json
  {
    "location": "eastus",
    "properties":{
      "description": "valid"
    }
  }
  ```
  Expected response body:
  ```json
  {
    "id": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelTrackedResources/top/nestedTrackedResources/nested",
    "name": "nested",
    "type": "nested",
    "location": "eastus",
    "properties":{
      "description": "valid",
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
  update is ArmResourcePatchAsync<NestedTrackedResource, NestedTrackedResourceProperties>;

  @scenario
  @scenarioDoc("""
  Resource DELETE operation.
  Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelTrackedResources/top/nestedTrackedResources/nested
  Expected query parameter: api-version=2023-12-01-preview
  Expected response status code: 204
  """)
  delete is ArmResourceDeleteWithoutOkAsync<NestedTrackedResource>;

  @scenario
  @scenarioDoc("""
  Resource LIST operation.
  Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelTrackedResources/top/nestedTrackedResources/nested
  Expected query parameter: api-version=2023-12-01-preview

  Expected response body:
  ```json
  {
    "value": [{
      "id": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Arm.Models.Resources/topLevelTrackedResources/top/nestedTrackedResources/nested",
      "name": "nested",
      "type": "nested",
      "location": "eastus",
      "properties":{
        "description": "valid",
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
  listByParent is ArmResourceListByParent<NestedTrackedResource>;
}
