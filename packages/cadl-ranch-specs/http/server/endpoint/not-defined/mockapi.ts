import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Server_Endpoint_NotDefined_valid = passOnSuccess(
  mockapi.head("/server/endpoint/not-defined/valid", (req) => {
    return { status: 200 };
  }),
);

Scenarios.Server_Endpoint_Not_Defined_Valid = passOnSuccess({
  uri: "/server/endpoint/not-defined/valid",
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
