import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Spread_spreadModelAsRequestBody = passOnSuccess(
  mockapi.put("/spread/model/request-body", (req) => {
    req.expect.bodyEquals({ name: "foo" });
    return { status: 200 };
  }),
);

Scenarios.Spread_spreadAliasAsRequestBody = passOnSuccess(
  mockapi.put("/spread/alias/request-body", (req) => {
    req.expect.bodyEquals({ name: "foo" });
    return { status: 200 };
  }),
);

Scenarios.Spread_spreadAliasAsRequestParameter = passOnSuccess(
  mockapi.put("/spread/alias/request-parameter/1", (req) => {
    req.expect.containsHeader("x-ms-test-header", "bar");
    req.expect.bodyEquals({ name: "foo" });
    return { status: 200 };
  }),
);

Scenarios.Spread_spreadAliasWithMultipleParameters = passOnSuccess(
  mockapi.put("/spread/alias/multiple-parameters/1", (req) => {
    req.expect.containsHeader("x-ms-test-header", "bar");
    req.expect.bodyEquals({
      prop1: "foo1",
      prop2: "foo2",
      prop3: "foo3",
      prop4: "foo4",
      prop5: "foo5",
      prop6: "foo6",
    });
    return { status: 200 };
  }),
);
