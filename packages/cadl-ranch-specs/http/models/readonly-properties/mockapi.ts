import { passOnSuccess, mockapi, json, ValidationError } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

let mockRoundTripModel = {
  requiredReadonlyString: "requiredReadonlyStringValue",
  requiredReadonlyInt: 10,
  requiredReadonlyModel: "requiredStringValue",
  requiredReadonlyStringList: ["value1", "value2"],
  requiredReadonlyIntList: [1,2,3,4,5]
}

Scenarios.ReadonlyProperties_getOptionalPropertyModel = passOnSuccess(
  mockapi.get("/readonly-properties/models", () => {
    return {
      status: 200,
      body: json(mockRoundTripModel),
    };
  }),
);

Scenarios.ReadonlyProperties_setOptionalPropertyModel = passOnSuccess(
  mockapi.post("/readonly-properties/models", (req) => {
    req.expect.bodyNotEmpty();
    if (!req.body.requiredString) {
        throw new ValidationError("Required properties missing!", null, null);
      }
    return {
      status: 200,
      body: json(mockRoundTripModel),
    };
  }),
);