import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const inputModel = {}

const outputModel = {
  requiredReadonlyString: "abc",
  requiredReadonlyInt: 123,
  optionalReadonlyString: "efg",
  optionalReadonlyInt: 456,
  requiredReadonlyModel: {
    requiredString: "!",
  },
  optionalReadonlyModel: {
    requiredString: "**",
  },
  requiredReadonlyStringList: ["foo", "bar"],
  requiredReadonlyIntList: [1, 2],
  optionalReadonlyStringList: ["fox", "fish"],
  optionalReadonlyIntList: [3, 4],
};

Scenarios.Models_ReadonlyProperties_getOptionalPropertyModel = passOnSuccess(
  mockapi.get("/models/readonly-properties/models", (req) => {
    return { status: 200, body: json(outputModel) };
  }),
);

Scenarios.Models_Inheritance_Discriminated_putRecursiveModel = passOnSuccess(
  mockapi.put("/models/readonly-properties/models", (req) => {
    req.expect.bodyEquals(inputModel);
    return { status: 200, body: json(outputModel) };
  }),
);
