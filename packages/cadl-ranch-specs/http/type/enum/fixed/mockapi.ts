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

// Read only values
Scenarios.Type_Enum_Fixed_String_getRequiredReadonlyValue = passOnSuccess(
  mockapi.get("/type/enum/fixed/string/readonly-required-value", (req) => {
    return { status: 200, body: json({ day: "Monday" }) };
  }),
);

Scenarios.Type_Enum_Fixed_String_getOptionalReadonlyValue = passOnSuccess(
  mockapi.get("/type/enum/fixed/string/readonly-optional-value", (req) => {
    return { status: 200, body: json({}) };
  }),
);
