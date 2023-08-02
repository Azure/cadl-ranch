import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};
Scenarios.Client_Structure_RenamedOperation = passOnSuccess([
  mockapi.patch("/client/structure/renamed-operation/one", (req) => {
    return { status: 204 };
  }),
  mockapi.patch("/client/structure/renamed-operation/two", (req) => {
    return { status: 204 };
  }),
  mockapi.patch("/client/structure/renamed-operation/three", (req) => {
    return { status: 204 };
  }),
  mockapi.patch("/client/structure/renamed-operation/four", (req) => {
    return { status: 204 };
  }),
  mockapi.patch("/client/structure/renamed-operation/five", (req) => {
    return { status: 204 };
  }),
  mockapi.patch("/client/structure/renamed-operation/six", (req) => {
    return { status: 204 };
  }),
]);
