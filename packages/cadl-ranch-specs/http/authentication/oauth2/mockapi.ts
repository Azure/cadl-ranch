import { json, MockRequest, passOnSuccess } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Authentication_OAuth2_valid = passOnSuccess({
  uri: `/authentication/oauth2/valid`,
  method: "get",
  request: {
    headers: {
      authorization: "Bearer https://security.microsoft.com/.default",
    },
  },
  response: {
    status: 204,
  },
  handler: (req: MockRequest) => {
    req.expect.containsHeader("authorization", "Bearer https://security.microsoft.com/.default");
    return { status: 204 };
  },
  kind: "MockApiDefinition",
});

Scenarios.Authentication_OAuth2_invalid = passOnSuccess({
  uri: `/authentication/oauth2/invalid`,
  method: "get",
  request: {
    status: 403,
  },
  response: {
    status: 403,
    body: json({
      error: "invalid-grant",
    }),
  },
  handler: (req: MockRequest) => {
    return {
      status: 403,
      body: json({
        error: "invalid-grant",
      }),
    };
  },
  kind: "MockApiDefinition",
});
