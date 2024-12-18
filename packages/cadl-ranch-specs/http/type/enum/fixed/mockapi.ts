import { passOnSuccess, json, passOnCode } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

// Known Values
Scenarios.Type_Enum_Fixed_String_getKnownValue = passOnSuccess({
  uri: "/type/enum/fixed/string/known-value",
  method: "get",
  request: {},
  response: {
    status: 200,
    body: json("Monday"),
  },
  kind: "MockApiDefinition",
});

Scenarios.Type_Enum_Fixed_String_putKnownValue = passOnSuccess({
  uri: "/type/enum/fixed/string/known-value",
  method: "put",
  request: {
    body: "Monday",
    headers: {
      "Content-Type": "application/json",
    },
  },
  response: {
    status: 204,
  },
  kind: "MockApiDefinition",
});

// Unknown values
Scenarios.Type_Enum_Fixed_String_putUnknownValue = passOnCode(500, {
  uri: "/type/enum/fixed/string/unknown-value",
  method: "put",
  request: {
    body: "Weekend",
    headers: {
      "Content-Type": "application/json",
    },
    status: 500,
  },
  response: {
    status: 500,
  },
  kind: "MockApiDefinition",
});
