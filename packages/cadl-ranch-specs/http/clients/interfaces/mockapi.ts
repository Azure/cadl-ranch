import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.getDogs = passOnSuccess(
  mockapi.get("/dogs", (_) => {
    return {
      status: 200,
      body: json({ name: "dog name" })
    };
  })
);

Scenarios.setDogs = passOnSuccess(
  mockapi.put("/dogs", (req) => {
    if (req.body["name"]) {
      return {
        status: 200,
        body: json(req.body),
      };
    } else {
      return {
        status: 400,
        body: json({ message: `Expected required parameter "name"` }),
      };
    }
  })
);

Scenarios.getCats = passOnSuccess(
  mockapi.get("/cats", (_) => {
    return {
      status: 200,
      body: json({ name: "cat name" })
    };
  })
);

Scenarios.setCats = passOnSuccess(
  mockapi.put("/cats", (req) => {
    if (req.body["name"]) {
      return {
        status: 200,
        body: json(req.body),
      };
    } else {
      return {
        status: 400,
        body: json({ message: `Expected required parameter "name"` }),
      };
    }
  })
);