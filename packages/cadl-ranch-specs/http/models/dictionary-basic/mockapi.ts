import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const dictionaryValidBody = {
  requiredStringDictionary: {
    "txt": "notepad",
    "bmp": "mspaint",
    "xls": "excel",
    "exe": "",
    "": null,
  },
};
Scenarios.DictionaryPropertiesBasic_sendDictionaryModel = passOnSuccess(
  mockapi.post("/models/valid", (req) => {
    req.expect.bodyEquals(dictionaryValidBody);
    return { status: 200 };
  }),
);

Scenarios.DictionaryPropertiesBasic_getDictionaryModel = passOnSuccess(
  mockapi.get("/models/valid", (req) => {
    return { status: 200, body: json(dictionaryValidBody) };
  }),
);

Scenarios.DictionaryPropertiesBasic_setDictionaryModel = passOnSuccess(
  mockapi.put("/models/valid", (req) => {
    return { status: 200, body: json(req.body) };
  }),
);

Scenarios.DictionaryPropertiesBasic_getNullDictionaryModel = passOnSuccess(
  mockapi.get("/models/null", (req) => {
    return { status: 200, body: json({ requiredStringDictionary: null }) };
  }),
);

Scenarios.DictionaryPropertiesBasic_setEmptyDictionaryModel = passOnSuccess(
  mockapi.get("/models/empty", (req) => {
    req.expect.bodyEquals({ requiredStringDictionary: {} });
    return { status: 200, body: json({ requiredStringDictionary: {} }) };
  }),
);
