import { passOnSuccess, mockapi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Union_sendInt = passOnSuccess(
  mockapi.post("/unions/int", (req) => {
    req.expect.bodyEquals({ "simpleUnion": 1 });
    return { status: 200 };
  }),
);

Scenarios.Union_sendIntArray = passOnSuccess(
  mockapi.post("/unions/int-array", (req) => {
    req.expect.bodyEquals({ "simpleUnion": [1, 2] });
    return { status: 200 };
  }),
);

Scenarios.Union_sendInstallation1 = passOnSuccess(
  mockapi.post("/unions/installation1", (req) => {
    req.expect.bodyEquals({ "namedUnion": { "name": "installation1", "prop1": 1 } });
    return { status: 200 };
  }),
);

Scenarios.Union_sendInstallation2 = passOnSuccess(
  mockapi.post("/unions/installation2", (req) => {
    req.expect.bodyEquals({ "namedUnion": { "name": "installation2", "prop2": 2 } });
    return { status: 200 };
  }),
);
