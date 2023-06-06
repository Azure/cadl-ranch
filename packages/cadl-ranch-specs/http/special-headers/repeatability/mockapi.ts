import { passOnSuccess, ScenarioMockApi, mockapi, ValidationError } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.SpecialHeaders_Repeatability_doSomething = passOnSuccess(
  mockapi.post("/special-headers/repeatability/immediateSuccess", (req) => {
    if (!("repeatability-request-id" in req.headers)) {
      throw new ValidationError(
        "Repeatability-Request-ID is missing",
        "A UUID string",
        req.headers["Repeatability-Request-ID"],
      );
    }
    if (!("repeatability-first-sent" in req.headers)) {
      throw new ValidationError(
        "Repeatability-First-Sent is missing",
        "A date-time in headers format",
        req.headers["Repeatability-First-Sent"],
      );
    }
    return {
      status: 204,
    };
  }),
);
