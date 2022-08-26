import { passOnSuccess, mockapi, json, ValidationError } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const inheritanceValidBody = {optionalString: "abc", optionalInt: 32, optionalBool: true};
Scenarios.ComplexInheritanceModels_sendBottomModel = passOnSuccess(
  mockapi.post("/inheritance-complex/inheritance/valid", (req) => {
    req.expect.bodyEquals(inheritanceValidBody);
    return { status: 200 };
  })
);

Scenarios.ComplexInheritanceModels_getBottomModel = passOnSuccess(
  mockapi.get("/inheritance-complex/inheritance/valid", (req) => {
    return { status: 200, body: json(inheritanceValidBody)};
  })
);

Scenarios.ComplexInheritanceModels_setBottomModel = passOnSuccess(
  mockapi.put("/inheritance-complex/inheritance/valid", (req) => {
    return { status: 200, body: req.body};
  })
);

Scenarios.ComplexInheritanceModels_getInvalidBaseModel = passOnSuccess(
  mockapi.get("/inheritance-complex/inheritance/invalid", (req) => {
    return { status: 200, body: json({optionalString: 1})};
  })
);

Scenarios.ComplexInheritanceModels_setEmptyBottomModel = passOnSuccess(
  mockapi.put("/inheritance-complex/inheritance/empty", (req) => {
    req.expect.bodyEquals(inheritanceValidBody);
    return { status: 200, body: json({})};
  })
);

Scenarios.ComplexInheritanceModels_getBaseModelWithNullProperty = passOnSuccess(
  mockapi.get("/inheritance-complex/inheritance/null", (req) => {
    return { status: 200, body: json({optionalString: null})};
  })
);


const polymorphicValidBody = {
    optionalInt: 1,
    discriminator1: "SubModel", 
    discriminator2: "BottomB"
};
Scenarios.ComplexInheritanceModels_setBaseModelWithDiscriminator = passOnSuccess(
  mockapi.put("/inheritance-complex/polymorphism/valid", (req) => {
    req.expect.bodyEquals(polymorphicValidBody);
    return { status: 200, body: json(polymorphicValidBody)};
  })
);

const polymorphicRecursiveValidBody = {
    optionalInt: 1,
    discriminator1: "Derived", 
    optionalBase: {
        optionalInt: 2,
        discriminator1: "SubModel",
        discriminator2: "BottomA"
    },
    optionalBaseCollection: [
        {
            optionalInt: 2,
            discriminator1: "Derived", 
            optionalBase: {
                optionalInt: 2,
                discriminator1: "Derived"
            },
            optionalBaseDictionary: {
                key1: {
                    optionalInt: 2,
                    discriminator1: "Derived", 
                },
                key2: {
                    optionalInt: 2,
                    discriminator1: "SubModel",
                    discriminator2: "BottomB"
                }
            }
        },
        {
            optionalInt: 3,
            discriminator1: "SubModel", 
            discriminator2: "BottomB"
        },
    ],
    optionalBaseDictionary: {
        key3: {
            optionalInt: 3,
            discriminator1: "SubModel", 
            discriminator2: "BottomA"
        },
        key4: {
            optionalInt: 2,
            discriminator1: "Derived", 
            optionalBaseCollection: [
                {
                    optionalInt: 2,
                    discriminator1: "Derived", 
                },
                {
                    optionalInt: 2,
                    discriminator1: "SubModel",
                    discriminator2: "BottomB"
                }
            ]
        }
    }
};
Scenarios.ComplexInheritanceModels_setRecursiveModel = passOnSuccess(
  mockapi.put("/inheritance-complex/polymorphism/recursive", (req) => {
    req.expect.bodyEquals(polymorphicRecursiveValidBody);
    return { status: 200, body: json(polymorphicRecursiveValidBody)};
  })
);

Scenarios.ComplexInheritanceModels_getBaseModelMissingDiscriminator = passOnSuccess(
  mockapi.get("/inheritance-complex/polymorphism/missingdiscriminator", (req) => {
    return { status: 200, body: json({optionalInt: 1})};
  })
);

