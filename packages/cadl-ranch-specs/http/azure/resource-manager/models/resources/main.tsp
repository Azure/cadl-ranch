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

@armResourceOperations
interface AvailableOperations {
  @scenario
  @scenarioDoc("""
      Resource GET operation.
      Expected path: /providers/Azure.ResourceManager.Models.Resources/operations
      Expected query parameter: api-version=2023-12-01-preview
    
      Expected response body:
      ```json
      {
        "value": [{
          "name": "Microsoft.Compute/virtualMachines/write",
          "isDataAction": false,
          "display": {
            "provider": "Microsoft Compute",
            "resource": "Virtual Machines",
            "operation": "Create or Update Virtual Machine.",
            "description": "Add or modify virtual machines."
          },
          "origin": "user,system",
          "actionType": "Internal"
        }]
      }
      ```
    """)
  list is Operations.list;
}
