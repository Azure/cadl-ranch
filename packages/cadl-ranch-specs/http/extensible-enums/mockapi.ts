import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

// Known Values
Scenarios.ExtensibleEnums_String_getKnownValue = passOnSuccess(
  mockapi.get("/extensible-enums/string/known-value", (req) => {
    return { status: 200, body: json("Monday") };
  }),
);

Scenarios.ExtensibleEnums_String_putKnownValue = passOnSuccess(
  mockapi.put("/extensible-enums/string/known-value", (req) => {
    req.expect.bodyEquals("Monday");
    return { status: 204 };
  }),
);

// Unknown values
Scenarios.ExtensibleEnums_String_getUnknownValue = passOnSuccess(
  mockapi.get("/extensible-enums/string/unknown-value", (req) => {
    return { status: 200, body: json("Weekend") };
  }),
);

Scenarios.ExtensibleEnums_String_putUnknownValue = passOnSuccess(
  mockapi.put("/extensible-enums/string/unknown-value", (req) => {
    req.expect.bodyEquals("Weekend");
    return { status: 204 };
  }),
);
