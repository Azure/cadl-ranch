import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const validBody = { "for": "abc", "bytes": "efg", "discriminator.property": "A" };
Scenarios.SpecialCharacterModels_setDerivedClass = passOnSuccess(
  mockapi.put("/special-chars/models", (req) => {
    req.expect.bodyEquals(validBody);
    return { status: 200, body: json(validBody) };
  }),
);
