import { passOnSuccess, json, MockRequest } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

function createMockServerTests(uri: string, data: any) {
  return {
    get: passOnSuccess({
      uri,
      method: "get",
      request: {},
      response: {
        status: 200,
        body: json(data),
      },
      handler: (req: MockRequest) => {
        return { status: 200, body: json(data) };
      },
      kind: "MockApiDefinition",
    }),
    put: passOnSuccess({
      uri,
      method: "put",
      request: {
        body: data,
        headers: {
          "Content-Type": "text/plain",
        },
      },
      response: {
        status: 204,
      },
      handler: (req: MockRequest) => {
        req.expect.bodyEquals(data);
        return { status: 204 };
      },
      kind: "MockApiDefinition",
    }),
  };
}

// Known Values
const Type_Enum_Extensible_String_Known_Value = createMockServerTests(
  `/type/enum/extensible/string/known-value`,
  "Monday",
);
Scenarios.Type_Enum_Extensible_String_getKnownValue = Type_Enum_Extensible_String_Known_Value.get;
Scenarios.Type_Enum_Extensible_String_putKnownValue = Type_Enum_Extensible_String_Known_Value.put;

// Unknown values
const Type_Enum_Extensible_String_UnKnown_Value = createMockServerTests(
  `/type/enum/extensible/string/unknown-value`,
  "Weekend",
);
Scenarios.Type_Enum_Extensible_String_getUnknownValue = Type_Enum_Extensible_String_UnKnown_Value.get;
Scenarios.Type_Enum_Extensible_String_putUnknownValue = Type_Enum_Extensible_String_UnKnown_Value.put;
