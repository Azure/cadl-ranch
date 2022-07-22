import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api/dist/types.js";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Hello_world = passOnSuccess(
  mockapi.get("/hello/world", () => {
    return {
      status: 200,
      body: {
        contentType: "application/json",
        rawContent: `"Hello World!"`,
      },
    };
  }),
);
