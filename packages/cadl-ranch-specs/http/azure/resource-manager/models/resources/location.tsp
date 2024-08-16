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

@resource("locationTrackedResources")
@parentResource(ArmLocationResource<"ResourceGroup">)
model Employee is TrackedResource<EmployeeProperties> {
  ...ResourceNameParameter<Employee>;
}

/** Employee properties */
model EmployeeProperties {
  /** Age of employee */
  age?: int32;

  /** The status of the last operation. */
  @visibility("read")
  provisioningState?: ProvisioningState;
}

@armResourceOperations
interface LocationTrackedResources {
  @scenario
  @scenarioDoc("""
    Resource GET operation.
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/locations/eastus/locationTrackedResources/employee
    Expected query parameter: api-version=2023-12-01-preview
    
    Expected response body:
    ```json
    {
      "id": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/locations/eastus/locationTrackedResources/employee",
      "name": "employee",
      "type": "Azure.ResourceManager.Models.Resources/locationTrackedResources",
      "location": "eastus",
      "properties":{
        "age": 32,
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
  get is ArmResourceRead<Employee>;

  @scenario
  @scenarioDoc("""
    Resource PUT operation.
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/locations/eastus/locationTrackedResources/employee
    Expected query parameter: api-version=2023-12-01-preview
    Expected request body:
    ```json
    {
      "location": "westus",
      "properties": {
        "age": 32,
      }
    }
    ```
    Expected response body:
    ```json
    {
      "id": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/locations/eastus/locationTrackedResources/employee",
      "name": "location",
      "type": "Azure.ResourceManager.Models.Resources/locationTrackedResources",
      "location": "westus",
      "properties": {
        "age": 32,
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
  createOrUpdate is ArmResourceCreateOrReplaceAsync<Employee>;

  @scenario
  @scenarioDoc("""
    Resource PATCH operation.
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/locations/eastus/locationTrackedResources/employee
    Expected query parameter: api-version=2023-12-01-preview
    Expected request body:
    ```json
    {
      "location": "westus",
      "properties": {
        "age": 34,
      }
    }
    ```
    Expected response body:
    ```json
    {
      "id": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/locations/eastus/locationTrackedResources/employee",
      "name": "location",
      "type": "Azure.ResourceManager.Models.Resources/locationTrackedResources",
      "location": "westus",
      "properties":{
        "age": 34,
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
  update is ArmResourcePatchSync<Employee, EmployeeProperties>;

  @scenario
  @scenarioDoc("""
    Resource DELETE operation.
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/locations/eastus/locationTrackedResources/employee
    Expected query parameter: api-version=2023-12-01-preview
    ```
    Expected response status code: 204
    """)
  delete is ArmResourceDeleteSync<Employee>;

  @scenario
  @scenarioDoc("""
    Resource LIST by resource group operation.
    Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/locations/eastus/locationTrackedResources
    Expected query parameter: api-version=2023-12-01-preview
    
    Expected response body:
    ```json
    {
      "value": [{
        "id": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/locations/eastus/locationTrackedResources/employee",
        "name": "location",
        "type": "Azure.ResourceManager.Models.Resources/locationTrackedResources",
        "location": "westus",
        "properties":{
          "age": 32,
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
  listByLocation is ArmResourceListByParent<Employee>;
}
