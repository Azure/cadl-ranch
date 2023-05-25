import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const body = {};

Scenarios.Type_Model_Empty_putEmpty = passOnSuccess(
  mockapi.put("/type/model/empty/alone", (req) => {
    req.expect.bodyEquals(body);
    return { status: 204 };
  }),
);

Scenarios.Type_Model_Empty_getEmpty = passOnSuccess(
  mockapi.get("/type/model/empty/alone", (req) => {
    return { status: 200, body: json(body) };
  }),
);

Scenarios.Type_Model_Empty_postRoundTripEmpty = passOnSuccess(
  mockapi.post("/type/model/empty/round-trip", (req) => {
    req.expect.bodyEquals(body);
    return { status: 200, body: json(body) };
  }),
);
