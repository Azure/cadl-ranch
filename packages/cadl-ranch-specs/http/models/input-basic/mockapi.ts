import { passOnSuccess, ScenarioMockApi, mockapi, ValidationError } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.InputBasic_getModel = passOnSuccess(
  mockapi.get("/input-basic/models", (req) => {
    if (req.body && req.body["requiredString"] && req.body["requiredInt"]) {
      return {
        status: 200
      };
    } else {
      throw new ValidationError(`Expected InputModel with required properties`, null, null);
    }
  }),
);
