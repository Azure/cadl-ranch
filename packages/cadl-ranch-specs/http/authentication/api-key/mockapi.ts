import { json, passOnCode, passOnSuccess } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Authentication_ApiKey_valid = passOnSuccess({
  uri: `/authentication/api-key/valid`,
  method: `get`,
  request: {
    headers: {
      "x-ms-api-key": "valid-key",
    },
  },
  response: {
    status: 204,
  },
  kind: "MockApiDefinition",
});

Scenarios.Authentication_ApiKey_invalid = passOnCode(403, {
  uri: `/authentication/api-key/invalid`,
  method: `get`,
  request: {
    headers: {
      "x-ms-api-key": "invalid-key",
    },
    status: 403,
  },
  response: {
    status: 403,
    body: json({
      error: "invalid-api-key",
    }),
  },
  kind: "MockApiDefinition",
});
