import { passOnSuccess, mockapi, json, MockApi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

function createQueryMockApis(route: string, value: any): MockApi {
  const url = `/encode/duration/query/${route}`;
  return mockapi.get(url, (req) => {
    req.expect.containsQueryParam("input", value);
    return {
      status: 204,
    };
  });
}

function createPropertyMockApis(route: string, value: any): MockApi {
  const url = `/encode/duration/property/${route}`;
  return mockapi.get(url, (req) => {
    req.expect.coercedBodyEquals({ value: value });
    return {
      status: 200,
      body: json({ value: value }),
    };
  });
}

Scenarios.Encode_Duration_Query_default = passOnSuccess(createQueryMockApis("default", "P40D"));
Scenarios.Encode_Duration_Query_iso8601 = passOnSuccess(createQueryMockApis("iso8601", "P40D"));
Scenarios.Encode_Duration_Query_int32_seconds = passOnSuccess(createQueryMockApis("int32_seconds", "36"));
Scenarios.Encode_Duration_Query_float_seconds = passOnSuccess(createQueryMockApis("float_seconds", "35.621"));

Scenarios.Encode_Duration_Property_default = passOnSuccess(createPropertyMockApis("default", "P40D"));
Scenarios.Encode_Duration_Property_iso8601 = passOnSuccess(createPropertyMockApis("iso8601", "P40D"));
Scenarios.Encode_Duration_Property_int32_seconds = passOnSuccess(createPropertyMockApis("int32_seconds", 36));
Scenarios.Encode_Duration_Property_float_seconds = passOnSuccess(createPropertyMockApis("float_seconds", 35.621));
