import { passOnSuccess, mockapi, json, ValidationError } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};
const validUser = { id: 1, name: "Madge", etag: "11bdc430-65e8-45ad-81d9-8ffa60d55b59" };
Scenarios.Azure_Core_Basic_createOrUpdate = passOnSuccess(
  mockapi.patch("/azure/core/basic/users/:id", (req) => {
    if (req.params.id !== "1") {
      throw new ValidationError("Expected path param id=1", "1", req.params.id);
    }
    req.expect.containsHeader("content-type", "application/merge-patch+json");
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    const validBody = { name: "Madge" };
    req.expect.bodyEquals(validBody);
    return { status: 200, body: json(validUser) };
  }),
);

Scenarios.Azure_Core_Basic_createOrReplace = passOnSuccess(
  mockapi.put("/azure/core/basic/users/:id", (req) => {
    if (req.params.id !== "1") {
      throw new ValidationError("Expected path param id=1", "1", req.params.id);
    }
    req.expect.containsHeader("content-type", "application/json");
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    const validBody = { name: "Madge" };
    req.expect.bodyEquals(validBody);
    return { status: 200, body: json(validUser) };
  }),
);

Scenarios.Azure_Core_Basic_get = passOnSuccess(
  mockapi.get("/azure/core/basic/users/:id", (req) => {
    if (req.params.id !== "1") {
      throw new ValidationError("Expected path param id=1", "1", req.params.id);
    }
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    return { status: 200, body: json(validUser) };
  }),
);

Scenarios.Azure_Core_Basic_list = passOnSuccess(
  mockapi.get("/azure/core/basic/users", (req) => {
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    req.expect.containsQueryParam("top", "5");
    req.expect.containsQueryParam("skip", "10");
    req.expect.containsQueryParam("orderby", "id");
    req.expect.containsQueryParam("filter", "id lt 10");
    if (!req.originalRequest.originalUrl.includes("select=id&select=orders&select=etag")) {
      throw new ValidationError(
        "Expected query param select=id&select=orders&select=etag ",
        "select=id&select=orders&select=etag",
        req.originalRequest.originalUrl,
      );
    }
    req.expect.containsQueryParam("expand", "orders");
    const responseBody = {
      value: [
        {
          id: 1,
          name: "Madge",
          etag: "11bdc430-65e8-45ad-81d9-8ffa60d55b59",
          orders: [{ id: 1, userId: 1, detail: "a recorder" }],
        },
        {
          id: 2,
          name: "John",
          etag: "11bdc430-65e8-45ad-81d9-8ffa60d55b5a",
          orders: [{ id: 2, userId: 2, detail: "a TV" }],
        },
      ],
    };
    return { status: 200, body: json(responseBody) };
  }),
);

Scenarios.Azure_Core_Basic_listWithPage = passOnSuccess(
  mockapi.get("/azure/core/basic/page", (req) => {
    const responseBody = {
      value: [validUser],
    };
    return { status: 200, body: json(responseBody) };
  }),
);

Scenarios.Azure_Core_Basic_listWithCustomPageModel = passOnSuccess(
  mockapi.get("/azure/core/basic/custom-page", (req) => {
    const responseBody = {
      items: [validUser],
    };
    return { status: 200, body: json(responseBody) };
  }),
);

Scenarios.Azure_Core_Basic_delete = passOnSuccess(
  mockapi.delete("/azure/core/basic/users/:id", (req) => {
    if (req.params.id !== "1") {
      throw new ValidationError("Expected path param id=1", "1", req.params.id);
    }
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    return { status: 204 };
  }),
);

Scenarios.Azure_Core_Basic_export = passOnSuccess(
  mockapi.post("/azure/core/basic/users/:id:export", (req) => {
    if (req.params.id !== "1") {
      throw new ValidationError("Expected path param id=1", "1", req.params.id);
    }
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    req.expect.containsQueryParam("format", "json");
    return { status: 200, body: json(validUser) };
  }),
);
