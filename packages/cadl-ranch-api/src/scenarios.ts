import { MockApi, ScenarioMockApi } from "./types.js";

export function passOnSuccess(apis: MockApi | readonly MockApi[]): ScenarioMockApi {
  return {
    passCondition: "response-success",
    apis: Array.isArray(apis) ? apis : [apis],
  };
}
