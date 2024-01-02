import { passOnSuccess, ScenarioMockApi, mockapi, json, MockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

function createMockApis(route: string, isUpdateRequest: boolean): MockApi {
  const url = `/json-merge-patch/${route}`;
  const expectedCreateBody = {
    name: "Madge",
    description: "desc",
    map: {
      key: {
        name: "InnerMadge",
        description: "innerDesc",
      },
    },
    array: [
      {
        name: "InnerMadge",
        description: "innerDesc",
      },
    ],
    intValue: 1,
    floatValue: 1.1,
  };
  const expectedUpdateBody = {
    name: "Madge",
    description: null,
    map: {
      key: {
        name: "InnerMadge",
        description: null,
      },
    },
    array: null,
    intValue: null,
    floatValue: null,
  };
  if (isUpdateRequest) {
    return mockapi.patch(url, (req) => {
      req.expect.deepEqual(req.body.description, expectedUpdateBody.description);
      req.expect.deepEqual(req.body.map, expectedUpdateBody.map);
      req.expect.deepEqual(req.body.array, expectedUpdateBody.array);
      req.expect.deepEqual(req.body.intValue, expectedUpdateBody.intValue);
      req.expect.deepEqual(req.body.floatValue, expectedUpdateBody.floatValue);
      return {
        status: 200,
        body: json(expectedUpdateBody),
      };
    });
  } else {
    return mockapi.put(url, (req) => {
      req.expect.coercedBodyEquals(expectedCreateBody);
      return {
        status: 200,
        body: json(expectedCreateBody),
      };
    });
  }
}

Scenarios.Payload_JsonMergePatch_createResource = passOnSuccess(createMockApis("create/resource", false));
Scenarios.Payload_JsonMergePatch_updateResource = passOnSuccess(createMockApis("update/resource", true));
Scenarios.Payload_JsonMergePatch_createOptionalResource = passOnSuccess(
  createMockApis("create/resource/optional", false),
);
Scenarios.Payload_JsonMergePatch_updateOptionalResource = passOnSuccess(
  createMockApis("update/resource/optional", true),
);
