import { passOnSuccess, mockapi, ValidationError, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Azure_ClientGenerator_Core_Internal_getInternal = passOnSuccess(
  mockapi.get("/azure/client-generator-core/internal/getInternal", (req) => {
    if (!("name" in req.query)) {
      throw new ValidationError("Should submit name query", "any string", undefined);
    }
    return {
      status: 200,
      body: json({ name: req.query["name"] }),
    };
  }),
);

Scenarios.Azure_ClientGenerator_Core_Internal_postInternal = passOnSuccess(
  mockapi.post("/azure/client-generator-core/internal/postInternal", (req) => {
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
