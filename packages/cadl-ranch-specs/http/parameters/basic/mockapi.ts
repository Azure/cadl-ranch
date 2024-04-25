import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Parameters_Basic_ExplicitBody_simple = passOnSuccess(
  mockapi.put("/parameters/basic/explicit-body/simple", (req) => {
    req.expect.bodyEquals({ name: "foo" });
    return { status: 204 };
  }),
);

Scenarios.Parameters_Basic_ImplicitBody_simple = passOnSuccess(
  mockapi.put("/parameters/basic/implicit-body/simple", (req) => {
    req.expect.bodyEquals({ name: "foo" });
    return { status: 204 };
  }),
);
