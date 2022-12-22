import { passOnSuccess, passOnCode, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Authentication_Multiple_validkey = passOnSuccess(
  mockapi.get("/authentication/multiple/validkey", (req) => {
    req.expect.containsHeader("x-ms-api-key", "valid-key");
    return { status: 204 };
  }),
);

Scenarios.Authentication_Multiple_validtoken = passOnSuccess(
  mockapi.get("/authentication/multiple/validtoken", (req) => {
    req.expect.containsHeader("authorization", "Bearer https://security.microsoft.com/.default");
    return { status: 204 };
  }),
);
