import { passOnSuccess, ScenarioMockApi, mockapi, json } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Basic_Input = passOnSuccess(
    mockapi.get("/models/basic", (req) => {
      if (req.body && req.body["requiredString"] && req.body["requiredInt"]) {
          return {
            status: 200,
            body: json({ message: `InputModel was successfully returned` }),
          };
        } else {
          return {
            status: 400,
            body: json({ message: `Expected InputModel parameter with required fields` }),
          };
        }
    }),
);