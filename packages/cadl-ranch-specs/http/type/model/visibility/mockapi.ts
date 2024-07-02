import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

function genData(keys: string[]): Record<string, any> {
  const ret: Record<string, any> = {};
  const fullData: Record<string, any> = {
    readProp: "abc",
    queryProp: 123,
    createProp: ["foo", "bar"],
    updateProp: [1, 2],
    deleteProp: true,
  };
  for (const k of keys) {
    if (k in fullData) {
      ret[k] = fullData[k];
    }
  }
  return ret;
}

Scenarios.Type_Model_Visibility_headModel = passOnSuccess(
  mockapi.head("/type/model/visibility", (req) => {
    req.expect.bodyEquals(genData(["queryProp"]));
    return { status: 200 };
  }),
);

Scenarios.Type_Model_Visibility_getModel = passOnSuccess(
  mockapi.get("/type/model/visibility", (req) => {
    req.expect.bodyEquals(genData(["queryProp"]));
    return {
      status: 200,
      body: json(genData(["readProp"])),
    };
  }),
);

Scenarios.Type_Model_Visibility_putModel = passOnSuccess(
  mockapi.put("/type/model/visibility", (req) => {
    req.expect.bodyEquals(genData(["createProp", "updateProp"]));
    return { status: 204 };
  }),
);

Scenarios.Type_Model_Visibility_patchModel = passOnSuccess(
  mockapi.patch("/type/model/visibility", (req) => {
    req.expect.bodyEquals(genData(["updateProp"]));
    return { status: 204 };
  }),
);

Scenarios.Type_Model_Visibility_postModel = passOnSuccess(
  mockapi.post("/type/model/visibility", (req) => {
    req.expect.bodyEquals(genData(["createProp"]));
    return { status: 204 };
  }),
);

Scenarios.Type_Model_Visibility_deleteModel = passOnSuccess(
  mockapi.delete("/type/model/visibility", (req) => {
    req.expect.bodyEquals(genData(["deleteProp"]));
    return { status: 204 };
  }),
);

const mockApiExpectBody = {
  requiredReadOnlyString: "requiredString",
  requiredReadOnlyInt: 123,
  optionalReadOnlyString: "optionalString",
  requiredReadOnlyBytes: new Uint8Array([1, 2, 3]),
  requiredReadOnlyUint8Array: [1, 2, 3],
  optionalReadOnlyUint8Array: [4, 5, 6],
  requiredReadOnlyUnknown: [1, "string", true],
  requiredReadOnlyInt8Array: [-1, -2, -3],
  nonRequiredReadOnlyNullableInt: 1,
  nonRequiredReadOnlyNullableString: null,
  requiredReadOnlyPlainDate: "2023-01-01",
  requiredReadOnlyPlainTime: "12:00:00",
  optionalReadOnlyPlainDate: "2023-01-02",
  requiredReadOnlyModel: { resourceName: "testResource" },
  requiredReadOnlyFixedStringEnum: "1",
  requiredReadOnlyExtensibleEnum: "2",
  optionalReadOnlyFixedStringEnum: "2",
  optionalReadOnlyExtensibleEnum: "4",
  requiredReadOnlyStringList: ["string1", "string2"],
  requiredReadOnlyIntList: [1, 2],
  requiredReadOnlyModelList: [{ resourceName: "list1" }, { resourceName: "list2" }],
  requiredReadOnlyIntRecord: { key1: 1, key2: 2 },
  requiredReadOnlyStringRecord: { key1: "value1", key2: "value2" },
  requiredReadOnlyModelRecord: {
    Key1: { resourceName: "recordtest" },
    Key2: { resourceName: "recordtest2" },
  },
  requiredReadOnlyCollectionWithNullableIntElement: [null, 1, null],
  optionalReadOnlyCollectionWithNullableBooleanElement: [null, true, false],
  requiredReadOnlyNullableIntList: null,
  requiredReadOnlyNullableStringList: null,
  nonRequiredReadOnlyNullableIntList: null,
};

Scenarios.Type_Model_Visibility_readOnlyRoundTrip = passOnSuccess(
  mockapi.put("/type/model/visibility/readonlyroundtrip", (req) => {
    req.expect.bodyEquals({});
    return {
      status: 200,
      body: json(mockApiExpectBody),
    };
  }),
);
