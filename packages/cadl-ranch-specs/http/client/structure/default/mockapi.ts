import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};
Scenarios.Client_Structure_Service = passOnSuccess([
  mockapi.patch("client/structure/default/one", (req) => {
    return { status: 200 };
  }),
  mockapi.patch("/client/structure/default/two", (req) => {
    return { status: 200 };
  }),
  mockapi.patch("/client/structure/default/three", (req) => {
    return { status: 200 };
  }),
  mockapi.patch("/client/structure/default/four", (req) => {
    return { status: 200 };
  }),
  mockapi.patch("/client/structure/default/five", (req) => {
    return { status: 200 };
  }),
  mockapi.patch("/client/structure/default/six", (req) => {
    return { status: 200 };
  }),
]);
