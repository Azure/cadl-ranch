import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};
Scenarios.Client_Structure_MultiClient = passOnSuccess([
  mockapi.patch("/client/structure/multi-client/one", (req) => {
    return { status: 204 };
  }),
  // mockapi.patch("/client/structure/multi-client/two", (req) => {
  //   return { status: 204 };
  // }),
  mockapi.patch("/client/structure/multi-client/three", (req) => {
    return { status: 204 };
  }),
  mockapi.patch("/client/structure/multi-client/four", (req) => {
    return { status: 204 };
  }),
  mockapi.patch("/client/structure/multi-client/five", (req) => {
    return { status: 204 };
  }),
  // mockapi.patch("/client/structure/multi-client/six", (req) => {
  //   return { status: 204 };
  // }),
]);
