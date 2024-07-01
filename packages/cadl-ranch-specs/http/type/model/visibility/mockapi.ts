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
  requiredReadonlyString: "String",
  requiredReadonlyInt: 123,
  optionalReadonlyString: "optionalString",
  optionalReadonlyInt: 456,
  requiredReadonlyBytes: new Uint8Array([1, 2, 3]),
  optionalReadonlyBytes: new Uint8Array([4, 5, 6]),
  requiredReadonlyUint8Array: [1, 2, 3],
  optionalReadonlyUint8Array: [4, 5, 6],
  requiredReadonlyUnknown: [1, "string", true],
  requiredReadonlyInt8Array: [-1, -2, -3],
  optionalReadonlyInt8Array: [-4, -5, -6],
  nonRequiredReadOnlyNullableInt: 1,
  nonRequiredReadOnlyNullableString: null,
  requiredReadOnlyPlainDate: "2023-01-01",
  requiredReadOnlyPlainTime: "12:00:00",
  optionalReadOnlyPlainDate: "2023-01-02",
  optionalReadOnlyPlainTime: "13:00:00",
  requiredReadonlyModel: { resourceName: "testResource" },
  requiredReadonlyFixedStringEnum: "1",
  requiredReadonlyExtensibleEnum: "2",
  optionalReadonlyFixedStringEnum: "2",
  optionalReadonlyExtensibleEnum: "4",
  requiredReadonlyStringList: ["string1", "string2"],
  requiredReadonlyIntList: [1, 2],
  requiredReadOnlyModelList: [{ requireId: "14159" }],
  requiredReadOnlyIntRecord: { key1: 1, key2: 2 },
  requiredReadonlyStringRecord: { key1: "value1", key2: "value2" },
  requiredReadOnlyModelRecord: {
    Key1: { resourceName: "recordtest" },
    Key2: { resourceName: "recordtest2" },
  },
  optionalReadonlyStringList: ["optionalString1", "optionalString2"],
  optionalReadonlyIntList: [3, 4],
  optionalReadOnlyIntRecord: { key3: 3, key4: 4 },
  optionalReadOnlyStringRecord: { key3: "value3", key4: "value4" },
  requiredReadOnlyCollectionWithNullableIntElement: [null, 1, null],
  optionalReadOnlyCollectionWithNullableBooleanElement: [null, true, false],
  requiredReadOnlyNullableIntList: null,
  requiredReadOnlyNullableStringList: null,
  nonRequiredReadOnlyNullableIntList: null,
  nonRequiredReadOnlyNullableStringList: null,
};

Scenarios.Models_InputToRoundTripReadOnly = passOnSuccess([
  mockapi.get("/type/model/visibility/inputToRoundTripReadOnly", (req) => {
    req.expect.bodyEquals(mockApiExpectBody);
    return {
      status: 200,
    };
  }),
]);
