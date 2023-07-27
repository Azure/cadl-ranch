import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const validPolymorphicBody = {
  wingspan: 1,
  kind: "sparrow",
};
Scenarios.Type_Model_Inheritance_SingleDiscriminator_getModel = passOnSuccess(
  mockapi.get("/type/model/inheritance/single-discriminator/model", (req) => {
    return { status: 200, body: json(validPolymorphicBody) };
  }),
);

Scenarios.Type_Model_Inheritance_SingleDiscriminator_putModel = passOnSuccess(
  mockapi.put("/type/model/inheritance/single-discriminator/model", (req) => {
    req.expect.bodyEquals(validPolymorphicBody);
    return { status: 204 };
  }),
);

const validRecursiveBody = {
  wingspan: 5,
  kind: "eagle",
  partner: {
    wingspan: 2,
    kind: "goose",
  },
  friends: [
    {
      wingspan: 2,
      kind: "seagull",
    },
  ],
  hate: {
    key3: {
      wingspan: 1,
      kind: "sparrow",
    },
  },
};
Scenarios.Type_Model_Inheritance_SingleDiscriminator_getRecursiveModel = passOnSuccess(
  mockapi.get("/type/model/inheritance/single-discriminator/recursivemodel", (req) => {
    return { status: 200, body: json(validRecursiveBody) };
  }),
);

Scenarios.Type_Model_Inheritance_SingleDiscriminator_putRecursiveModel = passOnSuccess(
  mockapi.put("/type/model/inheritance/single-discriminator/recursivemodel", (req) => {
    req.expect.bodyEquals(validRecursiveBody);
    return { status: 204 };
  }),
);

Scenarios.Type_Model_Inheritance_SingleDiscriminator_getMissingDiscriminator = passOnSuccess(
  mockapi.get("/type/model/inheritance/single-discriminator/missingdiscriminator", (req) => {
    return { status: 200, body: json({ wingspan: 1 }) };
  }),
);

Scenarios.Type_Model_Inheritance_SingleDiscriminator_getWrongDiscriminator = passOnSuccess(
  mockapi.get("/type/model/inheritance/single-discriminator/wrongdiscriminator", (req) => {
    return { status: 200, body: json({ wingspan: 1, kind: "wrongKind" }) };
  }),
);
