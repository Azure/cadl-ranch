import { passOnSuccess, passOnCode, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Authentication_ApiKey_valid = passOnSuccess(
  mockapi.get("/authentication/api-key/valid", (req) => {
    req.expect.containsHeader("x-ms-api-key", "valid-key");
    return { status: 204 };
  }),
);

Scenarios.Authentication_ApiKey_invalid = passOnCode(
  403,
  mockapi.get("/authentication/api-key/invalid", (req) => {
    return {
      status: 403,
      body: json({
        error: "invalid-api-key",
      }),
    };
  }),
);
