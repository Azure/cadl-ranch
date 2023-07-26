import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};
Scenarios.Client_Structure_RenamedOperation = passOnSuccess([
  mockapi.patch("/one", (req) => {
    return { status: 200 };
  }),
  mockapi.patch("/two", (req) => {
    return { status: 200 };
  }),
  mockapi.patch("/three", (req) => {
    return { status: 200 };
  }),
  mockapi.patch("/four", (req) => {
    return { status: 200 };
  }),
  mockapi.patch("/five", (req) => {
    return { status: 200 };
  }),
  mockapi.patch("/six", (req) => {
    return { status: 200 };
  }),
]);
