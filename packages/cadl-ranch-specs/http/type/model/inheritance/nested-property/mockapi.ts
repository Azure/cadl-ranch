import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const body = {
  extension: [
    {
      level: 1,
      extension: [
        {
          level: 2,
        },
      ],
    },
    {
      level: 1,
    },
  ],
};

Scenarios.Type_Model_Inheritance_NestedProperty_put = passOnSuccess(
  mockapi.put("/type/model/inheritance/nested-property", (req) => {
    req.expect.bodyEquals(body);
    return { status: 204 };
  }),
);

Scenarios.Type_Model_Inheritance_NestedProperty_get = passOnSuccess(
  mockapi.get("/type/model/inheritance/nested-property", (req) => {
    return { status: 200, body: json(body) };
  }),
);
