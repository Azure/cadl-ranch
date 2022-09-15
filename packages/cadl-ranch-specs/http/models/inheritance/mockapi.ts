import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const inheritanceValidBody = { name: "abc", age: 32, smart: true };
Scenarios.Models_Inheritance_postValid = passOnSuccess(
  mockapi.post("/models/inheritance/valid", (req) => {
    req.expect.bodyEquals(inheritanceValidBody);
    return { status: 200 };
  }),
);

Scenarios.Models_Inheritance_getValid = passOnSuccess(
  mockapi.get("/models/inheritance/valid", (req) => {
    return { status: 200, body: json(inheritanceValidBody) };
  }),
);

Scenarios.Models_Inheritance_putValid = passOnSuccess(
  mockapi.put("/models/inheritance/valid", (req) => {
    return { status: 200, body: json(req.body) };
  }),
);

const validPolymorphicBody = {
  age: 1,
  kind: "shark",
  sharktype: "goblin",
};
Scenarios.Models_Inheritance_Discriminated_getModel = passOnSuccess(
  mockapi.get("/models/inheritance/discriminated/model", (req) => {
    return { status: 200, body: json(validPolymorphicBody) };
  }),
);

Scenarios.Models_Inheritance_Discriminated_putModel = passOnSuccess(
  mockapi.put("/models/inheritance/discriminated/model", (req) => {
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
Scenarios.Models_Inheritance_Discriminated_getRecursiveModel = passOnSuccess(
  mockapi.get("/models/inheritance/discriminated/recursivemodel", (req) => {
    return { status: 200, body: json(validRecursiveBody) };
  }),
);

Scenarios.Models_Inheritance_Discriminated_putRecursiveModel = passOnSuccess(
  mockapi.put("/models/inheritance/discriminated/recursivemodel", (req) => {
    req.expect.bodyEquals(validRecursiveBody);
    return { status: 200 };
  }),
);

Scenarios.Models_Inheritance_Discriminated_getMissingDiscriminator = passOnSuccess(
  mockapi.get("/models/inheritance/discriminated/missingdiscriminator", (req) => {
    return { status: 200, body: json({ age: 1 }) };
  }),
);

Scenarios.Models_Inheritance_Discriminated_getWrongDiscriminator = passOnSuccess(
  mockapi.get("/models/inheritance/discriminated/wrongdiscriminator", (req) => {
    return { status: 200, body: json({ age: 1, kind: "wrongKind" }) };
  }),
);
