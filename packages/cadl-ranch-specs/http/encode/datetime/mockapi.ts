import { passOnSuccess, mockapi, json, CollectionFormat, MockApi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

function createQueryMockApis(route: string, value: any, collectionFormat?: CollectionFormat): MockApi {
  const url = `/encode/datetime/query/${route}`;
  return mockapi.get(url, (req) => {
    req.expect.containsQueryParam("value", value, collectionFormat);
    return {
      status: 204,
    };
  });
}

function createPropertyMockApis(route: string, value: any): MockApi {
  const url = `/encode/datetime/property/${route}`;
  return mockapi.post(url, (req) => {
    req.expect.coercedBodyEquals({ value: value });
    return {
      status: 200,
      body: json({ value: value }),
    };
  });
}

function createHeaderMockApis(route: string, value: any): MockApi {
  const url = `/encode/datetime/header/${route}`;
  return mockapi.get(url, (req) => {
    req.expect.containsHeader("value", value);
    return {
      status: 204,
    };
  });
}

Scenarios.Encode_Datetime_Query_default = passOnSuccess(createQueryMockApis("default", "2022-08-26T18:38:00.000Z"));
Scenarios.Encode_Datetime_Query_rfc3339 = passOnSuccess(createQueryMockApis("rfc3339", "2022-08-26T18:38:00.000Z"));
Scenarios.Encode_Datetime_Query_rfc7231 = passOnSuccess(
  createQueryMockApis("rfc7231", "Fri, 26 Aug 2022 14:38:00 GMT"),
);
Scenarios.Encode_Datetime_Query_unixTimestamp = passOnSuccess(createQueryMockApis("unix-timestamp", "1686566864"));
Scenarios.Encode_Datetime_Query_unixTimestampArray = passOnSuccess(
  createQueryMockApis("unix-timestamp-array", ["1686566864", "1686734256"], "csv"),
);

Scenarios.Encode_Datetime_Property_default = passOnSuccess(
  createPropertyMockApis("default", "2022-08-26T18:38:00.000Z"),
);
Scenarios.Encode_Datetime_Property_rfc3339 = passOnSuccess(
  createPropertyMockApis("rfc3339", "2022-08-26T18:38:00.000Z"),
);
Scenarios.Encode_Datetime_Property_rfc7231 = passOnSuccess(
  createPropertyMockApis("rfc7231", "Fri, 26 Aug 2022 14:38:00 GMT"),
);
Scenarios.Encode_Datetime_Property_unixTimestamp = passOnSuccess(createPropertyMockApis("unix-timestamp", 1686566864));
Scenarios.Encode_Datetime_Property_unixTimestampArray = passOnSuccess(
  createPropertyMockApis("unix-timestamp-array", [1686566864, 1686734256]),
);

Scenarios.Encode_Datetime_Header_default = passOnSuccess(
  createHeaderMockApis("default", "Fri, 26 Aug 2022 14:38:00 GMT"),
);
Scenarios.Encode_Datetime_Header_rfc3339 = passOnSuccess(createHeaderMockApis("rfc3339", "2022-08-26T18:38:00.000Z"));
Scenarios.Encode_Datetime_Header_rfc7231 = passOnSuccess(
  createHeaderMockApis("rfc7231", "Fri, 26 Aug 2022 14:38:00 GMT"),
);
Scenarios.Encode_Datetime_Header_unixTimestamp = passOnSuccess(createHeaderMockApis("unix-timestamp", "1686566864"));
Scenarios.Encode_Datetime_Header_unixTimestampArray = passOnSuccess(
  createHeaderMockApis("unix-timestamp-array", "1686566864,1686734256"),
);
