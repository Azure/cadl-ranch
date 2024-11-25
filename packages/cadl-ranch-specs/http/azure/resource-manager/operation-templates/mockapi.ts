import { passOnSuccess, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const validAvailableOperations = {
  name: "Microsoft.Compute/virtualMachines/write",
  isDataAction: false,
  display: {
    provider: "Microsoft Compute",
    resource: "Virtual Machines",
    operation: "Create or Update Virtual Machine.",
    description: "Add or modify virtual machines.",
  },
  origin: "user,system",
  actionType: "Internal",
};

// operation list
Scenarios.Azure_ResourceManager_OperationTemplates_ListAvailableOperations = passOnSuccess({
  uri: "/providers/Azure.ResourceManager.OperationTemplates/operations",
  method: "get",
  request: {
    params: {
      "api-version": "2023-12-01-preview",
    },
  },
  response: {
    status: 200,
    body: json({
      value: [validAvailableOperations],
    }),
  },
  kind: "MockApiDefinition",
});
