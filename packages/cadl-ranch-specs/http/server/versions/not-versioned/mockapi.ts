import { passOnSuccess, mockapi, ValidationError } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Server_Versions_NotVersioned_withoutApiVersion = passOnSuccess(
  mockapi.head("/server/versions/notVersioned/withoutApiVersion", (req) => {
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

Scenarios.Server_Versions_NotVersioned_withQueryApiVersion = passOnSuccess(
  mockapi.head("/server/versions/notVersioned/withQueryApiVersion", (req) => {
    req.expect.containsQueryParam("api-version", "v1.0");
    return { status: 200 };
  }),
);

Scenarios.Server_Versions_NotVersioned_withPathApiVersion = passOnSuccess(
  mockapi.head("/server/versions/notVersioned/withPathApiVersion/v1.0", (req) => {
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
