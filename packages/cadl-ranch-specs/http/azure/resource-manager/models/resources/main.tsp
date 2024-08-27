import "@azure-tools/cadl-ranch-expect";
import "@typespec/http";
import "@typespec/rest";
import "@typespec/versioning";
import "@azure-tools/typespec-azure-core";
import "@azure-tools/typespec-azure-resource-manager";
import "@azure-tools/typespec-client-generator-core";
import "./toplevel.tsp";
import "./nested.tsp";
import "./singleton.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using TypeSpec.Versioning;
using Azure.Core;
using Azure.ResourceManager;
using TypeSpec.OpenAPI;

@armProviderNamespace
@service
@versioned(Versions)
@doc("Arm Resource Provider management API.")
namespace Azure.ResourceManager.Models.Resources;

@doc("Azure API versions.")
enum Versions {
  @armCommonTypesVersion(CommonTypes.Versions.v5)
  @useDependency(Azure.Core.Versions.v1_0_Preview_2)
  @useDependency(Azure.ResourceManager.Versions.v1_0_Preview_1)
  @doc("Preview API version 2023-12-01-preview.")
  v2023_12_01_preview: "2023-12-01-preview",
}

union ProvisioningState {
  ResourceProvisioningState,
  Provisioning: "Provisioning",
  Updating: "Updating",
  Deleting: "Deleting",
  Accepted: "Accepted",
}

@resource("operationStatuses")
@parentResource(TenantLocationResource)
model TenantOperationStatus is ArmOperationStatus;

@parentResource(SubscriptionLocationResource)
model SubscriptionOperationStatus is ArmOperationStatus;

@parentResource(ResourceGroupLocationResource)
model ResourceGroupOperationStatus is ArmOperationStatus;

@armResourceOperations
interface OperationStatuses {
  @scenario
  @scenarioDoc("""
      Resource GET operation.
      Expected path: /providers/Azure.ResourceManager.Models.Resources/locations/westus/operationStatuses/00000000-0000-0000-0000-000000000000
      Expected query parameter: api-version=2023-12-01-preview
    
      Expected response body:
      ```json
      {
        "name": "TenantOperation",
        "startTime": <any date>,
        "endTime": <any date>,
        "percentComplete": 2,
        "status": "Failed",
        "ManagementError": {
          "code": "404",
          "message": "The error message of status test. ",
          "target": "The target of status test.",
          "details": [{
            "code": "404",
            "message": "The error message of status test. ",
            "target": "The target of status test.",
          }],
          "additionalInfo": [{
            "type": "additionalType",
            "info": "additionalInfo"
          }]
        }
      }
      ```
    """)
  getTenantStatus is ArmResourceRead<TenantOperationStatus>;

  @scenario
  @scenarioDoc("""
      Resource GET operation.
      Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/providers/Azure.ResourceManager.Models.Resources/locations/westus/operationStatuses/00000000-0000-0000-0000-000000000000
      Expected query parameter: api-version=2023-12-01-preview
    
      Expected response body:
      ```json
      {
        "name": "SubscriptionOperation",
        "startTime": <any date>,
        "endTime": <any date>,
        "percentComplete": 2,
        "status": "Failed",
        "ManagementError": {
          "code": "404",
          "message": "The error message of status test. ",
          "target": "The target of status test.",
          "details": [{
            "code": "404",
            "message": "The error message of status test. ",
            "target": "The target of status test.",
          }],
          "additionalInfo": [{
            "type": "additionalType",
            "info": "additionalInfo"
          }]
        }
      }
      ```
    """)
  getSubscriptionStatus is ArmResourceRead<SubscriptionOperationStatus>;

  @scenario
  @scenarioDoc("""
      Resource GET operation.
      Expected path: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/locations/westus/operationStatuses/00000000-0000-0000-0000-000000000000
      Expected query parameter: api-version=2023-12-01-preview
    
      Expected response body:
      ```json
      {
        "name": "ResourceGroupOperation",
        "startTime": <any date>,
        "endTime": <any date>,
        "percentComplete": 2,
        "status": "Failed",
        "ManagementError": {
          "code": "404",
          "message": "The error message of status test. ",
          "target": "The target of status test.",
          "details": [{
            "code": "404",
            "message": "The error message of status test. ",
            "target": "The target of status test.",
          }],
          "additionalInfo": [{
            "type": "additionalType",
            "info": "additionalInfo"
          }]
        }
      }
      ```
    """)
  getResourceGroupStatus is ArmResourceRead<ResourceGroupOperationStatus>;
}
