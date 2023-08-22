import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Azure_ClientGenerator_Core_Usage_ModelInOperation = passOnSuccess([
  mockapi.post("/azure/client-generator-core/usage/inputToRoundTrip", (req) => {
    const validBody = { name: "Madge" };
    req.expect.bodyEquals(validBody);
    return { status: 204 };
  }),
  mockapi.get("/azure/client-generator-core/usage/outputToRoundTrip", (req) => {
    return {
      status: 200,
      body: json({ name: "Madge" }),
    };
  }),
]);
