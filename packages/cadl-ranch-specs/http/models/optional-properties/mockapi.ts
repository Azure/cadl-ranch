import { passOnSuccess, mockapi, ValidationError, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.OptionalProperties_sendOptionalPropertyModel = passOnSuccess(
  mockapi.post("/optional-properties", (req) => {
    checkPropertyValid(req.body);
    return {
      status: 200,
    };
  }),
);

Scenarios.OptionalProperties_getOptionalPropertyModel = passOnSuccess(
  mockapi.get("/optional-properties", (_) => {
    return {
      status: 200,
      body: json({ optionalString: "optional string", optionalIntList: [1, 2] }),
    };
  }),
);

Scenarios.OptionalProperties_setOptionalPropertyModel = passOnSuccess(
  mockapi.put("/optional-properties", (req) => {
    checkPropertyValid(req.body);
    return {
      status: 200,
      body: json(req.body),
    };
  }),
);

function checkPropertyValid(body: any): void {
  const invalidProperty = Object.keys(body).find(
    (property) => !["optionalString", "optionalInt", "optionalStringList", "optionalIntList"].includes(property),
  );
  if (invalidProperty != undefined) {
    throw new ValidationError("Invalid property name.", null, invalidProperty);
  }

  if (body["optionalStringList"]) {
    if (!Array.isArray(body["optionalStringList"])) {
      throw new ValidationError("Value of optionalStringList should be an array", null, null);
    }
  }

  if (body["optionalIntList"]) {
    if (!Array.isArray(body["optionalIntList"])) {
      throw new ValidationError("Value of optionalIntList should be an array", null, null);
    }
  }
}
