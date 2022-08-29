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
function getMockApis(route: string, value: any): MockApiGetPut {
  return {
    get: mockapi.get(`/models/properties/${route}`, (req) => {
      return {
        status: 200,
        body: json({ property: value }),
      };
    }),
    put: mockapi.put(`/models/properties/${route}`, (req) => {
      req.expect.bodyEquals({ property: value });
      return {
        status: 200,
      };
    }),
  };
}

const booleanMock = getMockApis("boolean", true);
Scenarios.Properties_Boolean_get = passOnSuccess(booleanMock.get);
Scenarios.Properties_Boolean_put = passOnSuccess(booleanMock.put);

const stringMock = getMockApis("string", "hello");
Scenarios.Properties_String_get = passOnSuccess(stringMock.get);
Scenarios.Properties_String_put = passOnSuccess(stringMock.put);

const bytesMock = getMockApis("bytes", "aGVsbG8sIHdvcmxkIQ==");
Scenarios.Properties_Bytes_get = passOnSuccess(bytesMock.get);
Scenarios.Properties_Bytes_put = passOnSuccess(bytesMock.put);

const intMock = getMockApis("int", 42);
Scenarios.Properties_Int_get = passOnSuccess(intMock.get);
Scenarios.Properties_Int_put = passOnSuccess(intMock.put);

const floatMock = getMockApis("float", 42.42);
Scenarios.Properties_Float_get = passOnSuccess(floatMock.get);
Scenarios.Properties_Float_put = passOnSuccess(floatMock.put);

const datetimeMock = getMockApis("datetime", "2022-08-26T18:38:00Z");
Scenarios.Properties_Datetime_get = passOnSuccess(datetimeMock.get);
Scenarios.Properties_Datetime_put = passOnSuccess(datetimeMock.put);

const durationMock = getMockApis("duration", "P123DT22H14M12.011S");
Scenarios.Properties_Duration_get = passOnSuccess(durationMock.get);
Scenarios.Properties_Duration_put = passOnSuccess(durationMock.put);

const enumMock = getMockApis("enum", "ValueOne");
Scenarios.Properties_Enum_get = passOnSuccess(enumMock.get);
Scenarios.Properties_Enum_put = passOnSuccess(enumMock.put);

const extensibleEnumMock = getMockApis("enum", "UnknownValue");
Scenarios.Properties_ExtensibleEnum_get = passOnSuccess(extensibleEnumMock.get);
Scenarios.Properties_ExtensibleEnum_put = passOnSuccess(extensibleEnumMock.put);

const modelMock = getMockApis("model", { property: "hello" });
Scenarios.Properties_Model_get = passOnSuccess(modelMock.get);
Scenarios.Properties_Model_put = passOnSuccess(modelMock.put);

const collectionsStringMock = getMockApis("collections/string", ["hello", "world"]);
Scenarios.Properties_CollectionsString_get = passOnSuccess(collectionsStringMock.get);
Scenarios.Properties_CollectionsString_put = passOnSuccess(collectionsStringMock.put);

const collectionsIntMock = getMockApis("collections/int", [1, 2]);
Scenarios.Properties_CollectionsInt_get = passOnSuccess(collectionsIntMock.get);
Scenarios.Properties_CollectionsInt_put = passOnSuccess(collectionsIntMock.put);

const collectionsModelMock = getMockApis("collections/model", [{ property: "hello" }, { property: "world" }]);
Scenarios.Properties_CollectionsModel_get = passOnSuccess(collectionsModelMock.get);

Scenarios.Properties_CollectionsModel_put = passOnSuccess(collectionsModelMock.put);
