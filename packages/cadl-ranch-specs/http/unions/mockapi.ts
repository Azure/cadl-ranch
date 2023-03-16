import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Unions_sendInt = passOnSuccess(
  mockapi.post("/unions/int", (req) => {
    req.expect.bodyEquals({ simpleUnion: 1 });
    return { status: 200 };
  }),
);

Scenarios.Unions_sendIntArray = passOnSuccess(
  mockapi.post("/unions/int-array", (req) => {
    req.expect.bodyEquals({ simpleUnion: [1, 2] });
    return { status: 200 };
  }),
);

Scenarios.Unions_sendFirstNamedUnionValue = passOnSuccess(
  mockapi.post("/unions/model1", (req) => {
    req.expect.bodyEquals({ namedUnion: { name: "model1", prop1: 1 } });
    return { status: 200 };
  }),
);

Scenarios.Unions_sendSecondNamedUnionValue = passOnSuccess(
  mockapi.post("/unions/model2", (req) => {
    req.expect.bodyEquals({ namedUnion: { name: "model2", prop2: 2 } });
    return { status: 200 };
  }),
);
