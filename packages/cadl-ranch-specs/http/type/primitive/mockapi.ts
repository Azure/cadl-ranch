import { passOnSuccess, mockapi, json, passOnCode } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

// string value
Scenarios.Type_Primitive_String_getStringValue = passOnSuccess(
  mockapi.get("/type/primitive/string", (req) => {
    return { status: 200, body: json("test") };
  }),
);

Scenarios.Type_Primitive_String_putStringValue = passOnSuccess(
  mockapi.put("/type/primitive/string", (req) => {
    req.expect.bodyEquals("test");
    return { status: 204 };
  }),
);

// boolean value
Scenarios.Type_Primitive_Boolean_getBooleanValue = passOnSuccess(
  mockapi.get("/type/primitive/boolean", (req) => {
    return { status: 200, body: json(true) };
  }),
);

Scenarios.Type_Primitive_Boolean_putBooleanValue = passOnSuccess(
  mockapi.put("/type/primitive/boolean", (req) => {
    req.expect.bodyEquals(true);
    return { status: 204 };
  }),
);

//unknown value
Scenarios.Type_Primitive_Unknown_getUnknownValue = passOnSuccess(
  mockapi.get("/type/primitive/unknown", (req) => {
    return { status: 200, body: json("test") };
  }),
);

Scenarios.Type_Primitive_Unknown_putUnknownValue = passOnSuccess(
  mockapi.put("/type/primitive/unknown", (req) => {
    req.expect.bodyEquals("test");
    return { status: 204 };
  }),
);
