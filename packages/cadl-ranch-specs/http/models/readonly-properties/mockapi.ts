import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.ReadonlyProperties_getReadOnlyProperties = passOnSuccess(
  mockapi.get("/readonly-properties/models", () => {
    return {
      status: 200,
      body: json({
        requiredReadonlyString: "requiredReadonlyStringValue",
        requiredReadonlyInt: 10,
        requiredReadonlyModel: {
          requiredString: "requiredStringValue",
        },
        requiredReadonlyStringList: ["value1", "value2"],
        requiredReadonlyIntList: [1, 2, 3, 4, 5],
      }),
    };
  }),
);

Scenarios.ReadonlyProperties_sendNonReadOnlyAndGetAllProperties = passOnSuccess(
  mockapi.post("/readonly-properties/models", (req) => {
    req.expect.bodyEquals({ name: "foo" });
    return {
      status: 200,
      body: json({
        name: req.body.name,
        requiredReadonlyString: "requiredReadonlyStringValue",
        requiredReadonlyInt: 10,
        requiredReadonlyModel: {
          requiredString: "requiredStringValue",
        },
        requiredReadonlyStringList: ["value1", "value2"],
        requiredReadonlyIntList: [1, 2, 3, 4, 5],
      }),
    };
  }),
);
