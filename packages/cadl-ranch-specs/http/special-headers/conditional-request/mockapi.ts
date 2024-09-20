import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.SpecialHeaders_ConditionalRequest_postIfMatch = passOnSuccess(
  mockapi.post("/special-headers/conditional-request/if-match", (req) => {
    req.expect.containsHeader("if-match", '"valid"');
    return {
      status: 204,
    };
  }),
);

Scenarios.SpecialHeaders_ConditionalRequest_postIfNoneMatch = passOnSuccess(
  mockapi.post("/special-headers/conditional-request/if-none-match", (req) => {
    req.expect.containsHeader("if-none-match", '"invalid"');
    return {
      status: 204,
    };
  }),
);

Scenarios.Special_Headers_Conditional_Request_If_Match = passOnSuccess({
  uri: "/special-headers/conditional-request/if-match",
  mockMethods: [
    {
      method: "post",
      request: {
        config: {
          headers: {
            "if-match": '\\"valid\\"',
          },
        },
      },
      response: {
        status: 204,
      },
    },
  ],
});

Scenarios.Special_Headers_Conditional_Request_If_None_Match = passOnSuccess({
  uri: "/special-headers/conditional-request/if-none-match",
  mockMethods: [
    {
      method: "post",
      request: {
        config: {
          headers: {
            "if-none-match": '\\"invalid\\"',
          },
        },
      },
      response: {
        status: 204,
      },
    },
  ],
});
