import { passOnSuccess, mockapi, ValidationError, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Internal_getInternal = passOnSuccess(
  mockapi.get("/internal/getInternal", (req) => {
    if (!("name" in req.query)) {
      throw new ValidationError("Should submit name query", "any string", undefined);
    }
    return {
      status: 200,
      body: json({ name: req.query["name"] }),
    };
  }),
);

Scenarios.Internal_postInternal = passOnSuccess(
  mockapi.post("/internal/postInternal", (req) => {
    if (req.body["id"] !== 1) {
      throw new ValidationError("Should submit body id", "1", undefined);
    }
    if (!("name" in req.body)) {
      throw new ValidationError("Should submit body name", "any string", undefined);
    }
    return {
      status: 200,
      body: json({ id: 1, name: req.body["name"] }),
    };
  }),
);
