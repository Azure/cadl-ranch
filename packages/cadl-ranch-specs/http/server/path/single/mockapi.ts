import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Server_Path_Single_myOp = passOnSuccess(
  mockapi.head("/server/path/single/myOp", (req) => {
    return { status: 200 };
  }),
);

Scenarios.Server_Path_Single_MyOp = passOnSuccess({
  uri: "/server/path/single/myOp",
  mockMethods: [
    {
      method: "head",
      request: {},
      response: {
        status: 200,
      },
    },
  ],
});
