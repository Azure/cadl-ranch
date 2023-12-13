import { passOnSuccess, mockapi, ValidationError } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Server_Versions_PartiallyVersioned_withoutApiVersion = passOnSuccess(
  mockapi.head("/server/versions/partiallyVersioned/withoutApiVersion", (req) => {
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

Scenarios.Server_Versions_PartiallyVersioned_withApiVersion = passOnSuccess(
  mockapi.head("/server/versions/partiallyVersioned/withApiVersion", (req) => {
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    return { status: 200 };
  }),
);
