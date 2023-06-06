import { passOnSuccess, mockapi, json, ValidationError } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const validUser = {
  id: 1,
  name: "Madge",
  etag: "11bdc430-65e8-45ad-81d9-8ffa60d55b59",
};

Scenarios.Azure_Core_Traits_smokeTest = passOnSuccess(
  mockapi.get("/azure/core/traits/user/:id", (req) => {
    if (!("x-ms-client-request-id" in req.headers)) {
      throw new ValidationError("Should submit header x-ms-client-request-id", "any uuid", undefined);
    }
    if (req.params.id !== "1") {
      throw new ValidationError("Expected path param id=1", "1", req.params.id);
    }
    req.expect.containsHeader("foo", "123");
    req.expect.containsHeader("if-match", '"valid"');
    req.expect.containsHeader("if-none-match", '"invalid"');
    req.expect.containsHeader("if-unmodified-since", "Fri, 26 Aug 2022 14:38:00 GMT");
    req.expect.containsHeader("if-modified-since", "Thu, 26 Aug 2021 14:38:00 GMT");
    return {
      status: 200,
      body: json(validUser),
      headers: {
        "bar": "456",
        "etag": "11bdc430-65e8-45ad-81d9-8ffa60d55b59",
        "x-ms-client-request-id": req.headers["x-ms-client-request-id"],
      },
    };
  }),
);

Scenarios.Azure_Core_Traits_repeatableAction = passOnSuccess(
  mockapi.post("/azure/core/traits/user/:id:repeatableAction", (req) => {
    if (req.params.id !== "1") {
      throw new ValidationError("Expected path param id=1", "1", req.params.id);
    }

    if (!("repeatability-request-id" in req.headers)) {
      throw new ValidationError("Repeatability-Request-ID is missing", "A UUID string", undefined);
    }
    if (!("repeatability-first-sent" in req.headers)) {
      throw new ValidationError("Repeatability-First-Sent is missing", "A date-time in headers format", undefined);
    }

    if (!/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(req.headers["repeatability-request-id"])) {
      throw new ValidationError(
        `Repeatability-Request-ID should be a UUID string`,
        "A UUID string",
        req.headers["repeatability-request-id"],
      );
    }
    if (isNaN(Date.parse(req.headers["repeatability-first-sent"]))) {
      throw new ValidationError(
        `Repeatability-First-Sent should be a date-time in headers format`,
        "A date-time in headers format",
        req.headers["repeatability-first-sent"],
      );
    }

    const validBody = { userActionValue: "test" };
    req.expect.bodyEquals(validBody);

    return {
      status: 200,
      body: json({ userActionResult: "test" }),
      headers: {
        "repeatability-result": "accepted",
      },
    };
  }),
);
