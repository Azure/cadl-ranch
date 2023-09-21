import { passOnSuccess, mockapi, json, CollectionFormat, MockApi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import { resolvePath } from "@typespec/compiler";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

const root = resolvePath(fileURLToPath(import.meta.url), "../../../../../");

const pngFile = readFileSync(resolvePath(root, "assets/image.png"));

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

function createRequestBodyMockApis(route: string, value: any, contentType: string = "application/json"): MockApi {
  const url = `/encode/bytes/body/request/${route}`;
  return mockapi.get(url, (req) => {
    req.expect.containsHeader("content-type", contentType);
    req.expect.rawBodyEquals(value);
    return {
      status: 204,
    };
  });
}

function createResponseBodyMockApis(route: string, value: any, contentType: string = "application/json"): MockApi {
  const url = `/encode/bytes/body/request/${route}`;
  return mockapi.get(url, (req) => {
    req.expect.rawBodyEquals(value);
    return {
      status: 204,
      body: {
        contentType: contentType,
        rawContent: value,
      },
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

Scenarios.Encode_Bytes_RequestBody_default = passOnSuccess(createRequestBodyMockApis("default", "dGVzdA=="));
Scenarios.Encode_Bytes_RequestBody_default = passOnSuccess(
  createRequestBodyMockApis("octet-stream", pngFile, "application/octet-stream"),
);
Scenarios.Encode_Bytes_RequestBody_default = passOnSuccess(
  createRequestBodyMockApis("custom-content-type", pngFile, "image/png"),
);
Scenarios.Encode_Bytes_RequestBody_base64 = passOnSuccess(createRequestBodyMockApis("base64", "dGVzdA=="));
Scenarios.Encode_Bytes_RequestBody_base64url = passOnSuccess(createRequestBodyMockApis("base64url", "dGVzdA"));

Scenarios.Encode_Bytes_RequestBody_default = passOnSuccess(createResponseBodyMockApis("default", "dGVzdA=="));
Scenarios.Encode_Bytes_ResponseBody_default = passOnSuccess(
  createResponseBodyMockApis("octet-stream", pngFile, "application/octet-stream"),
);
Scenarios.Encode_Bytes_ResponseBody_default = passOnSuccess(
  createResponseBodyMockApis("custom-content-type", pngFile, "image/png"),
);
Scenarios.Encode_Bytes_ResponseBody_base64 = passOnSuccess(createResponseBodyMockApis("base64", "dGVzdA=="));
Scenarios.Encode_Bytes_ResponseBody_base64url = passOnSuccess(createResponseBodyMockApis("base64url", "dGVzdA"));
