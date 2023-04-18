import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Parameters_CollectionFormat_Query_multi = passOnSuccess(
  mockapi.get("/parameters/collection-format/query/multi", (req) => {
    req.expect.containsQueryParam("colors", ["blue", "red", "green"], "multi");
    return {
      status: 204,
    };
  }),
);

Scenarios.Parameters_CollectionFormat_Query_csv = passOnSuccess(
  mockapi.get("/parameters/collection-format/query/csv", (req) => {
    req.expect.containsQueryParam("colors", ["blue", "red", "green"], "csv");
    return {
      status: 204,
    };
  }),
);

Scenarios.Parameters_CollectionFormat_Query_ssv = passOnSuccess(
  mockapi.get("/parameters/collection-format/query/ssv", (req) => {
    req.expect.containsQueryParam("colors", ["blue", "red", "green"], "ssv");
    return {
      status: 204,
    };
  }),
);

Scenarios.Parameters_CollectionFormat_Query_tsv = passOnSuccess(
  mockapi.get("/parameters/collection-format/query/tsv", (req) => {
    req.expect.containsQueryParam("colors", ["blue", "red", "green"], "tsv");
    return {
      status: 204,
    };
  }),
);

Scenarios.Parameters_CollectionFormat_Query_pipes = passOnSuccess(
  mockapi.get("/parameters/collection-format/query/pipes", (req) => {
    req.expect.containsQueryParam("colors", ["blue", "red", "green"], "pipes");
    return {
      status: 204,
    };
  }),
);

Scenarios.Parameters_CollectionFormat_Header_csv = passOnSuccess(
  mockapi.get("/parameters/collection-format/header/csv", (req) => {
    req.expect.containsHeader("colors", "blue,red,green");
    return {
      status: 204,
    };
  }),
);
