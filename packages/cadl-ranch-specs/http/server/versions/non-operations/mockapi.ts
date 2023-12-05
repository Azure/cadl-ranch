import { passOnSuccess, mockapi, ValidationError } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Server_Versions_NonOperations_myOp = passOnSuccess(
  mockapi.head("/server/versions/nonOperations/myOp", (req) => {
    if (Object.keys(req.originalRequest.query).length > 0) {
      throw new ValidationError(
        "Expected no query parameters including api-version",
        "No query parameters",
        req.originalRequest.query,
      );
    }
    return { status: 200 };
  }),
);
