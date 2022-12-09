import { passOnSuccess, mockapi, json, passOnCode } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

// Known Values
Scenarios.Enums_Fixed_String_getKnownValue = passOnSuccess(
  mockapi.get("/enums/fixed/string/known-value", (req) => {
    return { status: 200, body: json("Monday") };
  }),
);

Scenarios.Enums_Fixed_String_putKnownValue = passOnSuccess(
  mockapi.put("/enums/fixed/string/known-value", (req) => {
    req.expect.bodyEquals("Monday");
    return { status: 204 };
  }),
);

// Unknown values
Scenarios.Enums_Fixed_String_putUnknownValue = passOnCode(
  500,
  mockapi.put("/enums/fixed/string/unknown-value", (req) => {
    req.expect.bodyEquals("Weekend");
    return { status: 500 };
  }),
);
