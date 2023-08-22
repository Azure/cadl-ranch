import { passOnSuccess, mockapi, ValidationError, json, MockApi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

function createMockApis(route: string): MockApi {
  const url = `/azure/client-generator-core/usage/${route}`;
  return mockapi.get(url, (req) => {
    if (!("name" in req.query)) {
      throw new ValidationError("Should submit name query", "any string", undefined);
    }
    return {
      status: 200,
      body: json({ name: req.query["name"] }),
    };
  });
}

Scenarios.Azure_ClientGenerator_Core_Usage_inputToRoundTrip = passOnSuccess(
  mockapi.post("/azure/client-generator-core/usage/inputToRoundTrip", (req) => {
    const validBody = { name: "Madge" };
    req.expect.bodyEquals(validBody);
    return { status: 204 };
  }),
);

Scenarios.Azure_ClientGenerator_Core_Usage_outputToRoundTrip = passOnSuccess(
  mockapi.get("/azure/client-generator-core/usage/outputToRoundTrip", (req) => {
    return {
      status: 200,
      body: json({ name: "Madge" })
    };
  }),
);