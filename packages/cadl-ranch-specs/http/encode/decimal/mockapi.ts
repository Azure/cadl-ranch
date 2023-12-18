import { passOnSuccess, mockapi, json, MockApi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

function createPropertyMockApis(route: string, value: any): MockApi {
  const url = `/encode/decimal/property/${route}`;
  return mockapi.post(url, (req) => {
    req.expect.coercedBodyEquals({ value: value });
    return {
      status: 200,
      body: json({ value: value }),
    };
  });
}

Scenarios.Encode_Decimal_Property_default = passOnSuccess(createPropertyMockApis("default", 0.6666));
Scenarios.Encode_Decimal_Property_string = passOnSuccess(createPropertyMockApis("string", "0.6666"));
Scenarios.Encode_Decimal_Property_stringDecimalArray = passOnSuccess(
  createPropertyMockApis("string-decimal-array", ["0.6666", "0.3333"]),
);
