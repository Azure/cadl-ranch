import { passOnSuccess, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Versioning_MadeOptional_test = passOnSuccess({
  uri: `/versioning/made-optional/api-version:v2/test`,
  method: `post`,
  request: {
    body: {
      prop: "foo",
    },
  },
  response: {
    status: 200,
    body: json({ prop: "foo" }),
  },
  kind: "MockApiDefinition",
});
