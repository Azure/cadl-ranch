import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};
const priceResult = { value: 15, count: 1 };
const expectInputBody = {
  kind: "Int32Values",
  ranges: [10, 20],
  value: 15,
  field: "price",
};

const responseBody = {
  field_name: "price",
  results: [priceResult],
};

Scenarios.Azure_Core_Facet_getInt32Facets = passOnSuccess(
  mockapi.get("/azure/core/facet/int32", (req) => {
    req.expect.bodyEquals(expectInputBody);
    return { status: 200, body: json(responseBody) };
  }),
);
