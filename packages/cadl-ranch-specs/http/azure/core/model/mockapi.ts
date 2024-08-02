import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Azure_Core_Model_AzureCoreEmbeddingVector_get = passOnSuccess(
  mockapi.get("/azure/core/model/embeddingVector", (req) => {
    return { status: 200, body: json([0, 1, 2, 3, 4]) };
  }),
);

Scenarios.Azure_Core_Model_AzureCoreEmbeddingVector_put = passOnSuccess(
  mockapi.put("/azure/core/model/embeddingVector", (req) => {
    req.expect.bodyEquals([0, 1, 2, 3, 4]);
    return { status: 204 };
  }),
);

const responseBody = { embedding: [5, 6, 7, 8, 9] };
Scenarios.Azure_Core_Model_AzureCoreEmbeddingVector_post = passOnSuccess(
  mockapi.post("/azure/core/model/embeddingVector", (req) => {
    req.expect.bodyEquals({ embedding: [0, 1, 2, 3, 4] });
    return {
      status: 200,
      body: json(responseBody),
    };
  }),
);
