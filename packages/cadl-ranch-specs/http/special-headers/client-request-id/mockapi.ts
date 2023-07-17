import { passOnSuccess, ScenarioMockApi, mockapi, validateValueFormat } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.SpecialHeaders_ClientRequestId = passOnSuccess(
  mockapi.get("/special-headers/client-request-id", (req) => {
    validateValueFormat(req.headers["client-request-id"], "uuid");
    return {
      status: 204,
      headers: {
        ["client-request-id"]: req.headers["client-request-id"],
      },
    };
  }),
);
