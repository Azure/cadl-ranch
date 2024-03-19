import { passOnSuccess, mockapi, json, passOnCode } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Type_Model_Error_Single_validResponse = passOnSuccess(
  mockapi.get("/type/model/error/single/valid", (req) => {
    return { status: 200, body: json({ username: "jane", password: "doe" }) };
  }),
);

Scenarios.Type_Model_Error_Single_invalidResponse = passOnCode(
  304,
  mockapi.get("/type/model/error/single/invalid", (req) => {
    return { status: 304, body: json({ code: "Not Modified" }) };
  }),
);

Scenarios.Type_Model_Error_Inheritance_validResponse = passOnSuccess(
  mockapi.get("/type/model/error/inheritance/valid", (req) => {
    return { status: 200, body: json({ username: "jane", password: "doe" }) };
  }),
);

Scenarios.Type_Model_Error_Inheritance_invalid400Response = passOnCode(
  400,
  mockapi.get("/type/model/error/inheritance/invalid/400", (req) => {
    return { status: 400, body: json({ code: "Bad Request" }) };
  }),
);

Scenarios.Type_Model_Error_Inheritance_invalid500Response = passOnCode(
  500,
  mockapi.post("/type/model/error/inheritance/invalid/500", (req) => {
    return { status: 500, body: json({ code: "Internal Server Error" }) };
  }),
);
