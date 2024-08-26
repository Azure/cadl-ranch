import { passOnSuccess, mockapi, json, MockApi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

function createPropertyMockApis(route: string, value: string): MockApi {
  const url = `/encode/numeric/property/${route}`;
  return mockapi.post(url, (req) => {
    req.expect.coercedBodyEquals({ value: value });
    return {
      status: 200,
      body: json({ value: value }),
    };
  });
}

Scenarios.Encode_Numeric_Property_safeintAsString = passOnSuccess(createPropertyMockApis("safeint", "10000000000"));

Scenarios.Encode_Numeric_Property_uint32AsStringOptional = passOnSuccess(createPropertyMockApis("uint32", "1"));

Scenarios.Encode_Numeric_Property_uint8AsStringOptional = passOnSuccess(createPropertyMockApis("uint8", "255"));
