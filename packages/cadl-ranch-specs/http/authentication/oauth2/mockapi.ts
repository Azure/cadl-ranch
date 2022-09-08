import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Authentication_OAuth2_valid = passOnSuccess(
  mockapi.get("/authentication/oauth2/valid", (req) => {
    req.expect.containsHeader("authorization", "Bearer https://security.microsoft.com/.default");
    return { status: 204 };
  }),
);

Scenarios.Authentication_OAuth2_invalid = passOnSuccess(
  mockapi.get("/authentication/oauth2/invalid", (req) => {
    return {
      status: 403,
      body: json({
        error: "invalid_grant",
      }),
    };
  }),
);
