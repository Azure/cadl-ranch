import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.HttpMethod_Head204 = passOnSuccess(
  mockapi.head("/http-method/head/204/valid", (req) => {
    return { status: 204 };
  }),
);

Scenarios.HttpMethod_Head404 = passOnSuccess(
  mockapi.head("/http-method/head/404/invalid", (req) => {
    return {
      status: 404,
      body: json({ message: `Not Found.` }),
    };
  }),
);
