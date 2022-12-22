import { passOnSuccess, passOnCode, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Authentication_Union_validKey = passOnSuccess(
  mockapi.get("/authentication/union/validkey", (req) => {
    req.expect.containsHeader("x-ms-api-key", "valid-key");
    return { status: 204 };
  }),
);

Scenarios.Authentication_Union_validToken = passOnSuccess(
  mockapi.get("/authentication/union/validtoken", (req) => {
    req.expect.containsHeader("authorization", "Bearer https://security.microsoft.com/.default");
    return { status: 204 };
  }),
);
