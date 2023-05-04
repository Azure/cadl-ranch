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
    req.expect.containsHeader("if-match", "\"valid\"");
    req.expect.containsHeader("if-none-match", "\"invalid\"");
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
