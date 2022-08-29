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
Scenarios.Types_Boolean_get = passOnSuccess(booleanMock.get);
Scenarios.Types_Boolean_put = passOnSuccess(booleanMock.put);

const stringMock = createMockApis("string", "hello");
Scenarios.Types_String_get = passOnSuccess(stringMock.get);
Scenarios.Types_String_put = passOnSuccess(stringMock.put);

const bytesMock = createMockApis("bytes", "aGVsbG8sIHdvcmxkIQ==");
Scenarios.Types_Bytes_get = passOnSuccess(bytesMock.get);
Scenarios.Types_Bytes_put = passOnSuccess(bytesMock.put);

const intMock = createMockApis("int", 42);
Scenarios.Types_Int_get = passOnSuccess(intMock.get);
Scenarios.Types_Int_put = passOnSuccess(intMock.put);

const floatMock = createMockApis("float", 42.42);
Scenarios.Types_Float_get = passOnSuccess(floatMock.get);
Scenarios.Types_Float_put = passOnSuccess(floatMock.put);

const datetimeMock = createMockApis("datetime", "2022-08-26T18:38:00Z");
Scenarios.Types_Datetime_get = passOnSuccess(datetimeMock.get);
Scenarios.Types_Datetime_put = passOnSuccess(datetimeMock.put);

const durationMock = createMockApis("duration", "P123DT22H14M12.011S");
Scenarios.Types_Duration_get = passOnSuccess(durationMock.get);
Scenarios.Types_Duration_put = passOnSuccess(durationMock.put);

const enumMock = createMockApis("enum", "ValueOne");
Scenarios.Types_Enum_get = passOnSuccess(enumMock.get);
Scenarios.Types_Enum_put = passOnSuccess(enumMock.put);

const extensibleEnumMock = createMockApis("extensible-enum", "UnknownValue");
Scenarios.Types_ExtensibleEnum_get = passOnSuccess(extensibleEnumMock.get);
Scenarios.Types_ExtensibleEnum_put = passOnSuccess(extensibleEnumMock.put);

const modelMock = createMockApis("model", { property: "hello" });
Scenarios.Types_Model_get = passOnSuccess(modelMock.get);
Scenarios.Types_Model_put = passOnSuccess(modelMock.put);

const collectionsStringMock = createMockApis("collections/string", ["hello", "world"]);
Scenarios.Types_CollectionsString_get = passOnSuccess(collectionsStringMock.get);
Scenarios.Types_CollectionsString_put = passOnSuccess(collectionsStringMock.put);

const collectionsIntMock = createMockApis("collections/int", [1, 2]);
Scenarios.Types_CollectionsInt_get = passOnSuccess(collectionsIntMock.get);
Scenarios.Types_CollectionsInt_put = passOnSuccess(collectionsIntMock.put);

const collectionsModelMock = createMockApis("collections/model", [{ property: "hello" }, { property: "world" }]);
Scenarios.Types_CollectionsModel_get = passOnSuccess(collectionsModelMock.get);

Scenarios.Types_CollectionsModel_put = passOnSuccess(collectionsModelMock.put);
