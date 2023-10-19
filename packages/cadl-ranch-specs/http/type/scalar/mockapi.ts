import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

// string value
Scenarios.Type_Scalar_String_get = passOnSuccess(
  mockapi.get("/type/scalar/string", (req) => {
    return { status: 200, body: json("test") };
  }),
);

Scenarios.Type_Scalar_String_put = passOnSuccess(
  mockapi.put("/type/scalar/string", (req) => {
    req.expect.bodyEquals("test");
    return { status: 204 };
  }),
);

// boolean value
Scenarios.Type_Scalar_Boolean_get = passOnSuccess(
  mockapi.get("/type/scalar/boolean", (req) => {
    return { status: 200, body: json(true) };
  }),
);

Scenarios.Type_Scalar_Boolean_put = passOnSuccess(
  mockapi.put("/type/scalar/boolean", (req) => {
    req.expect.bodyEquals(true);
    return { status: 204 };
  }),
);

//unknown value
Scenarios.Type_Scalar_Unknown_get = passOnSuccess(
  mockapi.get("/type/scalar/unknown", (req) => {
    return { status: 200, body: json("test") };
  }),
);

Scenarios.Type_Scalar_Unknown_put = passOnSuccess(
  mockapi.put("/type/scalar/unknown", (req) => {
    req.expect.bodyEquals("test");
    return { status: 204 };
  }),
);
