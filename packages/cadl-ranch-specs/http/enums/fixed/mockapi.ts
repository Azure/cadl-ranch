import { passOnSuccess, mockapi, json, passOnCode } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

// Known Values
Scenarios.FixedEnums_String_getKnownValue = passOnSuccess(
  mockapi.get("/fixed-enums/string/known-value", (req) => {
    return { status: 200, body: json("Monday") };
  }),
);

Scenarios.FixedEnums_String_putKnownValue = passOnSuccess(
  mockapi.put("/fixed-enums/string/known-value", (req) => {
    req.expect.bodyEquals("Monday");
    return { status: 204 };
  }),
);

// Unknown values
Scenarios.FixedEnums_String_putUnknownValue = passOnCode(
  500,
  mockapi.put("/fixed-enums/string/unknown-value", (req) => {
    req.expect.bodyEquals("Weekend");
    return { status: 500 };
  }),
);
