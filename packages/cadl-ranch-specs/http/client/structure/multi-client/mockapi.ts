import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};
Scenarios.Client_Structure_MultiClient_one = passOnSuccess(
  mockapi.patch("/client/structure/multi-client/one", (req) => {
    return { status: 200 };
  }),
);
Scenarios.Client_Structure_MultiClient_two = passOnSuccess(
  mockapi.patch("/client/structure/multi-client/two", (req) => {
    return { status: 200 };
  }),
);
Scenarios.Client_Structure_MultiClient_three = passOnSuccess(
  mockapi.patch("/client/structure/multi-client/three", (req) => {
    return { status: 200 };
  }),
);
Scenarios.Client_Structure_MultiClient_four = passOnSuccess(
  mockapi.patch("/client/structure/multi-client/four", (req) => {
    return { status: 200 };
  }),
);
Scenarios.Client_Structure_MultiClient_five = passOnSuccess(
  mockapi.patch("/client/structure/multi-client/five", (req) => {
    return { status: 200 };
  }),
);
Scenarios.Client_Structure_MultiClient_six = passOnSuccess(
  mockapi.patch("/client/structure/multi-client/six", (req) => {
    return { status: 200 };
  }),
);