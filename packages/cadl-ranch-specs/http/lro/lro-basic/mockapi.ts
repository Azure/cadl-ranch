import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Lro_Basic_create = passOnSuccess(
  mockapi.put("/lro/basic/put", (req) => {
    return { status: 200, headers: { "operation-location": "http://localhost:3000/lro/basic/put/polling" } };
  }),
);

Scenarios.Lro_Basic_create_polling = passOnSuccess(
  mockapi.get("/lro/basic/put/polling", (req) => {
    return { status: 200, body: json({ status: "Succeeded" }) };
  }),
);

Scenarios.Lro_Basic_read = passOnSuccess(
  mockapi.get("/lro/basic/put", (req) => {
    return { status: 200, body: json("Successful") };
  }),
);
