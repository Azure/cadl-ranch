import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

// Known Values
Scenarios.Types_Enum_Extensible_String_getKnownValue = passOnSuccess(
  mockapi.get("/types/enum/extensible/string/known-value", (req) => {
    return { status: 200, body: json("Monday") };
  }),
);

Scenarios.Types_Enum_Extensible_String_putKnownValue = passOnSuccess(
  mockapi.put("/types/enum/extensible/string/known-value", (req) => {
    req.expect.bodyEquals("Monday");
    return { status: 204 };
  }),
);

// Unknown values
Scenarios.Types_Enum_Extensible_String_getUnknownValue = passOnSuccess(
  mockapi.get("/types/enum/extensible/string/unknown-value", (req) => {
    return { status: 200, body: json("Weekend") };
  }),
);

Scenarios.Types_Enum_Extensible_String_putUnknownValue = passOnSuccess(
  mockapi.put("/types/enum/extensible/string/unknown-value", (req) => {
    req.expect.bodyEquals("Weekend");
    return { status: 204 };
  }),
);
