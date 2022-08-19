import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.MultiInterfaceClient_dogs_getDogs = passOnSuccess(
  mockapi.get("/dogs", (_) => {
    return {
      status: 200,
      body: json({ name: "dog name" }),
    };
  }),
);

Scenarios.MultiInterfaceClient_dogs_setDogs = passOnSuccess(
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
  }),
);

Scenarios.MultiInterfaceClient_cats_getCats = passOnSuccess(
  mockapi.get("/cats", (_) => {
    return {
      status: 200,
      body: json({ name: "cat name" }),
    };
  }),
);

Scenarios.MultiInterfaceClient_cats_setCats = passOnSuccess(
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
  }),
);
