import { passOnSuccess, mockapi, json, CollectionFormat, MockApi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

function createQueryMockApis(route: string, value: any, collectionFormat?: CollectionFormat): MockApi {
  const url = `/encode/bytes/query/${route}`;
  return mockapi.get(url, (req) => {
    req.expect.containsQueryParam("value", value, collectionFormat);
    return {
      status: 204,
    };
  });
}

function createPropertyMockApis(route: string, value: any): MockApi {
  const url = `/encode/bytes/property/${route}`;
  return mockapi.post(url, (req) => {
    req.expect.coercedBodyEquals({ value: value });
    return {
      status: 200,
      body: json({ value: value }),
    };
  });
}

function createHeaderMockApis(route: string, value: any): MockApi {
  const url = `/encode/bytes/header/${route}`;
  return mockapi.get(url, (req) => {
    req.expect.containsHeader("value", value);
    return {
      status: 204,
    };
  });
}

Scenarios.Encode_Bytes_Query_default = passOnSuccess(createQueryMockApis("default", "dGVzdA=="));
Scenarios.Encode_Bytes_Query_base64 = passOnSuccess(createQueryMockApis("base64", "dGVzdA=="));
Scenarios.Encode_Bytes_Query_base64url = passOnSuccess(createQueryMockApis("base64url", "dGVzdA"));
Scenarios.Encode_Bytes_Query_base64urlArray = passOnSuccess(
  createQueryMockApis("base64url-array", ["dGVzdA", "dGVzdA"], "csv"),
);

Scenarios.Encode_Bytes_Property_default = passOnSuccess(createPropertyMockApis("default", "dGVzdA=="));
Scenarios.Encode_Bytes_Property_base64 = passOnSuccess(createPropertyMockApis("base64", "dGVzdA=="));
Scenarios.Encode_Bytes_Property_base64url = passOnSuccess(createPropertyMockApis("base64url", "dGVzdA"));
Scenarios.Encode_Bytes_Property_base64urlArray = passOnSuccess(
  createPropertyMockApis("base64url-array", ["dGVzdA", "dGVzdA"]),
);

Scenarios.Encode_Bytes_Header_default = passOnSuccess(createHeaderMockApis("default", "dGVzdA=="));
Scenarios.Encode_Bytes_Header_base64 = passOnSuccess(createHeaderMockApis("base64", "dGVzdA=="));
Scenarios.Encode_Bytes_Header_base64url = passOnSuccess(createHeaderMockApis("base64url", "dGVzdA"));
Scenarios.Encode_Bytes_Header_base64urlArray = passOnSuccess(createHeaderMockApis("base64url-array", "dGVzdA,dGVzdA"));
