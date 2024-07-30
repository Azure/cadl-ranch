import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const body = {
  input: {
    kind: "Int32Values",
    values: [1234],
    value: 1234,
    field: "<field>",
  },
};

Scenarios.Type_Model_Generic_genericType = passOnSuccess(
  mockapi.put("/type/model/generic/genericType", (req) => {
    req.expect.bodyEquals(body);
    return { status: 204 };
  }),
);
