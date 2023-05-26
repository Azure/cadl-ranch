import { MockRequest } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import { getValidAndInvalidScenarios } from "../../commonapi.js";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const validAndInvalidScenarios = getValidAndInvalidScenarios(
  "http/custom",
  "invalid-api-key",
  function addOptionalParamOldApiVersionNewClientValidate(req: MockRequest): void {
    req.expect.containsHeader("Authorization", "SharedAccessKey valid-key");
  },
);

Scenarios.Authentication_Http_Custom_valid = validAndInvalidScenarios.valid;

Scenarios.Authentication_Http_Custom_invalid = validAndInvalidScenarios.invalid;
