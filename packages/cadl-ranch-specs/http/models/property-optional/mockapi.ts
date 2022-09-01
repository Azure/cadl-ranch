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
  const allUrl = `${url}/all`;
  const defaultUrl = `${url}/default`;
  const allBody = { property: value };
  const defaultBody = {};
  const getAll = mockapi.get(allUrl, (req) => {
    return {
      status: 200,
      body: json(allBody),
    };
  });
  const getDefault = mockapi.get(defaultUrl, (req) => {
    return {
      status: 200,
      body: json(defaultBody),
    };
  });
  const putAll = mockapi.put(allUrl, (req) => {
    req.expect.bodyEquals(allBody);
    return {
      status: 204,
    };
  });
  const putDefault = mockapi.put(defaultUrl, (req) => {
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
Scenarios.Models_Property_Optional_String_getDefault = passOnSuccess(stringMock.getDefault);
Scenarios.Models_Property_Optional_String_putAll = passOnSuccess(stringMock.putAll);
Scenarios.Models_Property_Optional_String_putDefault = passOnSuccess(stringMock.putDefault);

const bytesMock = createMockApis("bytes", "aGVsbG8sIHdvcmxkIQ==");
Scenarios.Models_Property_Optional_Bytes_getAll = passOnSuccess(bytesMock.getAll);
Scenarios.Models_Property_Optional_Bytes_getDefault = passOnSuccess(bytesMock.getDefault);
Scenarios.Models_Property_Optional_Bytes_putAll = passOnSuccess(bytesMock.putAll);
Scenarios.Models_Property_Optional_Bytes_putDefault = passOnSuccess(bytesMock.putDefault);

const datetimeMock = createMockApis("datetime", "2022-08-26T18:38:00Z");
Scenarios.Models_Property_Optional_Datetime_getAll = passOnSuccess(datetimeMock.getAll);
Scenarios.Models_Property_Optional_Datetime_getDefault = passOnSuccess(datetimeMock.getDefault);
Scenarios.Models_Property_Optional_Datetime_putAll = passOnSuccess(datetimeMock.putAll);
Scenarios.Models_Property_Optional_Datetime_putDefault = passOnSuccess(datetimeMock.putDefault);

const durationMock = createMockApis("duration", "P123DT22H14M12.011S");
Scenarios.Models_Property_Optional_Duration_getAll = passOnSuccess(durationMock.getAll);
Scenarios.Models_Property_Optional_Duration_getDefault = passOnSuccess(durationMock.getDefault);
Scenarios.Models_Property_Optional_Duration_putAll = passOnSuccess(durationMock.putAll);
Scenarios.Models_Property_Optional_Duration_putDefault = passOnSuccess(durationMock.putDefault);

const collectionsBytesMock = createMockApis("collections/bytes", ["aGVsbG8sIHdvcmxkIQ==", "aGVsbG8sIHdvcmxkIQ=="]);
Scenarios.Models_Property_Optional_CollectionsByte_getAll = passOnSuccess(collectionsBytesMock.getAll);
Scenarios.Models_Property_Optional_CollectionsByte_getDefault = passOnSuccess(collectionsBytesMock.getDefault);
Scenarios.Models_Property_Optional_CollectionsByte_putAll = passOnSuccess(collectionsBytesMock.putAll);
Scenarios.Models_Property_Optional_CollectionsByte_putDefault = passOnSuccess(collectionsBytesMock.putDefault);

const collectionsModelMock = createMockApis("collections/model", [{ property: "hello" }, { property: "world" }]);
Scenarios.Models_Property_Optional_CollectionsModel_getAll = passOnSuccess(collectionsModelMock.getAll);
Scenarios.Models_Property_Optional_CollectionsModel_getDefault = passOnSuccess(collectionsModelMock.getDefault);
Scenarios.Models_Property_Optional_CollectionsModel_putAll = passOnSuccess(collectionsModelMock.putAll);
Scenarios.Models_Property_Optional_CollectionsModel_putDefault = passOnSuccess(collectionsModelMock.putDefault);

// TEST REQUIRED AND OPTIONAL PROPERTIES

const requiredAndOptionalBaseUrl = `/models/properties/optional/requiredAndOptional`;
Scenarios.Models_Property_Optional_RequiredAndOptional_getAll = passOnSuccess(
  mockapi.get(`${requiredAndOptionalBaseUrl}/all`, (req) => {
    return {
      status: 200,
      body: json({
        optionalProperty: "hello",
        requiredProperty: 42,
      }),
    };
  }),
);
Scenarios.Models_Property_Optional_RequiredAndOptional_getRequiredOnly = passOnSuccess(
  mockapi.get(`${requiredAndOptionalBaseUrl}/requiredOnly`, (req) => {
    return {
      status: 200,
      body: json({
        requiredProperty: 42,
      }),
    };
  }),
);
Scenarios.Models_Property_Optional_RequiredAndOptional_putAll = passOnSuccess(
  mockapi.put(`${requiredAndOptionalBaseUrl}/all`, (req) => {
    req.expect.bodyEquals({
      optionalProperty: "hello",
      requiredProperty: 42,
    });
    return {
      status: 204,
    };
  }),
);
Scenarios.Models_Property_Optional_RequiredAndOptional_putRequiredOnly = passOnSuccess(
  mockapi.put(`${requiredAndOptionalBaseUrl}/requiredOnly`, (req) => {
    req.expect.bodyEquals({
      requiredProperty: 42,
    });
    return {
      status: 204,
    };
  }),
);
