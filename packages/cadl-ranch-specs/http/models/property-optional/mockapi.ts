import { passOnSuccess, ScenarioMockApi, mockapi, json, MockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

interface MockApiGetPut {
  get: MockApi;
  put: MockApi;
}

/**
 * Return the get and put operations
 * @param route The route within /models/properties/optional/all/ for your function.
 * @param body The body you are expecting and will return.
 */
function createMockApis(route: string, body: any): MockApiGetPut {
  const url = `/models/properties/optional/${route}`;
  console.log(url);
  return {
    get: mockapi.get(url, (req) => {
      return {
        status: 200,
        body: json(body),
      };
    }),
    put: mockapi.put(url, (req) => {
      req.expect.bodyEquals(body);
      return {
        status: 204,
      };
    }),
  };
}

const allOptionalRequiredAndOptional = createMockApis("all/requiredAndOptional", {
  optionalString: "hello",
  optionalInt: 42,
  optionalStringList: ["hello", "world"],
  optionalIntList: [1, 2],
});
Scenarios.Optional_AllOptional_get = passOnSuccess(allOptionalRequiredAndOptional.get);
Scenarios.Optional_AllOptional_put = passOnSuccess(allOptionalRequiredAndOptional.put);

const allOptionalRequiredOnly = createMockApis("all/requiredOnly", {});
Scenarios.Optional_AllOptional_get_required_only = passOnSuccess(allOptionalRequiredOnly.get);
Scenarios.Optional_AllOptional_put_required_only = passOnSuccess(allOptionalRequiredOnly.put);

const someOptionalRequiredAndOptional = createMockApis("some/requiredAndOptional", {
  optionalString: "hello",
  requiredInt: 42,
  requiredStringList: ["hello", "world"],
  optionalIntList: [1, 2],
});
Scenarios.Optional_SomeOptional_get = passOnSuccess(someOptionalRequiredAndOptional.get);
Scenarios.Optional_SomeOptional_put = passOnSuccess(someOptionalRequiredAndOptional.put);

const someOptionalRequiredOnly = createMockApis("some/requiredOnly", {
  requiredInt: 42,
  requiredStringList: ["hello", "world"],
});
Scenarios.Optional_SomeOptional_get_required_only = passOnSuccess(someOptionalRequiredOnly.get);
Scenarios.Optional_SomeOptional_put_required_only = passOnSuccess(someOptionalRequiredOnly.put);
