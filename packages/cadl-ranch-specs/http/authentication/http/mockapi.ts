import { passOnSuccess, passOnCode, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Authentication_Http_valid = passOnSuccess(
  mockapi.get("/authentication/http/valid", (req) => {
    req.expect.containsHeader("Authorization", "SharedAccessKey valid-key");
    return { status: 204 };
  }),
);

Scenarios.Authentication_Http_invalid = passOnCode(
  403,
  mockapi.get("/authentication/http/invalid", (req) => {
    return {
      status: 403,
      body: json({
        error: "invalid-api-key",
      }),
    };
  }),
);
