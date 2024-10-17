import { passOnSuccess, json, MockRequest } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Versioning_ReturnTypeChangedFrom_test = passOnSuccess({
  uri: `/versioning/return-type-changed-from/api-version:v2/test`,
  method: `post`,
  request: {
    body: "test",
    headers: {
      "Content-Type": "text/plain",
    },
  },
  response: {
    status: 200,
    body: json("test"),
  },
  handler: (req: MockRequest) => {
    req.expect.bodyEquals("test");
    return {
      status: 200,
      body: json("test"),
    };
  },
  kind: "MockApiDefinition",
});
