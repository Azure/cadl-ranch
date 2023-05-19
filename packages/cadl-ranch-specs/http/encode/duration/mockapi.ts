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
  return mockapi.post(url, (req) => {
    req.expect.coercedBodyEquals({ value: value });
    return {
      status: 200,
      body: json({ value: value }),
    };
  });
}

function createHeaderMockApis(route: string, value: any): MockApi {
  const url = `/encode/duration/header/${route}`;
  return mockapi.get(url, (req) => {
    req.expect.containsHeader("duration", value);
    return {
      status: 204,
    };
  });
}

Scenarios.Encode_Duration_Query_default = passOnSuccess(createQueryMockApis("default", "P40D"));
Scenarios.Encode_Duration_Query_iso8601 = passOnSuccess(createQueryMockApis("iso8601", "P40D"));
Scenarios.Encode_Duration_Query_int32Seconds = passOnSuccess(createQueryMockApis("int32-seconds", "36"));
Scenarios.Encode_Duration_Query_floatSeconds = passOnSuccess(createQueryMockApis("float-seconds", "35.621"));

Scenarios.Encode_Duration_Property_default = passOnSuccess(createPropertyMockApis("default", "P40D"));
Scenarios.Encode_Duration_Property_iso8601 = passOnSuccess(createPropertyMockApis("iso8601", "P40D"));
Scenarios.Encode_Duration_Property_int32Seconds = passOnSuccess(createPropertyMockApis("int32-seconds", 36));
Scenarios.Encode_Duration_Property_floatSeconds = passOnSuccess(createPropertyMockApis("float-seconds", 35.621));
Scenarios.Encode_Duration_Property_floatSecondsArray = passOnSuccess(
  createPropertyMockApis("float-seconds", [35.621, 46.781]),
);

Scenarios.Encode_Duration_Header_default = passOnSuccess(createHeaderMockApis("default", "P40D"));
Scenarios.Encode_Duration_Header_iso8601 = passOnSuccess(createHeaderMockApis("iso8601", "P40D"));
Scenarios.Encode_Duration_Header_int32Seconds = passOnSuccess(createHeaderMockApis("int32-seconds", "36"));
Scenarios.Encode_Duration_Header_floatSeconds = passOnSuccess(createHeaderMockApis("float-seconds", "35.621"));
