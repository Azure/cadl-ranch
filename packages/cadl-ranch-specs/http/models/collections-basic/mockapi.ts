import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.CollectionPropertiesBasic_sendCollectionModel = passOnSuccess(
  mockapi.post("/collection-properties-basic/models", (req) => {
    const expectedBody = { requiredStringList: ["post"], requiredIntList: [100] };
    req.expect.bodyEquals(expectedBody);
    return { status: 200 };
  }),
);
Scenarios.CollectionPropertiesBasic_getCollectionModel = passOnSuccess(
  mockapi.get("/collection-properties-basic/models", () => {
    return { status: 200, body: json({ requiredStringList: ["get"], requiredIntList: [101] }) };
  }),
);
Scenarios.CollectionPropertiesBasic_setCollectionModel = passOnSuccess(
  mockapi.put("/collection-properties-basic/models", (req) => {
    const expectedBody = { requiredStringList: ["put"], requiredIntList: [102] };
    req.expect.bodyEquals(expectedBody);
    return { status: 200, body: json(expectedBody) };
  }),
);
