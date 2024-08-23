import { passOnSuccess, mockapi, json, ValidationError } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};
const validUser = { id: 1, name: "Madge", etag: "11bdc430-65e8-45ad-81d9-8ffa60d55b59" };

Scenarios.Azure_Core_Page_listWithPage = passOnSuccess(
  mockapi.get("/azure/core/page/page", (req) => {
    const responseBody = {
      value: [validUser],
    };
    return { status: 200, body: json(responseBody) };
  }),
);

Scenarios.Azure_Core_Page_listWithParameters = passOnSuccess(
  mockapi.get("/azure/core/page/parameters", (req) => {
    req.expect.containsQueryParam("another", "Second");

    const validBody = { inputName: "Madge" };
    req.expect.bodyEquals(validBody);

    const responseBody = {
      value: [validUser],
    };
    return { status: 200, body: json(responseBody) };
  }),
);

Scenarios.Azure_Core_Page_TwoModelsAsPageItem = passOnSuccess([
  mockapi.get("/azure/core/page/first-item", () => {
    const responseBody = {
      value: [{ id: 1 }],
    };
    return { status: 200, body: json(responseBody) };
  }),
  mockapi.get("/azure/core/page/second-item", () => {
    const responseBody = {
      value: [{ name: "Madge" }],
    };
    return { status: 200, body: json(responseBody) };
  }),
]);

Scenarios.Azure_Core_Page_listWithCustomPageModel = passOnSuccess(
  mockapi.get("/azure/core/page/custom-page", () => {
    const responseBody = {
      items: [validUser],
    };
    return { status: 200, body: json(responseBody) };
  }),
);

Scenarios.Azure_Core_Page_list = passOnSuccess(
  mockapi.get("/azure/core/page/users", (req) => {
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
