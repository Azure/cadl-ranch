import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Azure_Core_createOrUpdate = passOnSuccess(
  mockapi.patch("/azure/core/users/:id", (req) => {
    if (req.params.id !== "1") {
      return { status: 400 };
    }
    const validBody = { name: "Madge" };
    req.expect.containsHeader("content-type", "application/merge-patch+json");
    req.expect.bodyEquals(validBody);
    const responseBody = { id: 1, name: "Madge" };
    return { status: 200, body: json(responseBody) };
  }),
);
