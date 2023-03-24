import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const jobInProgress = { jobId: "job1", comment: "async job", status: "InProgress" };
const jobSucceeded = { jobId: "job1", comment: "async job", status: "Succeeded", results: ["job1 result"] };
let createPollCount = 0;

const operationInProgress = { operationId: "operation1", status: "InProgress" };
const operationSucceeded = { operationId: "operation1", status: "Succeeded" };
let createFinalOnLocationPollCount = 0;

Scenarios.Azure_Lro_Rpc_SamePollResult = passOnSuccess([
  mockapi.post("/azure/lro/rpc/same-poll-result/jobs", (req) => {
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    req.expect.bodyEquals({ comment: "async job" });
    createPollCount = 0;
    return {
      status: 202,
      headers: { "operation-location": "http://localhost:3000/azure/lro/rpc/same-poll-result/jobs/job1" },
      body: json(jobInProgress),
    };
  }),
  mockapi.get("/azure/lro/rpc/same-poll-result/jobs/job1", (req) => {
    const response = createPollCount > 0 ? jobSucceeded : jobInProgress;
    createPollCount += 1;
    return { status: 200, body: json(response) };
  }),
]);

Scenarios.Azure_Lro_Rpc_DifferentPollResult = passOnSuccess([
  mockapi.post("/azure/lro/rpc/different-poll-result/jobs", (req) => {
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    req.expect.bodyEquals({ comment: "async job" });
    createFinalOnLocationPollCount = 0;
    return {
      status: 202,
      headers: {
        "operation-location": "http://localhost:3000/azure/lro/rpc/different-poll-result/jobs/operations/operation1",
        "location": "http://localhost:3000/azure/lro/rpc/different-poll-result/jobs/job1",
      },
      body: json(operationInProgress),
    };
  }),
  mockapi.get("/azure/lro/rpc/different-poll-result/jobs/operations/operation1", (req) => {
    const response = createFinalOnLocationPollCount > 0 ? operationSucceeded : operationInProgress;
    createFinalOnLocationPollCount += 1;
    return { status: 200, body: json(response) };
  }),
  mockapi.get("/azure/lro/rpc/different-poll-result/jobs/job1", (req) => {
    return { status: 200, body: json(jobSucceeded) };
  }),
]);
