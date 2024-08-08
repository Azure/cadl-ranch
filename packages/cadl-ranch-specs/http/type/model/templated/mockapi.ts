import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const body = {
  kind: "Int32Values",
  values: [1234],
  value: 1234,
};

Scenarios.Type_Model_Templated_templatedType = passOnSuccess(
  mockapi.put("/type/model/templated/templatedType", (req) => {
    req.expect.bodyEquals(body);
    return {
      status: 200,
      body: json(body),
    };
  }),
);