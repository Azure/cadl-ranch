import { passOnSuccess, mockapi, json, ValidationError } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const inheritanceValidBody = { name: "abc", age: 32, smart: true };
Scenarios.ComplexInheritanceModels_sendBottomModel = passOnSuccess(
  mockapi.post("/inheritance-complex/inheritance/valid", (req) => {
    req.expect.bodyEquals(inheritanceValidBody);
    return { status: 200 };
  }),
);

Scenarios.ComplexInheritanceModels_getBottomModel = passOnSuccess(
  mockapi.get("/inheritance-complex/inheritance/valid", (req) => {
    return { status: 200, body: json(inheritanceValidBody) };
  }),
);

Scenarios.ComplexInheritanceModels_setBottomModel = passOnSuccess(
  mockapi.put("/inheritance-complex/inheritance/valid", (req) => {
    return { status: 200, body: json(req.body) };
  }),
);

Scenarios.ComplexInheritanceModels_getInvalidBaseModel = passOnSuccess(
  mockapi.get("/inheritance-complex/inheritance/invalid", (req) => {
    return { status: 200, body: json({ name: 1 }) };
  }),
);

Scenarios.ComplexInheritanceModels_setEmptyBottomModel = passOnSuccess(
  mockapi.put("/inheritance-complex/inheritance/empty", (req) => {
    req.expect.bodyEquals({});
    return { status: 200, body: json({}) };
  }),
);

Scenarios.ComplexInheritanceModels_getBaseModelWithNullProperty = passOnSuccess(
  mockapi.get("/inheritance-complex/inheritance/null", (req) => {
    return { status: 200, body: json({ name: null }) };
  }),
);

const polymorphicValidBody = {
  age: 1,
  kind: "shark",
  sharktype: "goblin",
};
Scenarios.ComplexInheritanceModels_setBaseModelWithDiscriminator = passOnSuccess(
  mockapi.put("/inheritance-complex/polymorphism/valid", (req) => {
    req.expect.bodyEquals(polymorphicValidBody);
    return { status: 200, body: json(polymorphicValidBody) };
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
        age: 2,
        kind: "salmon",
      },
      hate: {
        key1: {
          age: 2,
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
          age: 2,
          kind: "salmon",
        },
        {
          age: 2,
          kind: "shark",
          sharktype: "goblin",
        },
      ],
    },
  },
};
Scenarios.ComplexInheritanceModels_setRecursiveModel = passOnSuccess(
  mockapi.put("/inheritance-complex/polymorphism/recursive", (req) => {
    req.expect.bodyEquals(polymorphicRecursiveValidBody);
    return { status: 200, body: json(polymorphicRecursiveValidBody) };
  }),
);

Scenarios.ComplexInheritanceModels_getBaseModelMissingDiscriminator = passOnSuccess(
  mockapi.get("/inheritance-complex/polymorphism/missingdiscriminator", (req) => {
    return { status: 200, body: json({ age: 1 }) };
  }),
);
