import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.ApiKeyAuthentication_ApiKey_authenticated = passOnSuccess(
  mockapi.get("/authentication/api-key/authenticated", (req) => {
    req.expect.containsHeader("x-ms-api-key", "valid-key");
    return { status: 204 };
  }),
);

Scenarios.ApiKeyAuthentication_ApiKey_invalidAuthentication = passOnSuccess(
  mockapi.get("/authentication/api-key/invalid-authentication", (req) => {
    return { status: 403,
      body: json({
        error: {
          code: "InvalidApiKey",
          message: "API key is invalid"
        }
      })
    };
  }),
);
