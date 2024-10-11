import { passOnSuccess, MockRequest } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};
function createServerTests(uri: string, data: any) {
  return passOnSuccess({
    uri,
    method: "post",
    request: {
      body: data,
    },
    response: {
      status: 204,
    },
    handler: (req: MockRequest) => {
      req.expect.bodyEquals({ name: "foo" });
      return { status: 204 };
    },
    kind: "MockApiDefinition",
  });
}

Scenarios.Parameters_BodyOptionality_requiredExplicit = createServerTests(
  "/parameters/body-optionality/required-explicit",
  {
    name: "foo",
  },
);

Scenarios.Parameters_BodyOptionality_OptionalExplicit = passOnSuccess([
  {
    uri: "/parameters/body-optionality/optional-explicit/set",
    method: "post",
    request: {
      body: {
        name: "foo",
      },
    },
    response: {
      status: 204,
    },
    handler: (req: MockRequest) => {
      req.expect.bodyEquals({ name: "foo" });
      return { status: 204 };
    },
    kind: "MockApiDefinition",
  },
  {
    uri: "/parameters/body-optionality/optional-explicit/omit",
    method: "post",
    request: {
      body: {
        name: "foo",
      },
    },
    response: {
      status: 204,
    },
    handler: (req: MockRequest) => {
      req.expect.bodyEquals({ name: "foo" });
      return { status: 204 };
    },
    kind: "MockApiDefinition",
  },
]);

Scenarios.Parameters_BodyOptionality_requiredImplicit = createServerTests(
  "/parameters/body-optionality/required-implicit",
  {
    name: "foo",
  },
);

Scenarios.Parameters_BodyOptionality_OptionalityOrdering = passOnSuccess([
  mockapi.head("/parameters/body-optionality/optional-ordering/startwithequired", (req) => {
    req.expect.bodyEquals({ start: "required" });
    return { status: 204 };
  }),
  mockapi.head("/parameters/body-optionality/optional-ordering/startwithoptional", (req) => {
    req.expect.bodyEquals({ end: "required" });
    return { status: 204 };
  }),
]);
