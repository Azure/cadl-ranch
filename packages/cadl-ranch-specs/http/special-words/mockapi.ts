import { passOnSuccess, ScenarioMockApi, mockapi, json } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.SpecialWords_Operation_for = passOnSuccess(
  mockapi.get("/special-words/operation/for", (req) => {
    return {
      status: 204,
    };
  }),
);

Scenarios.SpecialWords_Parameter_if = passOnSuccess(
  mockapi.get("/special-words/parameter/if", (req) => {
    req.expect.containsHeader("if", "weekend");
    return {
      status: 204,
    };
  }),
);
Scenarios.SpecialWords_Parameter_filter = passOnSuccess(
  mockapi.get("/special-words/parameter/filter", (req) => {
    req.expect.containsQueryParam("filter", "abc*.");
    return {
      status: 204,
    };
  }),
);

Scenarios.SpecialWords_Model_getContinue = passOnSuccess(
  mockapi.get("/special-words/model/getContinue", (req) => {
    return {
      status: 200,
      body: json({
        name: "abc",
      }),
    };
  }),
);

const modelValue = {
  "model.kind": "derived",
  "derived.name": "my.name",
  "for": "value",
};
Scenarios.SpecialWords_Model_get = passOnSuccess(
  mockapi.get("/special-words/model/get", (req) => {
    return {
      status: 200,
      body: json(modelValue),
    };
  }),
);
Scenarios.SpecialWords_Model_put = passOnSuccess(
  mockapi.put("/special-words/model/put", (req) => {
    req.expect.bodyEquals(modelValue);
    return {
      status: 204,
    };
  }),
);
