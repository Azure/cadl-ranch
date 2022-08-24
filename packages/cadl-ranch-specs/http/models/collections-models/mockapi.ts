import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.ModelCollectionProperties_sendCollectionModel = passOnSuccess(
  mockapi.post("/collection-models/models", (req) => {
    const expectedBody = {
      requiredModelCollection: [{ requiredStringList: ["post_required"], requiredIntList: [100] }],
    };
    req.expect.bodyEquals(expectedBody);
    return { status: 200 };
  }),
);
Scenarios.ModelCollectionProperties_getCollectionModel = passOnSuccess(
  mockapi.get("/collection-models/models", () => {
    return {
      status: 200,
      body: json({ requiredModelCollection: [{ requiredStringList: ["get_required"], requiredIntList: [101] }] }),
    };
  }),
);
Scenarios.ModelCollectionProperties_setCollectionModel = passOnSuccess(
  mockapi.put("/collection-models/models", (req) => {
    const expectedBody = {
      requiredModelCollection: [{ requiredStringList: ["put_required"], requiredIntList: [102] }],
      optionalModelCollection: [{ requiredStringList: ["put_optional"], requiredIntList: [102] }],
    };
    req.expect.bodyEquals(expectedBody);
    return { status: 200, body: json(expectedBody) };
  }),
);
