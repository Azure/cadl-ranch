import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};
Scenarios.Client_Structure_TwoOperationGroup_one = passOnSuccess(
  mockapi.patch("/client/structure/two-operation-group/one", (req) => {
    return { status: 200 };
  }),
);
Scenarios.Client_Structure_TwoOperationGroup_two = passOnSuccess(
  mockapi.patch("/client/structure/two-operation-group/two", (req) => {
    return { status: 200 };
  }),
);
Scenarios.Client_Structure_TwoOperationGroup_three = passOnSuccess(
  mockapi.patch("/client/structure/two-operation-group/three", (req) => {
    return { status: 200 };
  }),
);
Scenarios.Client_Structure_TwoOperationGroup_four = passOnSuccess(
  mockapi.patch("/client/structure/two-operation-group/four", (req) => {
    return { status: 200 };
  }),
);
Scenarios.Client_Structure_TwoOperationGroup_five = passOnSuccess(
  mockapi.patch("/client/structure/two-operation-group/five", (req) => {
    return { status: 200 };
  }),
);
Scenarios.Client_Structure_TwoOperationGroup_six = passOnSuccess(
  mockapi.patch("/client/structure/two-operation-group/six", (req) => {
    return { status: 200 };
  }),
);