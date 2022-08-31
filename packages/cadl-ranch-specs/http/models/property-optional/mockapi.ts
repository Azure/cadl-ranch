import { passOnSuccess, ScenarioMockApi, mockapi, json, MockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

interface MockApiGetPut {
  getAll: MockApi;
  getDefault: MockApi;
  putAll: MockApi;
  putDefault: MockApi;
}

/**
 * Return the get and put operations
 * @param route The route within /models/properties/optional/all/ for your function.
 * @param value The value you are expecting and will return
 */
function createMockApis(route: string, value: any): MockApiGetPut {
  const url = `/models/properties/optional/${route}`;
  const allBody = { property: value };
  const defaultBody = {};
  const getAll = mockapi.get(url + "/all", (req) => {
    return {
      status: 200,
      body: json(allBody),
    };
  });
  const getDefault = mockapi.get(url + "/default", (req) => {
    return {
      status: 200,
      body: json(defaultBody),
    };
  });
  const putAll = mockapi.put(url + "/all", (req) => {
    req.expect.bodyEquals(allBody);
    return {
      status: 204,
    };
  });
  const putDefault = mockapi.put(url + "/default", (req) => {
    req.expect.bodyEquals(defaultBody);
    return {
      status: 204,
    };
  });
  return {
    getAll: getAll,
    getDefault: getDefault,
    putAll: putAll,
    putDefault: putDefault,
  };
}

const stringMock = createMockApis("string", "hello");
Scenarios.Models_Property_Optional_String_getAll = passOnSuccess(stringMock.getAll);
Scenarios.Models_Property_Optional_String_getDefault = passOnSuccess(stringMock.putAll);
Scenarios.Models_Property_Optional_String_putAll = passOnSuccess(stringMock.putAll);
Scenarios.Models_Property_Optional_String_putDefault = passOnSuccess(stringMock.putDefault);

const bytesMock = createMockApis("bytes", "aGVsbG8sIHdvcmxkIQ==");
Scenarios.Models_Property_Optional_Bytes_getAll = passOnSuccess(bytesMock.getAll);
Scenarios.Models_Property_Optional_Bytes_getDefault = passOnSuccess(bytesMock.putAll);
Scenarios.Models_Property_Optional_Bytes_putAll = passOnSuccess(bytesMock.putAll);
Scenarios.Models_Property_Optional_Bytes_putDefault = passOnSuccess(bytesMock.putDefault);

const datetimeMock = createMockApis("bytes", "2022-08-26T18:38:00Z");
Scenarios.Models_Property_Optional_Datetime_getAll = passOnSuccess(datetimeMock.getAll);
Scenarios.Models_Property_Optional_Datetime_getDefault = passOnSuccess(datetimeMock.putAll);
Scenarios.Models_Property_Optional_Datetime_putAll = passOnSuccess(datetimeMock.putAll);
Scenarios.Models_Property_Optional_Datetime_putDefault = passOnSuccess(datetimeMock.putDefault);

const durationMock = createMockApis("bytes", "P123DT22H14M12.011S");
Scenarios.Models_Property_Optional_Duration_getAll = passOnSuccess(durationMock.getAll);
Scenarios.Models_Property_Optional_Duration_getDefault = passOnSuccess(durationMock.putAll);
Scenarios.Models_Property_Optional_Duration_putAll = passOnSuccess(durationMock.putAll);
Scenarios.Models_Property_Optional_Duration_putDefault = passOnSuccess(durationMock.putDefault);

const collectionsBytesMock = createMockApis("bytes", ["aGVsbG8sIHdvcmxkIQ==", "aGVsbG8sIHdvcmxkIQ=="]);
Scenarios.Models_Property_Optional_CollectionsByte_getAll = passOnSuccess(collectionsBytesMock.getAll);
Scenarios.Models_Property_Optional_CollectionsByte_getDefault = passOnSuccess(collectionsBytesMock.putAll);
Scenarios.Models_Property_Optional_CollectionsByte_putAll = passOnSuccess(collectionsBytesMock.putAll);
Scenarios.Models_Property_Optional_CollectionsByte_putDefault = passOnSuccess(collectionsBytesMock.putDefault);
