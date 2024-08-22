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

Scenarios.SpecialHeaders_ConditionalRequest_postIfModified = passOnSuccess(
  mockapi.post("/special-headers/conditional-request/if-modified-since", (req) => {
    req.expect.containsHeader("if-modified-since", 'Fri, 26 Aug 2022 14:38:00 GMT');
    return {
      status: 204,
    };
  }),
);


Scenarios.SpecialHeaders_ConditionalRequest_postIfUnmodified = passOnSuccess(
  mockapi.post("/special-headers/conditional-request/if-unmodified-since", (req) => {
    req.expect.containsHeader("if-unmodified-since", 'Fri, 26 Aug 2022 14:38:00 GMT');
    return {
      status: 204,
    };
  }),
);
