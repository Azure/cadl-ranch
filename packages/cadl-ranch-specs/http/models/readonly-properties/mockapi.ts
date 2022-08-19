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

Scenarios.Get_Optional_Property_Model = passOnSuccess(
  mockapi.get("/readonly-properties/models", () => {
    return {
      status: 200,
      body: json(mockRoundTripModel),
    };
  }),
);

Scenarios.Set_Optional_Property_Model = passOnSuccess(
  mockapi.post("/readonly-properties/models", (req) => {
    req.expect.bodyNotEmpty();
    if (!req.body.requiredString) {
        throw new ValidationError("Required properties missing!", "Non null value.", null);
      }
    return {
      status: 200,
      body: json(mockRoundTripModel),
    };
  }),
);