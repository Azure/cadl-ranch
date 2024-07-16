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
      requiredString: "foo",
      optionalInt: 1,
      requiredIntList: [1, 2],
      optionalStringList: ["foo", "bar"],
    });
    return { status: 204 };
  }),
);

Scenarios.Parameters_Spread_Alias_spreadAsInnerModelParameter = passOnSuccess(
  mockapi.post("/parameters/spread/alias/inner-model-parameter/1", (req) => {
    req.expect.containsHeader("x-ms-test-header", "bar");
    req.expect.bodyEquals({ name: "foo" });
    return { status: 204 };
  }),
);

Scenarios.Parameters_Spread_Alias_spreadAsInnerAliasParameter = passOnSuccess(
  mockapi.post("/parameters/spread/alias/inner-alias-parameter/1", (req) => {
    req.expect.containsHeader("x-ms-test-header", "bar");
    req.expect.bodyEquals({ name: "foo", age: 1 });
    return { status: 204 };
  }),
);
