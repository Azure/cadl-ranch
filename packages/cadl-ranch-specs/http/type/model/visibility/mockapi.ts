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

Scenarios.Models_InputToRoundTripReadOnly = passOnSuccess([
  mockapi.get("/type/model/visibility/inputToRoundTripReadOnly", (req) => {
    req.expect.bodyEquals({
      requiredString: "test",
      requiredInt: 2,
      requiredNullableString: null,
      requiredNullableInt: null,
      requiredModel: { requiredList: [null] },
      requiredModel2: { requiredList: [null] },
      requiredIntList: [1, 2],
      requiredStringList: ["a", null],
      requiredModelList: [{ requiredModelRecord: {} }],
      requiredModelRecord: {},
      requiredCollectionWithNullableFloatElement: [],
      requiredCollectionWithNullableBooleanElement: [],
      requiredNullableModelList: null,
      requiredNullableStringList: null,
      requiredNullableIntList: null,
    });
    return {
      status: 200,
      body: json({
        requiredReadonlyString: "test",
        requiredReadonlyInt: 12,
        optionalReadonlyInt: 11,
        requiredReadonlyModel: { requiredList: [] },
        requiredReadonlyFixedStringEnum: "1",
        requiredReadonlyExtensibleEnum: "3",
        optionalReadonlyFixedStringEnum: "2",
        optionalReadonlyExtensibleEnum: "1",
        requiredReadonlyStringList: ["abc"],
        requiredReadonlyIntList: [],
        requiredReadOnlyModelList: [],
        requiredReadOnlyIntRecord: { test: 1 },
        requiredStringRecord: { test: "1" },
        requiredReadOnlyModelRecord: {},
        optionalReadonlyStringList: [null],
        optionalReadOnlyModelList: [],
        optionalReadOnlyStringRecord: {},
        optionalModelRecord: { test: { requiredList: [] } },
        requiredCollectionWithNullableIntElement: [null, 123],
        optionalCollectionWithNullableBooleanElement: [null, false, true],
      }),
    };
  }),
]);
