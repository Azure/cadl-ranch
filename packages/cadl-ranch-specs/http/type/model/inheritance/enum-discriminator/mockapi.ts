import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const validExtensibleEnumBody = {
  weight: 10,
  kind: "golden",
};
Scenarios.Type_Model_Inheritance_EnumDiscriminator_getExtensibleModel = passOnSuccess(
  mockapi.get("/type/model/inheritance/enum-discriminator/extensible-enum", (req) => {
    return { status: 200, body: json(validExtensibleEnumBody) };
  }),
);

Scenarios.Type_Model_Inheritance_EnumDiscriminator_putExtensibleModel = passOnSuccess(
  mockapi.put("/type/model/inheritance/enum-discriminator/extensible-enum", (req) => {
    req.expect.bodyEquals(validExtensibleEnumBody);
    return { status: 204 };
  }),
);

Scenarios.Type_Model_Inheritance_EnumDiscriminator_getExtensibleModelMissingDiscriminator = passOnSuccess(
  mockapi.get("/type/model/inheritance/enum-discriminator/extensible-enum/missingdiscriminator", (req) => {
    return { status: 200, body: json({ weight: 10 }) };
  }),
);

Scenarios.Type_Model_Inheritance_EnumDiscriminator_getExtensibleModelWrongDiscriminator = passOnSuccess(
  mockapi.get("/type/model/inheritance/enum-discriminator/extensible-enum/wrongdiscriminator", (req) => {
    return { status: 200, body: json({ weight: 8, kind: "wrongKind" }) };
  }),
);

const validFixedEnumBody = {
  length: 10,
  kind: "cobra",
};
Scenarios.Type_Model_Inheritance_EnumDiscriminator_getFixedModel = passOnSuccess(
  mockapi.get("/type/model/inheritance/enum-discriminator/fixed-enum", (req) => {
    return { status: 200, body: json(validFixedEnumBody) };
  }),
);

Scenarios.Type_Model_Inheritance_EnumDiscriminator_putFixedModel = passOnSuccess(
  mockapi.put("/type/model/inheritance/enum-discriminator/fixed-enum", (req) => {
    req.expect.bodyEquals(validFixedEnumBody);
    return { status: 204 };
  }),
);

Scenarios.Type_Model_Inheritance_EnumDiscriminator_getFixedModelMissingDiscriminator = passOnSuccess(
  mockapi.get("/type/model/inheritance/enum-discriminator/fixed-enum/missingdiscriminator", (req) => {
    return { status: 200, body: json({ length: 10 }) };
  }),
);

Scenarios.Type_Model_Inheritance_EnumDiscriminator_getFixedModelWrongDiscriminator = passOnSuccess(
  mockapi.get("/type/model/inheritance/enum-discriminator/fixed-enum/wrongdiscriminator", (req) => {
    return { status: 200, body: json({ length: 8, kind: "wrongKind" }) };
  }),
);
