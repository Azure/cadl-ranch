import { passOnSuccess, ScenarioMockApi, mockapi, json, MockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

interface MockApiGetPut {
  get: MockApi;
  put: MockApi;
}

/**
 * Return the get and put operations
 * @param route The route within /models/properties for your function.
 * @param value The value you are expecting and will return.
 */
function createMockApis(route: string, value: any): MockApiGetPut {
  const url = `/type/property/additionalProperties/${route}`;
  const body = value;
  return {
    get: mockapi.get(url, (req) => {
      return {
        status: 200,
        body: json(body),
      };
    }),
    put: mockapi.put(url, (req) => {
      const expectedBody = JSON.parse(JSON.stringify(body));
      req.expect.coercedBodyEquals(expectedBody);
      return {
        status: 204,
      };
    }),
  };
}

const extendRecordUnknown = createMockApis("extendsRecordUnknown", {
  name: "ModelExtendsRecordUnknown",
  prop1: 32,
  prop2: true,
  prop3: "abc",
});
Scenarios.Type_Property_AdditionalProperties_ExtendsRecordUnknown_get = passOnSuccess(extendRecordUnknown.get);
Scenarios.Type_Property_AdditionalProperties_ExtendsRecordUnknown_put = passOnSuccess(extendRecordUnknown.put);

const isRecordUnknown = createMockApis("isRecordUnknown", {
  name: "ModelIsRecordUnknown",
  prop1: 32,
  prop2: true,
  prop3: "abc",
});
Scenarios.Type_Property_AdditionalProperties_IsRecordUnknown_get = passOnSuccess(isRecordUnknown.get);
Scenarios.Type_Property_AdditionalProperties_IsRecordUnknown_put = passOnSuccess(isRecordUnknown.put);
