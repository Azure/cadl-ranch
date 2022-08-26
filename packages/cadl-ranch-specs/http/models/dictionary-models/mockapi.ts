import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const dictionaryValidBody = { optionalModelDictionary: { key: { requiredString: "abc" } } };
Scenarios.ModelDictionaryProperties_sendDictionaryModel = passOnSuccess(
  mockapi.post("/models", (req) => {
    req.expect.bodyEquals(dictionaryValidBody);
    return { status: 200 };
  }),
);

Scenarios.ModelDictionaryProperties_getDictionaryModel = passOnSuccess(
  mockapi.get("/models", (req) => {
    return { status: 200, body: json(dictionaryValidBody) };
  }),
);

Scenarios.ModelDictionaryProperties_setDictionaryModel = passOnSuccess(
  mockapi.put("/models", (req) => {
    return { status: 200, body: json(req.body) };
  }),
);
