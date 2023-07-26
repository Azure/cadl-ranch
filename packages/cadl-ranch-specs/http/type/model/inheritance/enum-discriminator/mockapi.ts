import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const validExtensibleEnumBody = {
  weight: 10,
  kind: "golden",
};
Scenarios.Type_Model_Inheritance_EnumDiscriminator_getExtensibleEnum = passOnSuccess(
  mockapi.get("/type/model/inheritance/enum-discriminator/extensible-enum", (req) => {
    return { status: 200, body: json(validExtensibleEnumBody) };
  }),
);

Scenarios.Type_Model_Inheritance_EnumDiscriminator_putExtensibleEnum = passOnSuccess(
  mockapi.put("/type/model/inheritance/enum-discriminator/extensible-enum", (req) => {
    req.expect.bodyEquals(validExtensibleEnumBody);
    return { status: 200 };
  }),
);
