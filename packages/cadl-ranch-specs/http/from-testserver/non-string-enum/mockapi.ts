import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Int_put = passOnSuccess(
  mockapi.put("/nonStringEnums/int/put", (req) => {
    if (req.body == "200") {
      return { status: 200, body: json("Nice job posting an int enum") };
    } else {
      return { status: 400, body: json("Did not receive what I was expecting") };
    }
  }),
);

Scenarios.Int_get = passOnSuccess(
  mockapi.get("/nonStringEnums/int/get", () => {
    return { status: 200, body: json(429) };
  }),
);

Scenarios.Float_put = passOnSuccess(
  mockapi.put("/nonStringEnums/float/put", (req) => {
    if (req.body == "200.4") {
      return { status: 200, body: json("Nice job posting a float enum") };
    } else {
      return { status: 400, body: json("Did not receive what I was expecting") };
    }
  }),
);

Scenarios.Float_get = passOnSuccess(
  mockapi.get("/nonStringEnums/float/get", () => {
    return { status: 200, body: json(429.1) };
  }),
);
