import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};
Scenarios.Client_Structure_ClientOperationGroup = passOnSuccess([
  mockapi.post("/client/structure/client-operation-group/one", (req) => {
    return { status: 204 };
  }),
  mockapi.post("/client/structure/client-operation-group/two", (req) => {
    return { status: 204 };
  }),
  mockapi.post("/client/structure/client-operation-group/three", (req) => {
    return { status: 204 };
  }),
  mockapi.post("/client/structure/client-operation-group/four", (req) => {
    return { status: 204 };
  }),
]);

Scenarios.Client_Structure_AnotherClientOperationGroup = passOnSuccess([
  mockapi.post("/client/structure/client-operation-group/five", (req) => {
    return { status: 204 };
  }),
  mockapi.post("/client/structure/client-operation-group/six", (req) => {
    return { status: 204 };
  }),
]);
