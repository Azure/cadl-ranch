import { passOnSuccess, mockapi, json, ValidationError, validateValueFormat } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const validUser = {
  id: 1,
  name: "Madge",
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
    const if_none_match = req.headers["if-none-match"];
    const if_match = req.headers["if-match"];
    if (if_none_match !== '"invalid"' && if_match !== '"valid"') {
      throw new ValidationError(
        `Expected header "if-none-match" equals "invalid" but got ${if_none_match} or "if-match" equals "valid" but got ${if_match}`,
        `"if-match": "valid" or "if-none-match": "invalid"`,
        `"if-match": ${if_match} or "if-none-match": ${if_none_match}`,
      );
    }
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

    validateValueFormat(req.headers["repeatability-request-id"], "uuid");
    validateValueFormat(req.headers["repeatability-first-sent"], "rfc7231");

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
