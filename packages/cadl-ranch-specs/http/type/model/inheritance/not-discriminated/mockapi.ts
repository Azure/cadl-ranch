import { passOnSuccess, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const inheritanceValidBody = { name: "abc", age: 32, smart: true };

Scenarios.Type_Model_Inheritance_NotDiscriminated_postValid = passOnSuccess({
  uri: "/type/model/inheritance/not-discriminated/valid",
  method: "post",
  request: {
    body: inheritanceValidBody,
  },
  response: {
    status: 204,
  },
  kind: "MockApiDefinition",
});
Scenarios.Type_Model_Inheritance_NotDiscriminated_getValid = passOnSuccess({
  uri: "/type/model/inheritance/not-discriminated/valid",
  method: "get",
  request: {},
  response: {
    status: 200,
    body: json(inheritanceValidBody),
  },
  kind: "MockApiDefinition",
});
Scenarios.Type_Model_Inheritance_NotDiscriminated_putValid = passOnSuccess({
  uri: "/type/model/inheritance/not-discriminated/valid",
  method: "put",
  request: {
    body: inheritanceValidBody,
  },
  response: {
    status: 200,
    body: json(inheritanceValidBody),
  },
  kind: "MockApiDefinition",
});
