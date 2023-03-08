import { passOnSuccess, ScenarioMockApi, mockapi, json } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.GetRawModel = passOnSuccess(
  mockapi.get("/customization/model/raw", (req) => {
    return {
      status: 200,
      body: json({ received: "raw" }),
    };
  }),
);

Scenarios.GetHandwrittenModel = passOnSuccess(
  mockapi.get("/customization/model/model", (req) => {
    return {
      status: 200,
      body: json({ received: "model" }),
    };
  }),
);

Scenarios.PostRawModel = passOnSuccess(
  mockapi.post("/customization/model/raw", (req) => {
    req.expect.bodyEquals({ hello: `world!` });
    return {
      status: 200,
      body: json({ received: "raw" }),
    };
  }),
);

Scenarios.PostHandwrittenModel = passOnSuccess(
  mockapi.post("/customization/model/model", (req) => {
    req.expect.bodyEquals({ hello: `world!` });
    return {
      status: 200,
      body: json({ received: "model" }),
    };
  }),
);

Scenarios.GetProtocolPages = passOnSuccess([
  mockapi.get("/customization/paging/protocol/", (req) => {
    return {
      status: 200,
      body: json({
        values: [{ received: "protocol" }],
        nextLink: req.baseUrl + "/customization/paging/protocol/2",
      }),
    };
  }),
  mockapi.get("/customization/paging/protocol/2", (req) => {
    return {
      status: 200,
      body: json({ values: [{ received: "protocol" }] }),
    };
  }),
]);

Scenarios.GetConveniencePages = passOnSuccess([
  mockapi.get("/customization/paging/convenience/", (req) => {
    return {
      status: 200,
      body: json({
        values: [{ received: "convenience" }],
        nextLink: req.baseUrl + "/customization/paging/convenience/2",
      }),
    };
  }),
  mockapi.get("/customization/paging/convenience/2", (req) => {
    return {
      status: 200,
      body: json({ values: [{ received: "convenience" }] }),
    };
  }),
]);

Scenarios.RawLRO = passOnSuccess(
  mockapi.put("/customization/lro/raw", (req) => {
    return {
      status: 200,
      body: json({ provisioningState: "Succeeded", received: "raw" }),
    };
  }),
);

Scenarios.HandwrittenModelLRO = passOnSuccess(
  mockapi.put("/customization/lro/model", (req) => {
    return {
      status: 200,
      body: json({ provisioningState: "Succeeded", received: "model" }),
    };
  }),
);
