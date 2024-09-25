import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Parameters_QueryOptionality_OrderingWithRequiredStart = passOnSuccess(
  mockapi.head("/parameters/query-optionality/startwithrequired", (req) => {
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    req.expect.containsQueryParam("start", "required");
    return { status: 204 };
  }),
);

Scenarios.Parameters_QueryOptionality_OrderingWithOptionalStart = passOnSuccess(
  mockapi.head("/parameters/query-optionality/startwithoptional", (req) => {
    req.expect.containsQueryParam("end", "required");
    return { status: 204 };
  }),
);
