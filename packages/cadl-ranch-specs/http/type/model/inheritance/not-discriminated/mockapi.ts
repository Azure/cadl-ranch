import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const inheritanceValidBody = { name: "abc", age: 32, smart: true };
Scenarios.Type_Model_Inheritance_NotDiscriminated_postValid = passOnSuccess(
  mockapi.post("/type/model/inheritance/not-discriminated/valid", (req) => {
    req.expect.bodyEquals(inheritanceValidBody);
    return { status: 200 };
  }),
);

Scenarios.Type_Model_Inheritance_NotDiscriminated_getValid = passOnSuccess(
  mockapi.get("/type/model/inheritance/not-discriminated/valid", (req) => {
    return { status: 200, body: json(inheritanceValidBody) };
  }),
);

Scenarios.Type_Model_Inheritance_NotDiscriminated_putValid = passOnSuccess(
  mockapi.put("/type/model/inheritance/not-discriminated/valid", (req) => {
    return { status: 200, body: json(req.body) };
  }),
);
