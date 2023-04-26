import { MockRequest } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import { getValidAndInvalidScenarios } from "../commonapi.js";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const validAndInvalidScenarios = getValidAndInvalidScenarios(
  "api-key",
  "invalid-api-key",
  function addOptionalParamOldApiVersionNewClientValidate(req: MockRequest): void {
    req.expect.containsHeader("x-ms-api-key", "valid-key");
  },
);

Scenarios.Authentication_ApiKey_valid = validAndInvalidScenarios.valid;

Scenarios.Authentication_ApiKey_invalid = validAndInvalidScenarios.invalid;
