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
  mockapi.get("/azure/core/page/ledger-entries/transactions", () => {
    const responseBody = {
      entries: [
        {
          contents: "string",
          collectionId: "1",
          transactionId: "1",
        },
      ],
      nextPageLink: "/azure/core/page/ledger-entries/transactions?page=1",
    };
    return {
      status: 200,
      body: json(responseBody),
    };
  }),
);

Scenarios.Azure_Core_Page_AdditionalParameter = passOnSuccess(
  mockapi.get("/azure/core/page/metric-dimensions/test-runs/1/dimensions/name/values", () => {
    const responseBody = {
      value: [{ value: ["dimension1"] }],
      nextLink: "/azure/core/page/metric-dimensions/test-runs/1/dimensions/name/values?page=1",
    };
    return { status: 200, body: json(responseBody) };
  }),
);

Scenarios.Azure_Core_Page_Pools = passOnSuccess(
  mockapi.get("/azure/core/page/pools", () => {
    const responseBody = {
      items: [
        {
          id: "1",
          displayName: "displayName",
          url: "http://www.example.com",
        },
      ],
      nextLink: "/azure/core/page/pools?page=1",
    };
    return { status: 200, body: json(responseBody) };
  }),
);

Scenarios.Azure_Core_Page_TwoResourcesAsListItems = passOnSuccess([
  mockapi.get("/azure/core/page/Text-blocklists/blocklists", () => {
    const responseBody = {
      value: [
        {
          blocklistName: "blocklistName",
          description: "description",
        },
      ],
      nextLink: "/azure/core/page/Text-blocklists/blocklists?page=1",
    };
    return { status: 200, body: json(responseBody) };
  }),
  mockapi.get("/azure/core/page/Text-blockItems/blocklists/blocklistName/blockItems", (req) => {
    const responseBody = {
      value: [
        {
          blockItemId: "1",
          description: "description",
          text: "text",
        },
      ],
      nextLink: "/azure/core/page/Text-blockItems/blocklists/blocklistName/blockItems?page=1",
    };
    return { status: 200, body: json(responseBody) };
  }),
]);

Scenarios.Azure_Core_Page_UseFoundationsResourceList = passOnSuccess(
  mockapi.get("/azure/core/page/foundations-resource-list/custom-resource-list/transactions", (req) => {
    const responseBody = {
      value: [
        {
          transactionId: "1",
          collectionId: "1",
          contents: "contents",
        },
      ],
      nextLink: "/azure/core/page/foundations-resource-list/custom-resource-list/transactions?page=1",
    };
    return { status: 200, body: json(responseBody) };
  }),
);
