import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

// Known Values
Scenarios.Type_Enum_Extensible_String_getKnownValue = passOnSuccess(
  mockapi.get("/type/enum/extensible/string/known-value", (req) => {
    return { status: 200, body: json("Monday") };
  }),
);

Scenarios.Type_Enum_Extensible_String_putKnownValue = passOnSuccess(
  mockapi.put("/type/enum/extensible/string/known-value", (req) => {
    req.expect.bodyEquals("Monday");
    return { status: 204 };
  }),
);

// Unknown values
Scenarios.Type_Enum_Extensible_String_getUnknownValue = passOnSuccess(
  mockapi.get("/type/enum/extensible/string/unknown-value", (req) => {
    return { status: 200, body: json("Weekend") };
  }),
);

Scenarios.Type_Enum_Extensible_String_putUnknownValue = passOnSuccess(
  mockapi.put("/type/enum/extensible/string/unknown-value", (req) => {
    req.expect.bodyEquals("Weekend");
    return { status: 204 };
  }),
);

// Known Values
Scenarios.Type_Enum_Extensible_Int_getKnownValue = passOnSuccess(
  mockapi.get("/type/enum/extensible/int/known-value", (req) => {
    return { status: 200, body: json(1) };
  }),
);

Scenarios.Type_Enum_Extensible_Int_putKnownValue = passOnSuccess(
  mockapi.put("/type/enum/extensible/int/known-value", (req) => {
    req.expect.bodyEquals(1);
    return { status: 204 };
  }),
);

// Unknown values
Scenarios.Type_Enum_Extensible_Int_getUnknownValue = passOnSuccess(
  mockapi.get("/type/enum/extensible/int/unknown-value", (req) => {
    return { status: 200, body: json(2) };
  }),
);

Scenarios.Type_Enum_Extensible_Int_putUnknownValue = passOnSuccess(
  mockapi.put("/type/enum/extensible/int/unknown-value", (req) => {
    req.expect.bodyEquals(2);
    return { status: 204 };
  }),
);
