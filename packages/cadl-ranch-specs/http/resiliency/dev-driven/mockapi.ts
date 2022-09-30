import { passOnSuccess, ScenarioMockApi, mockapi, json } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Resiliency_DevDriven_getModel = passOnSuccess(
  mockapi.get("/resiliency/devdriven/model/raw", (req) => {
    return {
      status: 200,
      body: json({ received: "raw" }),
    };
  }),
);

Scenarios.Resiliency_DevDriven_getModel = passOnSuccess(
  mockapi.get("/resiliency/devdriven/model/model", (req) => {
    return {
      status: 200,
      body: json({ received: "model" }),
    };
  }),
);

Scenarios.Resiliency_DevDriven_postModel = passOnSuccess(
  mockapi.post("/resiliency/devdriven/model/raw", (req) => {
    req.expect.bodyEquals({ hello: `world!` });
    return {
      status: 200,
      body: json({ received: "raw" }),
    };
  }),
);

Scenarios.Resiliency_DevDriven_postModel = passOnSuccess(
  mockapi.post("/resiliency/devdriven/model/model", (req) => {
    req.expect.bodyEquals({ hello: `world!` });
    return {
      status: 200,
      body: json({ received: "model" }),
    };
  }),
);

Scenarios.Resiliency_DevDriven_getRawPages = passOnSuccess([
  mockapi.get("/resiliency/devdriven/products", (req) => {
    return {
      status: 200,
      body: json({
        value: [{ received: "raw" }],
        nextLink: req.baseUrl + "/resiliency/devdriven/products/2",
      }),
    };
  }),
  mockapi.get("/resiliency/devdriven/products/2", (req) => {
    return {
      status: 200,
      body: json({ value: [{ received: "raw" }] }),
    };
  }),
]);

Scenarios.Resiliency_DevDriven_getModelPages = passOnSuccess([
  mockapi.get("/resiliency/devdriven/productmodels/", (req) => {
    return {
      status: 200,
      body: json({
        value: [{ received: "model" }],
        nextLink: req.baseUrl + "/resiliency/devdriven/productmodels/2",
      }),
    };
  }),
  mockapi.get("/resiliency/devdriven/productmodels/2", (req) => {
    return {
      status: 200,
      body: json({ value: [{ received: "model" }] }),
    };
  }),
]);

Scenarios.Resiliency_DevDriven_lro = passOnSuccess(
  mockapi.put("/resiliency/devdriven/lro/raw", (req) => {
    return {
      status: 200,
      body: json({ provisioningState: "Succeeded", received: "raw" }),
    };
  }),
);

Scenarios.Resiliency_DevDriven_lro = passOnSuccess(
  mockapi.put("/resiliency/devdriven/lro/model", (req) => {
    return {
      status: 200,
      body: json({ provisioningState: "Succeeded", received: "model" }),
    };
  }),
);
