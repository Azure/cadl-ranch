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
// **************************************************** Record<unknown> ****************************************************
const extendsUnknown = createMockApis("extendsRecordUnknown", {
  name: "ExtendsUnknownAdditionalProperties",
  prop1: 32,
  prop2: true,
  prop3: "abc",
});
Scenarios.Type_Property_AdditionalProperties_ExtendsUnknown_get = passOnSuccess(extendsUnknown.get);
Scenarios.Type_Property_AdditionalProperties_ExtendsUnknown_put = passOnSuccess(extendsUnknown.put);

const extendsUnknownDerived = createMockApis("extendsRecordUnknownDerived", {
  name: "ExtendsUnknownAdditionalProperties",
  index: 314,
  age: 2.71828,
  prop1: 32,
  prop2: true,
  prop3: "abc",
});
Scenarios.Type_Property_AdditionalProperties_ExtendsUnknownDerived_get = passOnSuccess(extendsUnknownDerived.get);
Scenarios.Type_Property_AdditionalProperties_ExtendsUnknownDerived_put = passOnSuccess(extendsUnknownDerived.put);

const extendsUnknownDiscriminated = createMockApis("extendsUnknownDiscriminated", {
  kind: "derived",
  name: "Derived",
  index: 314,
  age: 2.71828,
  prop1: 32,
  prop2: true,
  prop3: "abc",
});
Scenarios.Type_Property_AdditionalProperties_ExtendsUnknownDiscriminated_get = passOnSuccess(
  extendsUnknownDiscriminated.get,
);
Scenarios.Type_Property_AdditionalProperties_ExtendsUnknownDiscriminated_put = passOnSuccess(
  extendsUnknownDiscriminated.put,
);

const isUnknown = createMockApis("isRecordUnknown", {
  name: "IsUnknownAdditionalProperties",
  prop1: 32,
  prop2: true,
  prop3: "abc",
});
Scenarios.Type_Property_AdditionalProperties_IsUnknown_get = passOnSuccess(isUnknown.get);
Scenarios.Type_Property_AdditionalProperties_IsUnknown_put = passOnSuccess(isUnknown.put);

const isUnknownDerived = createMockApis("isRecordUnknownDerived", {
  name: "IsUnknownAdditionalProperties",
  index: 314,
  age: 2.71828,
  prop1: 32,
  prop2: true,
  prop3: "abc",
});
Scenarios.Type_Property_AdditionalProperties_IsUnknownDerived_get = passOnSuccess(isUnknownDerived.get);
Scenarios.Type_Property_AdditionalProperties_IsUnknownDerived_put = passOnSuccess(isUnknownDerived.put);

// **************************************************** Record<string> ****************************************************
const extendsString = createMockApis("extendsRecordString", {
  name: "ExtendsStringAdditionalProperties",
  prop: "abc",
});
Scenarios.Type_Property_AdditionalProperties_ExtendsString_get = passOnSuccess(extendsString.get);
Scenarios.Type_Property_AdditionalProperties_ExtendsString_put = passOnSuccess(extendsString.put);

const isString = createMockApis("isRecordString", {
  name: "IsStringAdditionalProperties",
  prop: "abc",
});
Scenarios.Type_Property_AdditionalProperties_IsString_get = passOnSuccess(isString.get);
Scenarios.Type_Property_AdditionalProperties_IsString_put = passOnSuccess(isString.put);

// **************************************************** Record<float32> ****************************************************
const recordFloatBody = {
  id: 42.42,
  prop: 42.42,
};
const extendsFloat = createMockApis("extendsRecordFloat", recordFloatBody);
Scenarios.Type_Property_AdditionalProperties_ExtendsFloat_get = passOnSuccess(extendsFloat.get);
Scenarios.Type_Property_AdditionalProperties_ExtendsFloat_put = passOnSuccess(extendsFloat.put);

const isFloat = createMockApis("isRecordFloat", recordFloatBody);
Scenarios.Type_Property_AdditionalProperties_IsFloat_get = passOnSuccess(isFloat.get);
Scenarios.Type_Property_AdditionalProperties_IsFloat_put = passOnSuccess(isFloat.put);

// **************************************************** Record<Model> ****************************************************
const recordModelBody = {
  prop: { state: "ok" },
};
const extendsModel = createMockApis("extendsRecordModel", recordModelBody);
Scenarios.Type_Property_AdditionalProperties_ExtendsModel_get = passOnSuccess(extendsModel.get);
Scenarios.Type_Property_AdditionalProperties_ExtendsModel_put = passOnSuccess(extendsModel.put);

const isModel = createMockApis("isRecordModel", recordModelBody);
Scenarios.Type_Property_AdditionalProperties_IsModel_get = passOnSuccess(isModel.get);
Scenarios.Type_Property_AdditionalProperties_IsModel_put = passOnSuccess(isModel.put);

// **************************************************** Record<Model[]> ****************************************************
const recordModelArrayBody = {
  prop: [{ state: "ok" }, { state: "ok" }],
};
const extendsModelArray = createMockApis("extendsRecordModelArray", recordModelArrayBody);
Scenarios.Type_Property_AdditionalProperties_ExtendsModelArray_get = passOnSuccess(extendsModelArray.get);
Scenarios.Type_Property_AdditionalProperties_ExtendsModelArray_put = passOnSuccess(extendsModelArray.put);

const isModelArray = createMockApis("isRecordModelArray", recordModelArrayBody);
Scenarios.Type_Property_AdditionalProperties_IsModelArray_get = passOnSuccess(isModelArray.get);
Scenarios.Type_Property_AdditionalProperties_IsModelArray_put = passOnSuccess(isModelArray.put);
