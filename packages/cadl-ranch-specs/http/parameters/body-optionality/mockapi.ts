import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Parameters_BodyOptionality_requiredExplicit = passOnSuccess(
  mockapi.post("/parameters/body-optionality/required-explicit", (req) => {
    req.expect.bodyEquals({ name: "foo" });
    return { status: 204 };
  }),
);

Scenarios.Parameters_BodyOptionality_OptionalExplicit = passOnSuccess([
  mockapi.post("/parameters/body-optionality/optional-explicit/set", (req) => {
    req.expect.bodyEquals({ name: "foo" });
    return { status: 204 };
  }),
  mockapi.post("/parameters/body-optionality/optional-explicit/omit", (req) => {
    req.expect.rawBodyEquals(undefined);
    return { status: 204 };
  }),
]);

Scenarios.Parameters_BodyOptionality_requiredImplicit = passOnSuccess(
  mockapi.post("/parameters/body-optionality/required-implicit", (req) => {
    req.expect.bodyEquals({ name: "foo" });
    return { status: 204 };
  }),
);
