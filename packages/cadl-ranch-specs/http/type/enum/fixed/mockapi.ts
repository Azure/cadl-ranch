import { passOnSuccess, mockapi, json, passOnCode } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

// Known Values
Scenarios.Type_Enum_Fixed_String_getKnownValue = passOnSuccess(
  mockapi.get("/type/enum/fixed/string/known-value", (req) => {
    return { status: 200, body: json("Monday") };
  }),
);

Scenarios.Type_Enum_Fixed_String_putKnownValue = passOnSuccess(
  mockapi.put("/type/enum/fixed/string/known-value", (req) => {
    req.expect.bodyEquals("Monday");
    return { status: 204 };
  }),
);

// Unknown values
Scenarios.Type_Enum_Fixed_String_putUnknownValue = passOnCode(
  500,
  mockapi.put("/type/enum/fixed/string/unknown-value", (req) => {
    req.expect.bodyEquals("Weekend");
    return { status: 500 };
  }),
);

// Known Int Values
Scenarios.Type_Enum_Fixed_Int_getKnownValue = passOnSuccess(
  mockapi.get("/type/enum/fixed/int/known-value", (req) => {
    return { status: 200, body: json(1) };
  }),
);

Scenarios.Type_Enum_Fixed_Int_putKnownValue = passOnSuccess(
  mockapi.put("/type/enum/fixed/int/known-value", (req) => {
    req.expect.bodyEquals(1);
    return { status: 204 };
  }),
);

// Unknown Int values
Scenarios.Type_Enum_Fixed_Int_putUnknownValue = passOnCode(
  500,
  mockapi.put("/type/enum/fixed/int/unknown-value", (req) => {
    req.expect.bodyEquals(6);
    return { status: 500 };
  }),
);

// Known Float Values
Scenarios.Type_Enum_Fixed_Float_getKnownValue = passOnSuccess(
  mockapi.get("/type/enum/fixed/float/known-value", (req) => {
    return { status: 200, body: json(1.1) };
  }),
);

Scenarios.Type_Enum_Fixed_Float_putKnownValue = passOnSuccess(
  mockapi.put("/type/enum/fixed/float/known-value", (req) => {
    req.expect.bodyEquals(1.1);
    return { status: 204 };
  }),
);

// Unknown Float values
Scenarios.Type_Enum_Fixed_Float_putUnknownValue = passOnCode(
  500,
  mockapi.put("/type/enum/fixed/float/unknown-value", (req) => {
    req.expect.bodyEquals(6.6);
    return { status: 500 };
  }),
);
