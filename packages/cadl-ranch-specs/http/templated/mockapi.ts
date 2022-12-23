import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Templated_createOrUpdate = passOnSuccess(
  mockapi.patch("/templated/users/:id", (req) => {
    if (req.params.id !== "1") {
      return { status: 400 };
    }
    const validBody = { id: 1, name: "Madge" };
    req.expect.bodyEquals(validBody);
    return { status: 200, body: json(validBody) };
  }),
);
