import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const inheritanceValidBody = { name: "abc", age: 32, smart: true };
Scenarios.Types_Model_Inheritance_postValid = passOnSuccess(
  mockapi.post("/types/model/inheritance/valid", (req) => {
    req.expect.bodyEquals(inheritanceValidBody);
    return { status: 200 };
  }),
);

Scenarios.Types_Model_Inheritance_getValid = passOnSuccess(
  mockapi.get("/types/model/inheritance/valid", (req) => {
    return { status: 200, body: json(inheritanceValidBody) };
  }),
);

Scenarios.Types_Model_Inheritance_putValid = passOnSuccess(
  mockapi.put("/types/model/inheritance/valid", (req) => {
    return { status: 200, body: json(req.body) };
  }),
);

const validPolymorphicBody = {
  age: 1,
  kind: "shark",
  sharktype: "goblin",
};
Scenarios.Types_Model_Inheritance_Discriminated_getModel = passOnSuccess(
  mockapi.get("/types/model/inheritance/discriminated/model", (req) => {
    return { status: 200, body: json(validPolymorphicBody) };
  }),
);

Scenarios.Types_Model_Inheritance_Discriminated_putModel = passOnSuccess(
  mockapi.put("/types/model/inheritance/discriminated/model", (req) => {
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
Scenarios.Types_Model_Inheritance_Discriminated_getRecursiveModel = passOnSuccess(
  mockapi.get("/types/model/inheritance/discriminated/recursivemodel", (req) => {
    return { status: 200, body: json(validRecursiveBody) };
  }),
);

Scenarios.Types_Model_Inheritance_Discriminated_putRecursiveModel = passOnSuccess(
  mockapi.put("/types/model/inheritance/discriminated/recursivemodel", (req) => {
    req.expect.bodyEquals(validRecursiveBody);
    return { status: 200 };
  }),
);

Scenarios.Types_Model_Inheritance_Discriminated_getMissingDiscriminator = passOnSuccess(
  mockapi.get("/types/model/inheritance/discriminated/missingdiscriminator", (req) => {
    return { status: 200, body: json({ age: 1 }) };
  }),
);

Scenarios.Types_Model_Inheritance_Discriminated_getWrongDiscriminator = passOnSuccess(
  mockapi.get("/types/model/inheritance/discriminated/wrongdiscriminator", (req) => {
    return { status: 200, body: json({ age: 1, kind: "wrongKind" }) };
  }),
);
