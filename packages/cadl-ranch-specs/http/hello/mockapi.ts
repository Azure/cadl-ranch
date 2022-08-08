import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

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
Scenarios.Hello_world2 = passOnSuccess(
  mockapi.get("/hello/world2", () => {
    return {
      status: 200,
      body: {
        contentType: "application/json",
        rawContent: `"Hello World2!"`,
      },
    };
  }),
);
