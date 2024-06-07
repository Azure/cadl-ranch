import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Parameters_Spread_Model_spreadAsRequestBody = passOnSuccess(
  mockapi.put("/parameters/spread/model/request-body", (req) => {
    req.expect.bodyEquals({ name: "foo" });
    return { status: 204 };
  }),
);

Scenarios.Parameters_Spread_Model_spreadCompositeRequestOnlyWithBody = passOnSuccess(
  mockapi.put("/parameters/spread/model/composite-request-only-with-body", (req) => {
    req.expect.bodyEquals({ name: "foo" });
    return { status: 204 };
  }),
);

Scenarios.Parameters_Spread_Model_spreadCompositeRequestWithoutBody = passOnSuccess(
  mockapi.put("/parameters/spread/model/composite-request-without-body/foo", (req) => {
    req.expect.containsHeader("test-header", "bar");
    return { status: 204 };
  }),
);

Scenarios.Parameters_Spread_Model_spreadCompositeRequest = passOnSuccess(
  mockapi.put("/parameters/spread/model/composite-request/foo", (req) => {
    req.expect.containsHeader("test-header", "bar");
    req.expect.bodyEquals({ name: "foo" });
    return { status: 204 };
  }),
);

Scenarios.Parameters_Spread_Model_spreadCompositeRequestMix = passOnSuccess(
  mockapi.put("/parameters/spread/model/composite-request-mix/foo", (req) => {
    req.expect.containsHeader("test-header", "bar");
    req.expect.bodyEquals({ prop: "foo" });
    return { status: 204 };
  }),
);

Scenarios.Parameters_Spread_Alias_spreadAsRequestBody = passOnSuccess(
  mockapi.put("/parameters/spread/alias/request-body", (req) => {
    req.expect.bodyEquals({ name: "foo" });
    return { status: 204 };
  }),
);

Scenarios.Parameters_Spread_Alias_spreadAsRequestParameter = passOnSuccess(
  mockapi.put("/parameters/spread/alias/request-parameter/1", (req) => {
    req.expect.containsHeader("x-ms-test-header", "bar");
    req.expect.bodyEquals({ name: "foo" });
    return { status: 204 };
  }),
);

Scenarios.Parameters_Spread_Alias_spreadWithMultipleParameters = passOnSuccess(
  mockapi.put("/parameters/spread/alias/multiple-parameters/1", (req) => {
    req.expect.containsHeader("x-ms-test-header", "bar");
    req.expect.bodyEquals({
      prop1: "foo1",
      prop2: "foo2",
      prop3: "foo3",
      prop4: "foo4",
      prop5: "foo5",
      prop6: "foo6",
    });
    return { status: 204 };
  }),
);

Scenarios.Parameters_Spread_Alias_spreadAliasWithModel = passOnSuccess(
  mockapi.put("/parameters/spread/alias/request-with-model/1", (req) => {
    req.expect.containsHeader("x-ms-test-header", "bar");
    req.expect.bodyEquals({ name: "foo" });
    return { status: 204 };
  }),
);

Scenarios.Parameters_Spread_Alias_spreadAliasWithoutOptionalProps = passOnSuccess(
  mockapi.put("/parameters/spread/alias/spread-Alias-With-Optional-Props/1", (req) => {
    req.expect.containsHeader("x-ms-test-header", "bar");
    const spreadAliasWithoutOptionalPropRequest = {
      name: "dog",
      items: [1, 2, 3],
    };
    req.expect.bodyEquals(spreadAliasWithoutOptionalPropRequest);
    return { status: 204 };
  }),
);

Scenarios.Parameters_Spread_Alias_spreadAliasWithOptionalProps = passOnSuccess(
  mockapi.put("/parameters/spread/alias/spread-Alias-With-Optional-Props/2", (req) => {
    req.expect.containsHeader("x-ms-test-header", "bar");
    const spreadAliasWithOptionalPropRequest = {
      name: "dog",
      color: "red",
      age: 3,
      items: [1, 2, 3, 4],
      elements: ["a", "b"],
    };
    req.expect.bodyEquals(spreadAliasWithOptionalPropRequest);
    return { status: 204 };
  }),
);

Scenarios.Parameters_Spread_Alias_spreadAliasWithOptionalCollections = passOnSuccess(
  mockapi.put("/parameters/spread/alias/spread-Alias-With-Optional-Collections", (req) => {
    const spreadAliasWithRequiredAndOptionalCollections = {
      requiredStringList: ["a", "b"],
      optionalStringList: ["c", "d"],
    };
    req.expect.bodyEquals(spreadAliasWithRequiredAndOptionalCollections);
    return {
      status: 204,
    };
  }),
);
