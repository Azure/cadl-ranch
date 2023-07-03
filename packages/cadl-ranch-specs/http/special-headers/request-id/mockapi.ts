import { passOnSuccess, ScenarioMockApi, mockapi, validateValueFormat, MockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

function createGetMockApis(route: string, header: string): MockApi {
  const url = `/special-headers/request-id/${route}`;
  return mockapi.get(url, (req) => {
    validateValueFormat(req.headers[header], "uuid");
    return {
      status: 204,
      headers: {
        [header]: req.headers[header],
      },
    };
  });
}

Scenarios.SpecialHeaders_RequestId_DefaultClient_default = passOnSuccess(
  createGetMockApis("default", "x-ms-client-request-id"),
);
Scenarios.SpecialHeaders_RequestId_StandardClient_standard = passOnSuccess(
  createGetMockApis("standard", "x-ms-client-request-id"),
);
Scenarios.SpecialHeaders_RequestId_NonStandardClient_nonStandard = passOnSuccess(
  createGetMockApis("non-standard", "client-request-id"),
);
