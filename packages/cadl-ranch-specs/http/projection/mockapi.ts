import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Projection_JSON = passOnSuccess(
  mockapi.post("/projection/json", (req) => {
    req.expect.bodyEquals({ codegen: "DPG" });
    return {
      status: 204,
    };
  }),
);

Scenarios.Projection_Client = passOnSuccess(
  mockapi.post("/projection/client", (req) => {
    req.expect.bodyEquals({ builtfrom: "DPG" });
    return {
      status: 204,
    };
  }),
);

Scenarios.Projection_JSON = passOnSuccess(
  mockapi.post("/projection/language", (req) => {
    req.expect.bodyEquals({ wasMadeFor: "customers" });
    return {
      status: 204,
    };
  }),
);
