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

Scenarios.Azure_Traits_create = passOnSuccess(
  mockapi.post("/azure/traits/user", (req) => {
    validateHeaders(req);
    const validBody = { name: "Madge" };
    req.expect.bodyEquals(validBody);
    return {
      status: 201,
      body: json(validUser),
      headers: {
        "Location": "http://localhost:3000/azure/traits/user/1",
        "Repeatability-Result": "Accepted",
        "x-ms-client-request-id": req.headers["x-ms-client-request-id"],
      },
    };
  }),
);

Scenarios.Azure_Traits_get = passOnSuccess(
  mockapi.get("/azure/traits/user/:id", (req) => {
    validateHeaders(req);
    if (req.params.id !== "1") {
      throw new ValidationError("Expected path param id=1", "1", req.params.id);
    }
    req.expect.containsHeader("foo", "123");
    req.expect.containsHeader("if-match", "valid");
    req.expect.containsHeader("if-none-match", "invalid");
    req.expect.containsHeader("if-unmodified-since", "2022-08-26T18:38:00.000Z");
    req.expect.containsHeader("if-modified-since", "2021-08-26T18:38:00.000Z");
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

Scenarios.Azure_Traits_list = passOnSuccess(
  mockapi.get("/azure/traits/user", (req) => {
    validateHeaders(req);
    req.expect.containsQueryParam("top", "5");
    req.expect.containsQueryParam("skip", "10");
    req.expect.containsQueryParam("orderby", "id");
    req.expect.containsQueryParam("filter", "id eq 1");
    if (!req.originalRequest.originalUrl.includes("select=id&select=orders&select=ETag")) {
      throw new ValidationError("Expected query param colors=blue&colors=red&colors=green ", "1", req.headers["select"]);
    }
    req.expect.containsQueryParam("expand", "orders");
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

Scenarios.Azure_Traits_listWithPage = passOnSuccess(
  mockapi.get("/azure/traits/page", (req) => {
    const responseBody = {
      value: [validUser],
    };
    return { status: 200, body: json(responseBody) };
  }),
);

Scenarios.Azure_Traits_delete = passOnSuccess(
  mockapi.delete("/azure/traits/api/2022-12-01-preview/user/:id", (req) => {
    validateHeaders(req);
    if (req.params.id !== "1") {
      throw new ValidationError("Expected path param id=1", "1", req.params.id);
    }
    return { status: 204 };
  }),
);
