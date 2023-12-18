import { passOnSuccess, mockapi, ValidationError } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Server_Versions_Versioned_withoutApiVersion = passOnSuccess(
  mockapi.head("/server/versions/versioned/withoutApiVersion", (req) => {
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

Scenarios.Server_Versions_Versioned_withQueryApiVersion = passOnSuccess(
  mockapi.head("/server/versions/versioned/withQueryApiVersion", (req) => {
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    return { status: 200 };
  }),
);

Scenarios.Server_Versions_Versioned_withQueryApiVersion = passOnSuccess(
  mockapi.head("/server/versions/versioned/withPathApiVersion/2022-12-01-preview", (req) => {
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
