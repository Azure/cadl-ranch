import { passOnSuccess, ScenarioMockApi, mockapi, ValidationError, validateValueFormat } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.SpecialHeaders_Repeatability_immediateSuccess = passOnSuccess(
  mockapi.post("/special-headers/repeatability/immediateSuccess", (req) => {
    if (!("repeatability-request-id" in req.headers)) {
      throw new ValidationError("Repeatability-Request-ID is missing", "A UUID string", undefined);
    }
    if (!("repeatability-first-sent" in req.headers)) {
      throw new ValidationError("Repeatability-First-Sent is missing", "A date-time in headers format", undefined);
    }
    validateValueFormat(req.headers["repeatability-request-id"], "uuid");
    validateValueFormat(req.headers["repeatability-first-sent"], "rfc7123");
    return {
      status: 204,
      headers: {
        "repeatability-result": "accepted",
      },
    };
  }),
);
