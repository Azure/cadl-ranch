import { MockApiDefinition } from "@azure-tools/cadl-ranch-api";

export function createServerTests(uri: string): MockApiDefinition {
  return {
    uri: uri,
    method: "post",
    request: {},
    response: { status: 204 },
    kind: "MockApiDefinition",
  };
}
