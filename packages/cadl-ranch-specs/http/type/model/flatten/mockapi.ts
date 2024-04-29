import { passOnSuccess, mockapi, json, MockApi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

/**
 * Return the put operation.
 * @param route The route under /type/model/flatten for your function.
 * @param request The request body you are expecting and will return.
 * @param response The response body you are expecting and will return.
 */
function createMockApis(route: string, request: any, response: any): MockApi {
  const url = `/type/model/flatten/${route}`;
  return mockapi.put(url, (req) => {
    req.expect.bodyEquals(request);
    return {
      status: 200,
      body: json(response),
    };
  });
}

Scenarios.Type_Model_Flatten_putFlattenModel = passOnSuccess(
  createMockApis(
    "flattenModel",
    {
      name: "foo",
      properties: {
        description: "bar",
        age: 10,
      },
    },
    {
      name: "test",
      properties: {
        description: "test",
        age: 1,
      },
    },
  ),
);

Scenarios.Type_Model_Flatten_putNestedFlattenModel = passOnSuccess(
  createMockApis(
    "nestedFlattenModel",
    {
      name: "foo",
      properties: {
        summary: "bar",
        properties: {
          description: "test",
          age: 10,
        },
      },
    },
    {
      name: "test",
      properties: {
        summary: "test",
        properties: {
          description: "foo",
          age: 1,
        },
      },
    },
  ),
);
