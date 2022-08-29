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
  const url = `/models/properties/types/${route}`;
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

const booleanMock = createMockApis("boolean", true);
Scenarios.Properties_Boolean_get = passOnSuccess(booleanMock.get);
Scenarios.Properties_Boolean_put = passOnSuccess(booleanMock.put);

const stringMock = createMockApis("string", "hello");
Scenarios.Properties_String_get = passOnSuccess(stringMock.get);
Scenarios.Properties_String_put = passOnSuccess(stringMock.put);

const bytesMock = createMockApis("bytes", "aGVsbG8sIHdvcmxkIQ==");
Scenarios.Properties_Bytes_get = passOnSuccess(bytesMock.get);
Scenarios.Properties_Bytes_put = passOnSuccess(bytesMock.put);

const intMock = createMockApis("int", 42);
Scenarios.Properties_Int_get = passOnSuccess(intMock.get);
Scenarios.Properties_Int_put = passOnSuccess(intMock.put);

const floatMock = createMockApis("float", 42.42);
Scenarios.Properties_Float_get = passOnSuccess(floatMock.get);
Scenarios.Properties_Float_put = passOnSuccess(floatMock.put);

const datetimeMock = createMockApis("datetime", "2022-08-26T18:38:00Z");
Scenarios.Properties_Datetime_get = passOnSuccess(datetimeMock.get);
Scenarios.Properties_Datetime_put = passOnSuccess(datetimeMock.put);

const durationMock = createMockApis("duration", "P123DT22H14M12.011S");
Scenarios.Properties_Duration_get = passOnSuccess(durationMock.get);
Scenarios.Properties_Duration_put = passOnSuccess(durationMock.put);

const enumMock = createMockApis("enum", "ValueOne");
Scenarios.Properties_Enum_get = passOnSuccess(enumMock.get);
Scenarios.Properties_Enum_put = passOnSuccess(enumMock.put);

const extensibleEnumMock = createMockApis("extensible-enum", "UnknownValue");
Scenarios.Properties_ExtensibleEnum_get = passOnSuccess(extensibleEnumMock.get);
Scenarios.Properties_ExtensibleEnum_put = passOnSuccess(extensibleEnumMock.put);

const modelMock = createMockApis("model", { property: "hello" });
Scenarios.Properties_Model_get = passOnSuccess(modelMock.get);
Scenarios.Properties_Model_put = passOnSuccess(modelMock.put);

const collectionsStringMock = createMockApis("collections/string", ["hello", "world"]);
Scenarios.Properties_CollectionsString_get = passOnSuccess(collectionsStringMock.get);
Scenarios.Properties_CollectionsString_put = passOnSuccess(collectionsStringMock.put);

const collectionsIntMock = createMockApis("collections/int", [1, 2]);
Scenarios.Properties_CollectionsInt_get = passOnSuccess(collectionsIntMock.get);
Scenarios.Properties_CollectionsInt_put = passOnSuccess(collectionsIntMock.put);

const collectionsModelMock = createMockApis("collections/model", [{ property: "hello" }, { property: "world" }]);
Scenarios.Properties_CollectionsModel_get = passOnSuccess(collectionsModelMock.get);

Scenarios.Properties_CollectionsModel_put = passOnSuccess(collectionsModelMock.put);
