import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import { checkApiVersion } from "../../../../helper.js";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const jobInProgress = { jobId: "job1", comment: "async job", status: "running" };
const jobSucceeded = { jobId: "job1", comment: "async job", status: "succeeded", results: ["job1 result"] };
let createPollCount = 0;

Scenarios.Azure_Core_Lro_Rpc_Legacy_CreateResourcePollViaOperationLocation = passOnSuccess([
  mockapi.post("/azure/core/lro/rpc/legacy/create-resource-poll-via-operation-location/jobs", (req) => {
    checkApiVersion(req, "2022-12-01-preview");
    req.expect.bodyEquals({ comment: "async job" });
    createPollCount = 0;
    return {
      status: 202,
      headers: {
        "operation-location": `${req.baseUrl}/azure/core/lro/rpc/legacy/create-resource-poll-via-operation-location/jobs/job1`,
      },
    };
  }),
  mockapi.get("/azure/core/lro/rpc/legacy/create-resource-poll-via-operation-location/jobs/job1", (req) => {
    const response = createPollCount > 0 ? jobSucceeded : jobInProgress;
    createPollCount += 1;
    return { status: 200, body: json(response) };
  }),
]);
