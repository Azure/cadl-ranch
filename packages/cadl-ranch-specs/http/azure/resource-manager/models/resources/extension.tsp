import "@typespec/http";
import "@typespec/rest";
import "@azure-tools/typespec-azure-core";
import "@azure-tools/typespec-azure-resource-manager";

using TypeSpec.Http;
using TypeSpec.Rest;
using Azure.Core;
using Azure.ResourceManager;
using TypeSpec.OpenAPI;

namespace Azure.ResourceManager.Models.Resources;

@parentResource(TopLevelTrackedResource)
model CustomExtensionResource is ExtensionResource<CustomExtensionResourceProperties> {
  ...ResourceNameParameter<CustomExtensionResource>;
}

/** CustomExtensionResource properties */
model CustomExtensionResourceProperties {
  @doc("The description of the resource.")
  description?: string;

  /** The status of the last operation. */
  @visibility("read")
  provisioningState?: ProvisioningState;
}

@armResourceOperations
interface CustomExtensionResources {
  @scenario
  @scenarioDoc("""
    Resource GET operation.
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top/customExtensionResources/extension
    Expected query parameter: api-version=2023-12-01-preview
    
    Expected response body:
    ```json
    {
      "id": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top/customExtensionResources/extension",
      "name": "extension",
      "type": "extension",
      "properties":{
        "description": "valid",
        "provisioningState": "Succeeded"
      },
      "systemData": {
        "createdBy": "AzureSDK",
        "createdByType": "User",
        "createdAt": <any date>,
        "lastModifiedBy": "AzureSDK",
        "lastModifiedAt": <any date>,
        "lastModifiedByType": "User",
      }
    }
    ```
    """)
  get is ArmResourceRead<CustomExtensionResource>;

  @scenario
  @scenarioDoc("""
    Resource PUT operation.
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top/customExtensionResources/extension
    Expected query parameter: api-version=2023-12-01-preview
    
    Expected request body:
    ```json
    {
      "properties":{
        "description": "valid",
    }
    ```
    
    Expected response body:
    ```json
    {
      "id": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top/customExtensionResources/extension",
      "name": "extension",
      "type": "extension",
      "properties":{
        "description": "valid",
        "provisioningState": "Succeeded"
      },
      "systemData": {
        "createdBy": "AzureSDK",
        "createdByType": "User",
        "createdAt": <any date>,
        "lastModifiedBy": "AzureSDK",
        "lastModifiedAt": <any date>,
        "lastModifiedByType": "User",
      }
    }
    ```
    """)
  createOrUpdate is ArmResourceCreateOrReplaceAsync<CustomExtensionResource>;

  @scenario
  @scenarioDoc("""
    Resource Patch operation.
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top/customExtensionResources/extension
    Expected query parameter: api-version=2023-12-01-preview
    
    Expected request body:
    ```json
    {
      "properties":{
        "description": "valid2",
    }
    ```
    
    Expected response body:
    ```json
    {
      "id": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top/customExtensionResources/extension",
      "name": "extension",
      "type": "extension",
      "properties":{
        "description": "valid2",
        "provisioningState": "Succeeded"
      },
      "systemData": {
        "createdBy": "AzureSDK",
        "createdByType": "User",
        "createdAt": <any date>,
        "lastModifiedBy": "AzureSDK",
        "lastModifiedAt": <any date>,
        "lastModifiedByType": "User",
      }
    }
    ```
    """)
  update is ArmResourcePatchSync<CustomExtensionResource, CustomExtensionResourceProperties>;

  @scenario
  @scenarioDoc("""
    Resource DELETE operation.
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top/customExtensionResources/extension
    Expected query parameter: api-version=2023-12-01-preview
    ```
    Expected response status code: 204
    """)
  delete is ArmResourceDeleteSync<CustomExtensionResource>;

  @scenario
  @scenarioDoc("""
    Resource LIST by resource group operation.
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top/customExtensionResources
    Expected query parameter: api-version=2023-12-01-preview
    
    Expected response body:
    ```json
    {
      "value": [{
        "id": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top/customExtensionResources/extension",
        "name": "extension",
        "type": "extension",
        "properties":{
          "description": "valid",
          "provisioningState": "Succeeded"
        },
        "systemData": {
          "createdBy": "AzureSDK",
          "createdByType": "User",
          "createdAt": <any date>,
          "lastModifiedBy": "AzureSDK",
          "lastModifiedAt": <any date>,
          "lastModifiedByType": "User",
        }
      }]
    }
    ```
    """)
  listByResourceGroup is ArmResourceListByParent<CustomExtensionResource>;
}
