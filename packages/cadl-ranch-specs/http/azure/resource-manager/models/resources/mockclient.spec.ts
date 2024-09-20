import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("azure/resource-manager/models/resources endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  const SUBSCRIPTION_ID_EXPECTED = "00000000-0000-0000-0000-000000000000";
  const RESOURCE_GROUP_EXPECTED = "test-rg";
  const validTopLevelResource = {
    id: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top`,
    name: "top",
    type: "Azure.ResourceManager.Models.Resources/topLevelTrackedResources",
    location: "eastus",
    properties: {
      provisioningState: "Succeeded",
      description: "valid",
    },
    systemData: {
      createdBy: "AzureSDK",
      createdByType: "User",
      createdAt: new Date(),
      lastModifiedBy: "AzureSDK",
      lastModifiedAt: new Date(),
      lastModifiedByType: "User",
    },
  };

  const validNestedResource = {
    id: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top/nestedProxyResources/nested`,
    name: "nested",
    type: "Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top/nestedProxyResources",
    properties: {
      provisioningState: "Succeeded",
      description: "valid",
    },
    systemData: {
      createdBy: "AzureSDK",
      createdByType: "User",
      createdAt: new Date(),
      lastModifiedBy: "AzureSDK",
      lastModifiedAt: new Date(),
      lastModifiedByType: "User",
    },
  };

  it("should get top level tracked resources", async () => {
    const endPoint = `${serverBasePath}/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            "api-version": "2023-12-01-preview",
          },
        },
      },
    });
    const body = JSON.parse(JSON.stringify(response.data));
    assert.strictEqual(response.status, 200);
    assert.strictEqual(body.id, validTopLevelResource.id);
    assert.strictEqual(body.name, validTopLevelResource.name);
    assert.strictEqual(body.type, validTopLevelResource.type);
  });

  it("should create or replace top level tracked resources", async () => {
    const endPoint = `${serverBasePath}/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        config: {
          params: {
            "api-version": "2023-12-01-preview",
          },
        },
        requestBody: {
          location: "eastus",
          properties: {
            description: "valid",
          },
        },
      },
    });

    const body = JSON.parse(JSON.stringify(response.data));
    assert.strictEqual(response.status, 200);
    assert.strictEqual(body.id, validTopLevelResource.id);
    assert.strictEqual(body.name, validTopLevelResource.name);
    assert.strictEqual(body.type, validTopLevelResource.type);
    assert.strictEqual(body.location, validTopLevelResource.location);
    assert.strictEqual(body.properties?.description, validTopLevelResource.properties?.description);
  });

  it("should update top level tracked resources", async () => {
    const endPoint = `${serverBasePath}/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.patch, {
      endPoint,
      options: {
        config: {
          params: {
            "api-version": "2023-12-01-preview",
          },
        },
        requestBody: {
          location: "eastus",
          properties: {
            description: "valid2",
          },
        },
      },
    });

    const body = JSON.parse(JSON.stringify(response.data));
    assert.strictEqual(response.status, 200);
    assert.strictEqual(body.id, validTopLevelResource.id);
    assert.strictEqual(body.name, validTopLevelResource.name);
    assert.strictEqual(body.type, validTopLevelResource.type);
    assert.strictEqual(body.location, validTopLevelResource.location);
    assert.strictEqual(body.properties?.description, "valid2");
  });

  it("should delete top level tracked resources", async () => {
    const endPoint = `${serverBasePath}/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.delete, {
      endPoint,
      options: {
        config: {
          params: {
            "api-version": "2023-12-01-preview",
          },
        },
        requestBody: {
          properties: {
            description: "valid2",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should list top level tracked resources by resourceGroup ", async () => {
    const endPoint = `${serverBasePath}/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            "api-version": "2023-12-01-preview",
          },
        },
      },
    });
    const body = JSON.parse(JSON.stringify(response.data));
    assert.strictEqual(response.status, 200);
    assert.strictEqual(body.value[0].id, validTopLevelResource.id);
    assert.strictEqual(body.value[0].name, validTopLevelResource.name);
    assert.strictEqual(body.value[0].type, validTopLevelResource.type);
    assert.strictEqual(body.value[0].location, validTopLevelResource.location);
  });

  it("should list top level tracked resources by subscription ", async () => {
    const endPoint = `${serverBasePath}/subscriptions/00000000-0000-0000-0000-000000000000/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            "api-version": "2023-12-01-preview",
          },
        },
      },
    });
    const body = JSON.parse(JSON.stringify(response.data));
    assert.strictEqual(response.status, 200);
    assert.strictEqual(body.value[0].id, validTopLevelResource.id);
    assert.strictEqual(body.value[0].name, validTopLevelResource.name);
    assert.strictEqual(body.value[0].type, validTopLevelResource.type);
    assert.strictEqual(body.value[0].location, validTopLevelResource.location);
  });

  // nested proxy resource
  it("should get nested proxy resource", async () => {
    const endPoint = `${serverBasePath}/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top/nestedProxyResources/nested`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            "api-version": "2023-12-01-preview",
          },
        },
      },
    });
    const body = JSON.parse(JSON.stringify(response.data));
    assert.strictEqual(response.status, 200);
    assert.strictEqual(body.id, validNestedResource.id);
    assert.strictEqual(body.name, validNestedResource.name);
    assert.strictEqual(body.type, validNestedResource.type);
  });

  it("should create or replace nested proxy resource", async () => {
    const endPoint = `${serverBasePath}/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top/nestedProxyResources/nested`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          properties: {
            description: "valid",
          },
        },
        config: {
          params: {
            "api-version": "2023-12-01-preview",
          },
        },
      },
    });
    const body = JSON.parse(JSON.stringify(response.data));
    assert.strictEqual(response.status, 200);
    assert.strictEqual(body.id, validNestedResource.id);
    assert.strictEqual(body.name, validNestedResource.name);
    assert.strictEqual(body.type, validNestedResource.type);
    assert.strictEqual(body.properties?.description, validNestedResource.properties?.description);
  });

  it("should update nested proxy resource", async () => {
    const endPoint = `${serverBasePath}/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top/nestedProxyResources/nested`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.patch, {
      endPoint,
      options: {
        requestBody: {
          properties: {
            description: "valid2",
          },
        },
        config: {
          params: {
            "api-version": "2023-12-01-preview",
          },
        },
      },
    });
    const body = JSON.parse(JSON.stringify(response.data));
    assert.strictEqual(response.status, 200);
    assert.strictEqual(body.id, validNestedResource.id);
    assert.strictEqual(body.name, validNestedResource.name);
    assert.strictEqual(body.type, validNestedResource.type);
    assert.strictEqual(body.properties?.description, "valid2");
  });

  it("should delete nested proxy resource", async () => {
    const endPoint = `${serverBasePath}/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top/nestedProxyResources/nested`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.delete, {
      endPoint,
      options: {
        config: {
          params: {
            "api-version": "2023-12-01-preview",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should list nested proxy resource by TopLevelTrackedResource ", async () => {
    const endPoint = `${serverBasePath}/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top/nestedProxyResources`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: {
            "api-version": "2023-12-01-preview",
          },
        },
      },
    });
    const body = JSON.parse(JSON.stringify(response.data));
    assert.strictEqual(response.status, 200);
    assert.strictEqual(body.value[0].id, validNestedResource.id);
    assert.strictEqual(body.value[0].name, validNestedResource.name);
    assert.strictEqual(body.value[0].type, validNestedResource.type);
  });
});
