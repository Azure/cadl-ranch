import { passOnSuccess, mockapi, json, ValidationError, MockRequest } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

function validateHeaders(req: MockRequest) {
  if (!("x-ms-client-request-id" in req.headers)) {
    throw new ValidationError("Should submit header x-ms-client-request-id", "any uuid", undefined);
  }
}

const validUser = {
  id: 1,
  name: "Madge",
  ETag: "11bdc430-65e8-45ad-81d9-8ffa60d55b59",
};

Scenarios.Azure_Core_Traits_create = passOnSuccess(
  mockapi.patch("/azure/core/traits/user", (req) => {
    validateHeaders(req);
    const validBody = { name: "Madge" };
    req.expect.bodyEquals(validBody);
    return {
      status: 200,
      body: json(validUser),
      headers: {
        "Location": "http://localhost:3000/azure/core/traits/user/1",
        "Repeatability-Result": "Accepted",
        "x-ms-client-request-id": req.headers["x-ms-client-request-id"],
      },
    };
  }),
);

Scenarios.Azure_Core_Traits_get = passOnSuccess(
  mockapi.get("/azure/core/traits/user/:id", (req) => {
    validateHeaders(req);
    if (req.params.id !== "1") {
      throw new ValidationError("Expected path param id=1", "1", req.params.id);
    }
    req.expect.containsHeader("foo", "123");
    req.expect.containsHeader("If-Match", "valid");
    req.expect.containsHeader("If-None-Match", "invalid");
    req.expect.containsHeader("If-Unmodified-Since", "2022-08-26T18:38:00Z");
    req.expect.containsHeader("If-Modified-Since", "2021-08-26T18:38:00Z");
    req.expect.containsHeader("If-None-Match", "invalid");
    return {
      status: 200,
      body: json(validUser),
      headers: {
        "bar": "456",
        "ETag": "11bdc430-65e8-45ad-81d9-8ffa60d55b59",
        "x-ms-client-request-id": req.headers["x-ms-client-request-id"],
      },
    };
  }),
);

Scenarios.Azure_Core_Trait_list = passOnSuccess(
  mockapi.get("/azure/core/user", (req) => {
    validateHeaders(req);
    req.expect.containsQueryParam("top", "5");
    req.expect.containsQueryParam("skip", "10");
    req.expect.containsQueryParam("orderby", "id");
    req.expect.containsQueryParam("filter", "id eq 1");
    req.expect.containsQueryParam("select", "select=id&select=orders&select=ETag");
    req.expect.containsQueryParam("expand", "expand=orders");
    const responseBody = {
      value: [
        {
          id: 1,
          ETag: "11bdc430-65e8-45ad-81d9-8ffa60d55b59",
          orders: [{ id: 1, userId: 1, detail: "a recorder" }],
        },
      ],
    };
    return { status: 200, body: json(responseBody) };
  }),
);

Scenarios.Azure_Core_Trait_listWithPage = passOnSuccess(
  mockapi.get("/azure/core/traits/page", (req) => {
    const responseBody = {
      value: [validUser],
    };
    return { status: 200, body: json(responseBody) };
  }),
);

Scenarios.Azure_Core_Trait_delete = passOnSuccess(
  mockapi.delete("/azure/core/traits/api/2022-12-01-preview/user/:id", (req) => {
    if (req.params.id !== "1") {
      throw new ValidationError("Expected path param id=1", "1", req.params.id);
    }
    return { status: 204 };
  }),
);
