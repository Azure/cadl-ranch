import { MockRequest } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import { getValidAndInvalidScenarios } from "../commonapi.js";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const validAndInvalidScenarios = getValidAndInvalidScenarios(
  "oauth2",
  "invalid-grant",
  function addOptionalParamOldApiVersionNewClientValidate(req: MockRequest): void {
    req.expect.containsHeader("authorization", "Bearer https://security.microsoft.com/.default");
  },
);

Scenarios.Authentication_OAuth2_valid = validAndInvalidScenarios.valid;

Scenarios.Authentication_OAuth2_invalid = validAndInvalidScenarios.invalid;
