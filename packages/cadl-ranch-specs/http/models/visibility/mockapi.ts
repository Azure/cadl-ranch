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

Scenarios.Models_Visibility_Automatic_headModel = passOnSuccess(
  mockapi.head("/models/visibility/automatic", (req) => {
    req.expect.bodyEquals(genData(["queryProp"]));
    return { status: 200 };
  }),
);

Scenarios.Models_Visibility_Automatic_getModel = passOnSuccess(
  mockapi.get("/models/visibility/automatic", (req) => {
    req.expect.bodyEquals(genData(["queryProp"]));
    return {
      status: 200,
      body: json(genData(["readProp"])),
    };
  }),
);

Scenarios.Models_Visibility_Automatic_putModel = passOnSuccess(
  mockapi.put("/models/visibility/automatic", (req) => {
    req.expect.bodyEquals(genData(["createProp", "updateProp"]));
    return { status: 204 };
  }),
);

Scenarios.Models_Visibility_Automatic_patchModel = passOnSuccess(
  mockapi.patch("/models/visibility/automatic", (req) => {
    req.expect.bodyEquals(genData(["updateProp"]));
    return { status: 204 };
  }),
);

Scenarios.Models_Visibility_Automatic_postModel = passOnSuccess(
  mockapi.post("/models/visibility/automatic", (req) => {
    req.expect.bodyEquals(genData(["createProp"]));
    return { status: 204 };
  }),
);

Scenarios.Models_Visibility_Automatic_deleteModel = passOnSuccess(
  mockapi.delete("/models/visibility/automatic", (req) => {
    req.expect.bodyEquals(genData(["deleteProp"]));
    return { status: 204 };
  }),
);
