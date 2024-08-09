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

Scenarios.Azure_Core_Page_ListPaginationLedgerEntries = passOnSuccess(
  mockapi.put("/azure/core/page/ledger-entries", (req) => {
    const requestBody = {
      required: "required",
      requireint: 1,
    };
    const responseBody = {
      entries: [
        {
          contents: "string",
          collectionId: "string",
          transactionId: "string",
        },
      ],
    };
    req.expect.bodyEquals(requestBody);
    return {
      status: 200,
      body: json(responseBody),
    };
  }),
);

Scenarios.Azure_Core_Page_AdditionalParameter = passOnSuccess(
  mockapi.put("/azure/core/page/metric-dimensions", (req) => {
    const body = {
      testRunId: "1",
      name: "name",
      metricNamespace: "metricNamespace",
      interval: "interval",
      metricName: "metricName",
      timespan: "timespan",
      requestContext: {
        requireString: "requireString",
        requireInt: 1,
      },
    };
    req.expect.bodyEquals(body);
    return { status: 200, body: json(body) };
  }),
);

Scenarios.Azure_Core_Page_Pools = passOnSuccess(
  mockapi.put("/azure/core/page/pools", (req) => {
    const requestBody = {
      filter: "filter",
      select: ["select"],
      expand: ["expand"],
    };
    req.expect.bodyEquals(requestBody);
    const responseBody = {
      id: "id",
      displayName: "displayName",
      Url: "Url",
    };
    return { status: 200, body: json(responseBody) };
  }),
);

Scenarios.Azure_Core_Page_TwoResourcesAsListItems = passOnSuccess(
  mockapi.get("/azure/core/page/text/blocklists", (req) => {
    const responseBody = {
      blockListsName: "blockListsName",
      Description: "Description",
    };
    return { status: 200, body: json(responseBody) };
  }),
);

Scenarios.Azure_Core_Page_CustomResourceList = passOnSuccess(
  mockapi.get("/azure/core/page/custom-resource-list", (req) => {
    const responseBody = {
      name: "name",
    };
    return { status: 200, body: json(responseBody) };
  }),
);

Scenarios.Azure_Core_Page_UseFoundationsResourceList = passOnSuccess(
  mockapi.get("/azure/core/page//foundations-resource-list", (req) => {
    const responseBody = {
      name: "name",
    };
    return { status: 200, body: json(responseBody) };
  }),
);
