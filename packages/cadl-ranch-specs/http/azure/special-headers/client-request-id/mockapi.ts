import { passOnSuccess, ScenarioMockApi, mockapi, validateValueFormat } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Azure_SpecialHeaders_XmsClientRequestId = passOnSuccess(
  mockapi.get("/azure/special-headers/x-ms-client-request-id", (req) => {
    validateValueFormat(req.headers["x-ms-client-request-id"], "uuid");
    return {
      status: 204,
      headers: {
        ["x-ms-client-request-id"]: req.headers["x-ms-client-request-id"],
      },
    };
  }),
);
