import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.CollectionFormat_testMulti = passOnSuccess(
  mockapi.get("/collectionFormat/multi", (req) => {
    if (req.originalRequest.originalUrl.includes("colors=blue&colors=red&colors=green")) {
      return {
        status: 200,
        body: json({ message: `A multi collection format array was successfully received` }),
      };
    } else {
      return {
        status: 400,
        body: json({ message: `Expected colors=blue&colors=red&colors=green after serialization` }),
      };
    }
  }),
);

Scenarios.CollectionFormat_testCsv = passOnSuccess(
  mockapi.get("/collectionFormat/csv", (req) => {
    if (
      req.originalRequest.originalUrl.includes("colors=blue,red,green") ||
      req.originalRequest.originalUrl.includes("colors=blue%2Cred%2Cgreen")
    ) {
      return {
        status: 200,
        body: json({ message: `A multi collection format array was successfully received` }),
      };
    } else {
      return {
        status: 400,
        body: json({ message: `Expected colors=blue,red,green or colors=blue%2Cred%2Cgreen after serialization` }),
      };
    }
  }),
);

// Scenarios.CollectionFormat_testDefault = passOnSuccess(
//   mockapi.get("/collectionFormat/default", (req) => {
//     if (req.originalRequest.originalUrl.includes("colors=blue&colors=red&colors=green")) {
//       return {
//         status: 200,
//         body: json({ message: `A default multi collection format array was successfully received` }),
//       };
//     } else {
//       return {
//         status: 400,
//         body: json({ message: `Expected colors=blue&colors=red&colors=green after serialization` }),
//       };
//     }
//   }),
// );

Scenarios.CollectionFormat_testCsvHeader = passOnSuccess(
  mockapi.get("/collectionFormat/csvHeader", (req) => {
      req.expect.containsHeader("colors", "blue,red,green");
      return {
          status: 200,
          body: json({ message: `A csv collection format array as header was successfully received` }),
        };
  }),
);

Scenarios.CollectionFormat_testDefaultHeader = passOnSuccess(
  mockapi.get("/collectionFormat/defaultHeader", (req) => {
      req.expect.containsHeader("colors", "blue,red,green");
      return {
          status: 200,
          body: json({ message: `A default collection format array as header was successfully received` }),
        };
  }),
);