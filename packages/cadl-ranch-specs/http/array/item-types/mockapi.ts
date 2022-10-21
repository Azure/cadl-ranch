import { passOnSuccess, ScenarioMockApi, mockapi, json, MockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

interface MockApiGetPut {
  get: MockApi;
  put: MockApi;
}

/**
 * Return the get and put operations
 * @param route The route within /dictionary for your function.
 * @param value The value you are expecting and will return.
 */
function createModelMockApis(route: string, value: any): MockApiGetPut {
  const url = `/array/item-types/${route}`;
  return {
    get: mockapi.get(url, (req) => {
      return {
        status: 200,
        body: json(value),
      };
    }),
    put: mockapi.put(url, (req) => {
      req.expect.bodyEquals(value);
      return {
        status: 204,
      };
    }),
  };
}

const Int32ValueMock = createModelMockApis("int32", [1, 2]);
Scenarios.Dictionary_Int32Value_get = passOnSuccess(Int32ValueMock.get);
Scenarios.Dictionary_Int32Value_put = passOnSuccess(Int32ValueMock.put);

const Int64ValueMock = createModelMockApis("int64", [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]);
Scenarios.Dictionary_Int64Value_get = passOnSuccess(Int64ValueMock.get);
Scenarios.Dictionary_Int64Value_put = passOnSuccess(Int64ValueMock.put);

const BooleanValueMock = createModelMockApis("boolean", [true, false]);
Scenarios.Dictionary_BooleanValue_get = passOnSuccess(BooleanValueMock.get);
Scenarios.Dictionary_BooleanValue_put = passOnSuccess(BooleanValueMock.put);

const StringValueMock = createModelMockApis("string", ["hello", ""]);
Scenarios.Dictionary_StringValue_get = passOnSuccess(StringValueMock.get);
Scenarios.Dictionary_StringValue_put = passOnSuccess(StringValueMock.put);

const Float32ValueMock = createModelMockApis("float32", [42.42]);
Scenarios.Dictionary_Float32Value_get = passOnSuccess(Float32ValueMock.get);
Scenarios.Dictionary_Float32Value_put = passOnSuccess(Float32ValueMock.put);

const DatetimeValueMock = createModelMockApis("datetime", ["2022-08-26T18:38:00Z"]);
Scenarios.Dictionary_DatetimeValue_get = passOnSuccess(DatetimeValueMock.get);
Scenarios.Dictionary_DatetimeValue_put = passOnSuccess(DatetimeValueMock.put);

const DurationValueMock = createModelMockApis("duration", ["P123DT22H14M12.011S"]);
Scenarios.Dictionary_DurationValue_get = passOnSuccess(DurationValueMock.get);
Scenarios.Dictionary_DurationValue_put = passOnSuccess(DurationValueMock.put);

const UnknownValueMock = createModelMockApis("unknown", [1, "hello", null]);
Scenarios.Dictionary_UnknownValue_get = passOnSuccess(UnknownValueMock.get);
Scenarios.Dictionary_UnknownValue_put = passOnSuccess(UnknownValueMock.put);

const ModelValueMock = createModelMockApis("model", [{ property: "hello" }, { property: "world" }]);
Scenarios.Dictionary_ModelValue_get = passOnSuccess(ModelValueMock.get);
Scenarios.Dictionary_ModelValue_put = passOnSuccess(ModelValueMock.put);
