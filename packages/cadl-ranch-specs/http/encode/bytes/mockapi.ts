import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Encode_Bytes_query = passOnSuccess(
  mockapi.get("/encode/bytes/query", (req) => {
    req.expect.containsQueryParam("default", "dGVzdA==");
    req.expect.containsQueryParam("base64", "dGVzdA==");
    req.expect.containsQueryParam("base64url", "dGVzdA");
    req.expect.containsQueryParam("base64-array", ["dGVzdA==", "dGVzdA=="], "csv");
    return {
      status: 204,
    };
  }),
);

Scenarios.Encode_Bytes_property = passOnSuccess(
  mockapi.post("/encode/bytes/property", (req) => {
    const body = {
      default: "dGVzdA==",
      base64: "dGVzdA==",
      base64url: "dGVzdA",
      base64Array: ["dGVzdA==", "dGVzdA=="],
    };
    req.expect.coercedBodyEquals(body);
    return {
      status: 200,
      body: json(body),
    };
  }),
);

Scenarios.Encode_Bytes_header = passOnSuccess(
  mockapi.get("/encode/bytes/header", (req) => {
    req.expect.containsHeader("default", "dGVzdA==");
    req.expect.containsHeader("base64", "dGVzdA==");
    req.expect.containsHeader("base64url", "dGVzdA");
    req.expect.containsHeader("base64-array", "dGVzdA==,dGVzdA==");
    return {
      status: 204,
    };
  }),
);
