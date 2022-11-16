import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};


function genData(keys: string[]): Record<string, any> {
  const ret: Record<string, any> = {}
  const fullData: Record<string, any> = {
    requiredReadonlyString: "abc",
    requiredQueryInt32: 123,
    requiredCreateStringList: ["foo", "bar"],
    requiredUpdateIntList: [1, 2],
    requiredDeleteBoolean: true,
  };
  for (const k of keys) {
    if (k in fullData) {
      ret[k] = fullData[k];
    }
  }
  return ret;
}

Scenarios.Models_Visibility_getModel = passOnSuccess(
  mockapi.get("/models/visibility", (req) => {
    req.expect.bodyEquals(genData(['requiredQueryInt32']));
    return {
      status: 200, body: json(genData(['requiredReadonlyString']))
    };
  }),
);

Scenarios.Models_Visibility_headModel = passOnSuccess(
  mockapi.head("/models/visibility", (req) => {
    req.expect.bodyEquals(genData(['requiredQueryInt32']));
    return { status: 200 };
  }),
);

Scenarios.Models_Visibility_putModel = passOnSuccess(
  mockapi.put("/models/visibility", (req) => {
    req.expect.bodyEquals(genData(['requiredCreateStringList', 'requiredUpdateIntList']));
    return { status: 204 };
  }),
);

Scenarios.Models_Visibility_patchModel = passOnSuccess(
  mockapi.patch("/models/visibility", (req) => {
    req.expect.bodyEquals(genData(['requiredUpdateIntList']));
    return { status: 204 };
  }),
);

Scenarios.Models_Visibility_postModel = passOnSuccess(
  mockapi.post("/models/visibility", (req) => {
    req.expect.bodyEquals(genData(['requiredCreateStringList']));
    return { status: 204 };
  }),
);

Scenarios.Models_Visibility_deleteModel = passOnSuccess(
  mockapi.delete("/models/visibility", (req) => {
    req.expect.bodyEquals(genData(['requiredDeleteBoolean']));
    return { status: 204 };
  }),
);
