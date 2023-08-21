import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Type_Union_sendInt = passOnSuccess(
  mockapi.post("/type/union/int", (req) => {
    req.expect.bodyEquals({ simpleUnion: 1 });
    return { status: 200 };
  }),
);

Scenarios.Type_Union_sendIntArray = passOnSuccess(
  mockapi.post("/type/union/int-array", (req) => {
    req.expect.bodyEquals({ simpleUnion: [1, 2] });
    return { status: 200 };
  }),
);

Scenarios.Type_Union_sendFirstNamedUnionValue = passOnSuccess(
  mockapi.post("/type/union/model1", (req) => {
    req.expect.bodyEquals({ namedUnion: { name: "model1", prop1: 1 } });
    return { status: 200 };
  }),
);

Scenarios.Type_Union_sendSecondNamedUnionValue = passOnSuccess(
  mockapi.post("/type/union/model2", (req) => {
    req.expect.bodyEquals({ namedUnion: { name: "model2", prop2: 2 } });
    return { status: 200 };
  }),
);

Scenarios.Type_Union_receiveString = passOnSuccess(
  mockapi.get("/type/union/receive/string", (req) => {
    req.expect.bodyEquals({});
    return {
      status: 200,
      body: json({
        simpleUnion: "string",
      }),
    };
  }),
);

Scenarios.Type_Union_receiveIntArray = passOnSuccess(
  mockapi.get("/type/union/receive/int-array", (req) => {
    req.expect.bodyEquals({});
    return {
      status: 200,
      body: json({
        simpleUnion: [1, 2],
      }),
    };
  }),
);

Scenarios.Type_Union_receiveFirstNamedUnionValue = passOnSuccess(
  mockapi.get("/type/union/receive/model1", (req) => {
    req.expect.bodyEquals({});
    return {
      status: 200,
      body: json({
        namedUnion: { name: "model1", prop1: 1 },
      }),
    };
  }),
);

Scenarios.Type_Union_receiveSecondNamedUnionValue = passOnSuccess(
  mockapi.get("/type/union/receive/model2", (req) => {
    req.expect.bodyEquals({});
    return {
      status: 200,
      body: json({
        namedUnion: { name: "model2", prop2: 2 },
      }),
    };
  }),
);
