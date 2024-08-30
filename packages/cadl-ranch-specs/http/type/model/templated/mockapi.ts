import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Type_Model_Templated_numericTemplatedType = passOnSuccess(
  mockapi.put("/type/model/templated/numericType", (req) => {
    const body = {
      kind: "Int32Values",
      values: [1234],
      value: 1234,
    };
    req.expect.bodyEquals(body);
    return {
      status: 200,
      body: json(body),
    };
  }),
);

Scenarios.Type_Model_Templated_float32TemplatedType = passOnSuccess(
  mockapi.put("/type/model/templated/float32ValuesType", (req) => {
    const body = {
      kind: "Float32Values",
      values: [12.34],
      value: 12.34,
    };
    req.expect.bodyEquals(body);
    return {
      status: 200,
      body: json(body),
    };
  }),
);

Scenarios.Type_Model_Templated_int32TemplatedType = passOnSuccess(
  mockapi.put("/type/model/templated/int32ValuesType", (req) => {
    const body = {
      kind: "Int32Values",
      values: [1234],
      value: 1234,
    };
    req.expect.bodyEquals(body);
    return {
      status: 200,
      body: json(body),
    };
  }),
);
