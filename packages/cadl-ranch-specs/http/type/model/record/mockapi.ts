import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const ModelRecordUnknownBody = { name: "ModelRecordUnknown", prop1: 32, prop2: true, prop3: "abc" };
Scenarios.Type_Model_RecordTest_RecordUnknown_postModelRecordUnknown = passOnSuccess(
  mockapi.post("/type/model/record/unknown", (req) => {
    req.expect.bodyEquals(ModelRecordUnknownBody);
    return { status: 200 };
  }),
);

Scenarios.Type_Model_RecordTest_RecordUnknown_getModelRecordUnknown = passOnSuccess(
  mockapi.get("/type/model/record/unknown", (req) => {
    return { status: 200, body: json(ModelRecordUnknownBody) };
  }),
);
