import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import { checkApiVersion } from "../../../../helper.js";

export const Scenarios: Record<string, ScenarioMockApi> = {};

let generationPollCount = 0;

Scenarios.Azure_Core_Lro_Rpc_longRunningRpc = passOnSuccess([
  mockapi.post("/azure/core/lro/rpc/generations:submit", (req) => {
    checkApiVersion(req, "2022-12-01-preview");
    req.expect.bodyEquals({ prompt: "text" });
    generationPollCount = 0;
    return {
      status: 202,
      headers: {
        "operation-location": `${req.baseUrl}/azure/core/lro/rpc/generations/operations/operation1`,
      },
      body: json({ id: "operation1", status: "InProgress" }),
    };
  }),
  mockapi.get("/azure/core/lro/rpc/generations/operations/operation1", (req) => {
    checkApiVersion(req, "2022-12-01-preview");
    const response =
      generationPollCount > 0
        ? { id: "operation1", status: "Succeeded", result: { data: "text data" } }
        : { id: "operation1", status: "InProgress" };
    generationPollCount += 1;
    return { status: 200, body: json(response) };
  }),
]);
