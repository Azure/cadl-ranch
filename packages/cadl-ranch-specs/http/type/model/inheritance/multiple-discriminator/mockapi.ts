import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const validPolymorphicBody = {
  age: 1,
  kind: "shark",
  sharktype: "goblin",
};
Scenarios.Type_Model_Inheritance_MultipleDiscriminator_getModel = passOnSuccess(
  mockapi.get("/type/model/inheritance/multiple-discriminator/model", (req) => {
    return { status: 200, body: json(validPolymorphicBody) };
  }),
);

Scenarios.Type_Model_Inheritance_MultipleDiscriminator_putModel = passOnSuccess(
  mockapi.put("/type/model/inheritance/multiple-discriminator/model", (req) => {
    req.expect.bodyEquals(validPolymorphicBody);
    return { status: 200 };
  }),
);

const validRecursiveBody = {
  age: 1,
  kind: "salmon",
  partner: {
    age: 2,
    kind: "shark",
    sharktype: "saw",
  },
  friends: [
    {
      age: 2,
      kind: "salmon",
      partner: {
        age: 3,
        kind: "salmon",
      },
      hate: {
        key1: {
          age: 4,
          kind: "salmon",
        },
        key2: {
          age: 2,
          kind: "shark",
          sharktype: "goblin",
        },
      },
    },
    {
      age: 3,
      kind: "shark",
      sharktype: "goblin",
    },
  ],
  hate: {
    key3: {
      age: 3,
      kind: "shark",
      sharktype: "saw",
    },
    key4: {
      age: 2,
      kind: "salmon",
      friends: [
        {
          age: 1,
          kind: "salmon",
        },
        {
          age: 4,
          kind: "shark",
          sharktype: "goblin",
        },
      ],
    },
  },
};
Scenarios.Type_Model_Inheritance_MultipleDiscriminator_getRecursiveModel = passOnSuccess(
  mockapi.get("/type/model/inheritance/multiple-discriminator/recursivemodel", (req) => {
    return { status: 200, body: json(validRecursiveBody) };
  }),
);

Scenarios.Type_Model_Inheritance_MultipleDiscriminator_putRecursiveModel = passOnSuccess(
  mockapi.put("/type/model/inheritance/multiple-discriminator/recursivemodel", (req) => {
    req.expect.bodyEquals(validRecursiveBody);
    return { status: 200 };
  }),
);

Scenarios.Type_Model_Inheritance_MultipleDiscriminator_getMissingDiscriminator = passOnSuccess(
  mockapi.get("/type/model/inheritance/multiple-discriminator/missingdiscriminator", (req) => {
    return { status: 200, body: json({ age: 1 }) };
  }),
);

Scenarios.Type_Model_Inheritance_MultipleDiscriminator_getWrongDiscriminator = passOnSuccess(
  mockapi.get("/type/model/inheritance/multiple-discriminator/wrongdiscriminator", (req) => {
    return { status: 200, body: json({ age: 1, kind: "wrongKind" }) };
  }),
);
