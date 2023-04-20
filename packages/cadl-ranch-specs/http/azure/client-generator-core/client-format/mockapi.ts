import { passOnSuccess, mockapi, ValidationError, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Azure_ClientGenerator_Core_ClientFormat_Duration_iso8601 = passOnSuccess(
  mockapi.get("/azure/client-generator-core/client-format/duration/iso8601", (req) => {
    req.expect.containsQueryParam("input", "P40D");
    return {
      status: 204,
    };
  }),
);

Scenarios.Azure_ClientGenerator_Core_ClientFormat_Duration_seconds = passOnSuccess(
  mockapi.get("/azure/client-generator-core/client-format/duration/seconds", (req) => {
    req.expect.containsQueryParam("input", "35.6");
    return {
      status: 204,
    };
  }),
);
