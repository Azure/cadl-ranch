import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Parameters_QueryOptionality_fromrequired = passOnSuccess(
  mockapi.head("/parameters/query-optionality/fromrequired", (req) => {
    req.expect.containsQueryParam("api-version", "2022-12-01-preview");
    req.expect.containsQueryParam("start", "required");
    return { status: 204 };
  }),
);

Scenarios.Parameters_QueryOptionality_fromoptional = passOnSuccess(
  mockapi.head("/parameters/query-optionality/fromoptional", (req) => {
    req.expect.containsQueryParam("end", "required");
    return { status: 204 };
  }),
);
