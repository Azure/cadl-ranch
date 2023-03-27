import { passOnSuccess, ScenarioMockApi, mockapi, json, MockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

interface MockApiGetPut {
  getAll: MockApi;
  getDefault: MockApi;
  patchAll: MockApi;
  patchDefault: MockApi;
}

/**
 * Return the get and put operations
 * @param route The route within /models/properties/optional/all/ for your function.
 * @param value The value you are expecting and will return
 */
function createMockApis(route: string, value: any): MockApiGetPut {
  const url = `/models/properties/nullable/${route}`;
  const allUrl = `${url}/all`;
  const defaultUrl = `${url}/default`;
  const allBody = { requiredProperty: "foo", nullableProperty: value };
  const defaultBody = { requiredProperty: "foo", nullableProperty: null };
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
  const patchAll = mockapi.put(allUrl, (req) => {
    const expectedBody = JSON.parse(JSON.stringify(allBody)); // deep clone
    req.expect.coercedBodyEquals(expectedBody);
    return {
      status: 204,
    };
  });
  const patchDefault = mockapi.patch(defaultUrl, (req) => {
    req.expect.bodyEquals(defaultBody);
    return {
      status: 204,
    };
  });
  return {
    getAll: getAll,
    getDefault: getDefault,
    patchAll: patchAll,
    patchDefault: patchDefault,
  };
}

const stringMock = createMockApis("string", "hello");
Scenarios.Models_Property_Nullable_String_getAll = passOnSuccess(stringMock.getAll);
Scenarios.Models_Property_Nullable_String_getDefault = passOnSuccess(stringMock.getDefault);
Scenarios.Models_Property_Nullable_String_patchAll = passOnSuccess(stringMock.patchAll);
Scenarios.Models_Property_Nullable_String_patchDefault = passOnSuccess(stringMock.patchDefault);

const bytesMock = createMockApis("bytes", "aGVsbG8sIHdvcmxkIQ==");
Scenarios.Models_Property_Nullable_Bytes_getAll = passOnSuccess(bytesMock.getAll);
Scenarios.Models_Property_Nullable_Bytes_getDefault = passOnSuccess(bytesMock.getDefault);
Scenarios.Models_Property_Nullable_Bytes_patchAll = passOnSuccess(bytesMock.patchAll);
Scenarios.Models_Property_Nullable_Bytes_patchDefault = passOnSuccess(bytesMock.patchDefault);

const datetimeMock = createMockApis("datetime", "2022-08-26T18:38:00Z");
Scenarios.Models_Property_Nullable_Datetime_getAll = passOnSuccess(datetimeMock.getAll);
Scenarios.Models_Property_Nullable_Datetime_getDefault = passOnSuccess(datetimeMock.getDefault);
Scenarios.Models_Property_Nullable_Datetime_patchAll = passOnSuccess(datetimeMock.patchAll);
Scenarios.Models_Property_Nullable_Datetime_patchDefault = passOnSuccess(datetimeMock.patchDefault);

const durationMock = createMockApis("duration", "P123DT22H14M12.011S");
Scenarios.Models_Property_Nullable_Duration_getAll = passOnSuccess(durationMock.getAll);
Scenarios.Models_Property_Nullable_Duration_getDefault = passOnSuccess(durationMock.getDefault);
Scenarios.Models_Property_Nullable_Duration_patchAll = passOnSuccess(durationMock.patchAll);
Scenarios.Models_Property_Nullable_Duration_patchDefault = passOnSuccess(durationMock.patchDefault);

const collectionsBytesMock = createMockApis("collections/bytes", ["aGVsbG8sIHdvcmxkIQ==", "aGVsbG8sIHdvcmxkIQ=="]);
Scenarios.Models_Property_Nullable_CollectionsByte_getAll = passOnSuccess(collectionsBytesMock.getAll);
Scenarios.Models_Property_Nullable_CollectionsByte_getDefault = passOnSuccess(collectionsBytesMock.getDefault);
Scenarios.Models_Property_Nullable_CollectionsByte_patchAll = passOnSuccess(collectionsBytesMock.patchAll);
Scenarios.Models_Property_Nullable_CollectionsByte_patchDefault = passOnSuccess(collectionsBytesMock.patchDefault);

const collectionsModelMock = createMockApis("collections/model", [{ property: "hello" }, { property: "world" }]);
Scenarios.Models_Property_Nullable_CollectionsModel_getAll = passOnSuccess(collectionsModelMock.getAll);
Scenarios.Models_Property_Nullable_CollectionsModel_getDefault = passOnSuccess(collectionsModelMock.getDefault);
Scenarios.Models_Property_Nullable_CollectionsModel_patchAll = passOnSuccess(collectionsModelMock.patchAll);
Scenarios.Models_Property_Nullable_CollectionsModel_patchDefault = passOnSuccess(collectionsModelMock.patchDefault);
