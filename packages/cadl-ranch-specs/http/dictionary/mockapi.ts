import { passOnSuccess, ScenarioMockApi, mockapi, json, MockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

interface MockApiGetPut {
  get: MockApi;
  put: MockApi;
}

/**
 * Return the get and put operations
 * @param route The route within /dictionary/types for your function.
 * @param value The value you are expecting and will return.
 */
function createModelMockApis(route: string, value: any): MockApiGetPut {
  const url = `/dictionary/types/${route}`;
  const body = { property: value };
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

const IntValueMock = createModelMockApis("dictionary/types/int", { k1: 1, k2: 2 });
Scenarios.Dictionary_IntValue_get = passOnSuccess(IntValueMock.get);
Scenarios.Dictionary_IntValue_put = passOnSuccess(IntValueMock.put);

const UnknownValueMock = createModelMockApis("dictionary/types/unknown", { k1: 1, k2: "hello", k3: null });
Scenarios.Dictionary_UnknownValue_get = passOnSuccess(UnknownValueMock.get);
Scenarios.Dictionary_UnknownValue_put = passOnSuccess(UnknownValueMock.put);

const ModelValueMock = createModelMockApis("dictionary/types/model", {
  k1: { property: "hello" },
  k2: { property: "world" },
});
Scenarios.Dictionary_ModelValue_get = passOnSuccess(ModelValueMock.get);
Scenarios.Dictionary_ModelValue_put = passOnSuccess(ModelValueMock.put);

const validDictionary = { k1: "hello", k2: "world" };

Scenarios.Dictionary_getBody = passOnSuccess(
  mockapi.get("/dictionary/body", (req) => {
    return { status: 200, body: json(validDictionary) };
  }),
);

Scenarios.Dictionary_putBody = passOnSuccess(
  mockapi.put("/dictionary/body", (req) => {
    req.expect.bodyEquals(validDictionary);
    return { status: 200 };
  }),
);
