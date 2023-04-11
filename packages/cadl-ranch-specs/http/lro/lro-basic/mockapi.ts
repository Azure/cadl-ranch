import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Azure_Lro_PollingSuccess = passOnSuccess([
  mockapi.put("/lro/basic/put", (req) => {
    return {
      status: 200,
      headers: { "operation-location": "http://localhost:3000/lro/basic/put/polling" },
      body: json("On going..."),
    };
  }),
  mockapi.get("/lro/basic/put/polling", (req) => {
    return { status: 200, body: json({ status: "Succeeded" }) };
  }),
  mockapi.get("/lro/basic/put", (req) => {
    return { status: 200, body: json({ name: "bob" }) };
  }),
]);
