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

model ExtensionsResource is ExtensionResource<ExtensionsResourceProperties> {
  ...ResourceNameParameter<ExtensionsResource>;
}

/** ExtensionsResource properties */
model ExtensionsResourceProperties {
  @doc("The description of the resource.")
  description?: string;

  /** The status of the last operation. */
  @visibility("read")
  provisioningState?: ProvisioningState;
}

@armResourceOperations
interface ExtensionsResources {
  @scenario
  @scenarioDoc("""
    Resource GET operation.
    Expected path: /<resourceUri>/providers/Azure.ResourceManager.Models.Resources/extensionsResources/extension
    Expected query parameter: api-version=2023-12-01-preview
    
    Expected response body:
    ```json
    {
      "id": "/<resourceUri>/providers/Azure.ResourceManager.Models.Resources/extensionsResources/extension",
      "name": "extension",
      "type": "Azure.ResourceManager.Models.Resources/extensionsResources",
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
  get is ArmResourceRead<ExtensionsResource>;

  @scenario
  @scenarioDoc("""
    Resource PUT operation.
    Expected path: /<resourceUri>/providers/Azure.ResourceManager.Models.Resources/extensionsResources/extension
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
      "id": "/<resourceUri>/providers/Azure.ResourceManager.Models.Resources/extensionsResources/extension",
      "name": "extension",
      "type": "Azure.ResourceManager.Models.Resources/extensionsResources",
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
  createOrUpdate is ArmResourceCreateOrReplaceAsync<ExtensionsResource>;

  @scenario
  @scenarioDoc("""
    Resource Patch operation.
    Expected path: /<resourceUri>/providers/Azure.ResourceManager.Models.Resources/extensionsResources/extension
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
      "id": "/<resourceUri>/providers/Azure.ResourceManager.Models.Resources/extensionsResources/extension",
      "name": "extension",
      "type": "Azure.ResourceManager.Models.Resources/extensionsResources",
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
  update is ArmResourcePatchSync<ExtensionsResource, ExtensionsResourceProperties>;

  @scenario
  @scenarioDoc("""
    Resource DELETE operation.
    Expected path: /<resourceUri>/providers/Azure.ResourceManager.Models.Resources/extensionsResources/extension
    Expected query parameter: api-version=2023-12-01-preview
    ```
    Expected response status code: 204
    """)
  delete is ArmResourceDeleteSync<ExtensionsResource>;

  @scenario
  @scenarioDoc("""
    Resource LIST by parent url operation.
    Expected path: /<resourceUri>/providers/Azure.ResourceManager.Models.Resources/extensionResources
    Expected query parameter: api-version=2023-12-01-preview
    
    Expected response body:
    ```json
    {
      "value": [{
        "id": "/<resourceUri>/providers/Azure.ResourceManager.Models.Resources/extensionsResources/extension",
        "name": "extension",
        "type": "Azure.ResourceManager.Models.Resources/extensionsResources",
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
  listByParent is ArmResourceListByParent<ExtensionsResource>;
}
