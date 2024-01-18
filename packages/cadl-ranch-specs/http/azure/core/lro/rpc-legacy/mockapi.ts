import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const jobInProgress = { jobId: "job1", comment: "async job", status: "running" };
const jobSucceeded = { jobId: "job1", comment: "async job", status: "succeeded", results: ["job1 result"] };
let createPollCount = 0;

Scenarios.Azure_Core_Lro_Rpc_Legacy_CreateResourcePollViaOperationLocation = passOnSuccess([
  mockapi.post("/azure/core/lro/rpc/legacy/create-resource-poll-via-operation-location/jobs", (req) => {
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
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

const expectedModel = { modelId: "123", description: "hello" };
let createPollResourceLocationCount = 0;

Scenarios.Azure_Core_Lro_Rpc_Legacy_CreateResourcePollViaOperationLocationAndResourceLocation = passOnSuccess([
  mockapi.post(
    "/azure/core/lro/rpc/legacy/create-resource-poll-via-operation-location-final-result-in-resource-location/documentModels:build",
    (req) => {
      req.expect.containsQueryParam("api-version", "2022-12-01-preview");
      req.expect.bodyEquals(expectedModel);
      createPollResourceLocationCount = 0;
      return {
        status: 202,
        headers: {
          "operation-location": `${req.baseUrl}/azure/core/lro/rpc/legacy/create-resource-poll-via-operation-location-final-result-in-resource-location/operations/1234567890?api-version=2022-12-01-preview`,
        },
      };
    },
  ),
  mockapi.get(
    "/azure/core/lro/rpc/legacy/create-resource-poll-via-operation-location-final-result-in-resource-location/operations/1234567890",
    (req) => {
      req.expect.containsQueryParam("api-version", "2022-12-01-preview");
      const resourceLocation = `${req.baseUrl}/azure/core/lro/rpc/legacy/create-resource-poll-via-operation-location-final-result-in-resource-location/documentModels/123?api-version=2022-12-01-preview`;
      const baseResponse = { operationId: "1234567890", resourceLocation: resourceLocation };
      const response =
        createPollResourceLocationCount > 0
          ? { ...baseResponse, status: "succeeded" }
          : { ...baseResponse, status: "notStarted" };
      createPollResourceLocationCount += 1;
      return { status: 200, body: json(response) };
    },
  ),
  mockapi.get(
    "/azure/core/lro/rpc/legacy/create-resource-poll-via-operation-location-final-result-in-resource-location/documentModels/123",
    (req) => {
      req.expect.containsQueryParam("api-version", "2022-12-01-preview");
      return { status: 200, body: json(expectedModel) };
    },
  ),
]);
