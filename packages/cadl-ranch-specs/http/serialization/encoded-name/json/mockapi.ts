import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Serialization_EncodedName_Json_Property_send = passOnSuccess(
  mockapi.post("/serialization/encoded-name/json/property", (req) => {
    req.expect.bodyEquals({ wireName: true });
    return {
      status: 204,
    };
  }),
);
Scenarios.Serialization_EncodedName_Json_Property_get = passOnSuccess(
  mockapi.get("/serialization/encoded-name/json/property", (req) => {
    return {
      status: 200,
      body: json({ wireName: true }),
    };
  }),
);
