import { passOnSuccess, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Azure_ClientGenerator_Core_Usage_ModelInOperation = passOnSuccess([
  {
    uri: "/azure/client-generator-core/usage/inputToInputOutput",
    method: "post",
    request: {
      body: {
        name: "Madge",
      },
    },
    response: {
      status: 204,
    },
    kind: "MockApiDefinition",
  },
  {
    uri: "/azure/client-generator-core/usage/outputToInputOutput",
    method: "get",
    request: {},
    response: {
      status: 200,
      body: json({ name: "Madge" }),
    },
    kind: "MockApiDefinition",
  },
  {
    uri: "/azure/client-generator-core/usage/modelInReadOnlyProperty",
    method: "put",
    request: {},
    response: {
      status: 200,
      body: json({ result: { name: "Madge" } }),
    },
    kind: "MockApiDefinition",
  },
]);
