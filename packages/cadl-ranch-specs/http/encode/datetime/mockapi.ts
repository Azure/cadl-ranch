import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Encode_Datetime_query = passOnSuccess(
  mockapi.get("/encode/datetime/query", (req) => {
    req.expect.containsQueryParam("default", "2022-08-26T18:38:00.000Z");
    req.expect.containsQueryParam("rfc3339", "2022-08-26T18:38:00.000Z");
    req.expect.containsQueryParam("rfc7231", "Fri, 26 Aug 2022 14:38:00 GMT");
    req.expect.containsQueryParam("unix-timestamp", "1686566864");
    req.expect.containsQueryParam("rfc3339-array", ["2022-08-26T18:38:00.000Z", "2022-09-26T18:38:00.000Z"], "csv");
    return {
      status: 204,
    };
  }),
);

Scenarios.Encode_Datetime_property = passOnSuccess(
  mockapi.post("/encode/datetime/property", (req) => {
    const body = {
      default: "2022-08-26T18:38:00.000Z",
      rfc3339: "2022-08-26T18:38:00.000Z",
      rfc7231: "Fri, 26 Aug 2022 14:38:00 GMT",
      unixTimestamp: 1686566864,
      rfc3339Array: ["2022-08-26T18:38:00.000Z", "2022-09-26T18:38:00.000Z"],
    };
    req.expect.coercedBodyEquals(body);
    return {
      status: 200,
      body: json(body),
    };
  }),
);

Scenarios.Encode_Datetime_header = passOnSuccess(
  mockapi.get("/encode/datetime/header", (req) => {
    req.expect.containsHeader("default", "Fri, 26 Aug 2022 14:38:00 GMT");
    req.expect.containsHeader("rfc3339", "2022-08-26T18:38:00.000Z");
    req.expect.containsHeader("rfc7231", "Fri, 26 Aug 2022 14:38:00 GMT");
    req.expect.containsHeader("unix-timestamp", "1686566864");
    req.expect.containsHeader("rfc3339-array", "2022-08-26T18:38:00.000Z,2022-09-26T18:38:00.000Z");
    return {
      status: 204,
    };
  }),
);
