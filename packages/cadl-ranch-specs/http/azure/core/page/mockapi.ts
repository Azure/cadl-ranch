import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
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

Scenarios.Azure_Core_Page_AdditionalParameter = passOnSuccess(
  mockapi.get("/azure/core/page/items-traits/test-runs/1/items/name/values", () => {
    const responseBody = {
      value: [{ value: ["Madge"] }],
      nextLink: "/azure/core/page/items-traits/test-runs/1/items/name/values?page=1",
    };
    return { status: 200, body: json(responseBody) };
  }),
);
