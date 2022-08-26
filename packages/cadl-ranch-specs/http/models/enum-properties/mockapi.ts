import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.EnumProperties_sendEnumPropertyModel = passOnSuccess(
  mockapi.post("/enum-properties-basic/models", (req) => {
    const expectedBody = { Day: "Wednesday", Language: "Undocumented" };
    req.expect.bodyEquals(expectedBody);
    return { status: 200 };
  }),
);
Scenarios.EnumProperties_getEnumPropertyModel = passOnSuccess(
  mockapi.get("/enum-properties-basic/models", () => {
    return { status: 200, body: json({ Day: "Wednesday", Language: "Undocumented" }) };
  }),
);
Scenarios.EnumProperties_setEnumPropertyModel = passOnSuccess(
  mockapi.put("/enum-properties-basic/models", (req) => {
    const expectedBody = { Day: "Wednesday", Language: "Undocumented" };
    req.expect.bodyEquals(expectedBody);
    return { status: 200, body: json({ Day: "Monday", Language: "English" }) };
  }),
);
