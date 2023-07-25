import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};
Scenarios.Client_Structure_RenamedOperation_one = passOnSuccess(
  mockapi.patch("/client/structure/renamed-operation/one", (req) => {
    return { status: 200 };
  }),
);
Scenarios.Client_Structure_RenamedOperation_two = passOnSuccess(
  mockapi.patch("/client/structure/renamed-operation/two", (req) => {
    return { status: 200 };
  }),
);
Scenarios.Client_Structure_RenamedOperation_three = passOnSuccess(
  mockapi.patch("/client/structure/renamed-operation/three", (req) => {
    return { status: 200 };
  }),
);
Scenarios.Client_Structure_RenamedOperation_four = passOnSuccess(
  mockapi.patch("/client/structure/renamed-operation/four", (req) => {
    return { status: 200 };
  }),
);
Scenarios.Client_Structure_RenamedOperation_five = passOnSuccess(
  mockapi.patch("/client/structure/renamed-operation/five", (req) => {
    return { status: 200 };
  }),
);
Scenarios.Client_Structure_RenamedOperation_six = passOnSuccess(
  mockapi.patch("/client/structure/renamed-operation/six", (req) => {
    return { status: 200 };
  }),
);