import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Azure_ClientGenerator_Core_ClientFormat_Duration_Query_iso8601 = passOnSuccess(
  mockapi.get("/azure/client-generator-core/client-format/duration/query/iso8601", (req) => {
    req.expect.containsQueryParam("input", "P40D");
    return {
      status: 204,
    };
  }),
);

Scenarios.Azure_ClientGenerator_Core_ClientFormat_Duration_Query_seconds = passOnSuccess(
  mockapi.get("/azure/client-generator-core/client-format/duration/query/seconds", (req) => {
    req.expect.containsQueryParam("input", "35.6");
    return {
      status: 204,
    };
  }),
);

Scenarios.Azure_ClientGenerator_Core_ClientFormat_Duration_Property_iso8601 = passOnSuccess(
  mockapi.post("/azure/client-generator-core/client-format/duration/property/iso8601", (req) => {
    req.expect.coercedBodyEquals({ value: "P40D" });
    return {
      status: 200,
      body: json({ value: "P40D" }),
    };
  }),
);

Scenarios.Azure_ClientGenerator_Core_ClientFormat_Duration_Property_seconds = passOnSuccess(
  mockapi.post("/azure/client-generator-core/client-format/duration/property/seconds", (req) => {
    req.expect.coercedBodyEquals({ value: 35.6 });
    return {
      status: 200,
      body: json({ value: 35.6 }),
    };
  }),
);
