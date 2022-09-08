import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const inheritanceValidBody = { name: "abc", age: 32, smart: true };
Scenarios.ComplexInheritanceModels_postValid = passOnSuccess(
  mockapi.post("/inheritance/valid", (req) => {
    req.expect.bodyEquals(inheritanceValidBody);
    return { status: 200 };
  }),
);

Scenarios.ComplexInheritanceModels_getValid = passOnSuccess(
  mockapi.get("/inheritance/valid", (req) => {
    return { status: 200, body: json(inheritanceValidBody) };
  }),
);

Scenarios.ComplexInheritanceModels_putValid = passOnSuccess(
  mockapi.put("/inheritance/valid", (req) => {
    return { status: 200, body: json(req.body) };
  }),
);

const polymorphicValidBody = {
  age: 1,
  kind: "shark",
  sharktype: "goblin",
};
Scenarios.ComplexInheritanceModels_getPolymorphicModel = passOnSuccess(
  mockapi.get("/inheritance/polymorphism/valid", (req) => {
    return { status: 200, body: json(polymorphicValidBody) };
  }),
);

Scenarios.ComplexInheritanceModels_putPolymorphicModel = passOnSuccess(
  mockapi.put("/inheritance/polymorphism/valid", (req) => {
    req.expect.bodyEquals(polymorphicValidBody);
    return { status: 200 };
  }),
);

const polymorphicRecursiveValidBody = {
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
Scenarios.ComplexInheritanceModels_getRecursivePolymorphicModel = passOnSuccess(
  mockapi.get("/inheritance/polymorphism/recursive", (req) => {
    return { status: 200, body: json(polymorphicRecursiveValidBody) };
  }),
);

Scenarios.ComplexInheritanceModels_setRecursivePolymorphicModel = passOnSuccess(
  mockapi.put("/inheritance/polymorphism/recursive", (req) => {
    req.expect.bodyEquals(polymorphicRecursiveValidBody);
    return { status: 200 };
  }),
);

Scenarios.ComplexInheritanceModels_getPolymorphismMissingDiscriminator = passOnSuccess(
  mockapi.get("/inheritance/polymorphism/missingdiscriminator", (req) => {
    return { status: 200, body: json({ age: 1 }) };
  }),
);
