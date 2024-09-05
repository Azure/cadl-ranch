import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("azure/resource-manager/models/common-types/managed-identity endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  const SUBSCRIPTION_ID_EXPECTED = "00000000-0000-0000-0000-000000000000";
  const PRINCIPAL_ID_EXPECTED = "00000000-0000-0000-0000-000000000000";
  const TENANT_ID_EXPECTED = "00000000-0000-0000-0000-000000000000";
  const CLIENT_ID_EXPECTED = "00000000-0000-0000-0000-000000000000";
  const LOCATION_REGION_EXPECTED = "eastus";
  const RESOURCE_GROUP_EXPECTED = "test-rg";
  const IDENTITY_TYPE_SYSTEM_ASSIGNED_EXPECTED = "SystemAssigned";
  const IDENTITY_TYPE_SYSTEM_USER_ASSIGNED_EXPECTED = "SystemAssigned,UserAssigned";
  const validSystemAssignedManagedIdentityResource = {
    id: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Azure.ResourceManager.Models.CommonTypes.ManagedIdentity/managedIdentityTrackedResources/identity`,
    location: `${LOCATION_REGION_EXPECTED}`,
    tags: {
      tagKey1: "tagValue1",
    },
    identity: {
      type: `${IDENTITY_TYPE_SYSTEM_ASSIGNED_EXPECTED}`,
      principalId: `${PRINCIPAL_ID_EXPECTED}`,
      tenantId: `${TENANT_ID_EXPECTED}`,
    },
    properties: {
      provisioningState: "Succeeded",
    },
  };

  const validUserAssignedAndSystemAssignedManagedIdentityResource = {
    id: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Azure.ResourceManager.Models.CommonTypes.ManagedIdentity/managedIdentityTrackedResources/identity`,
    location: `${LOCATION_REGION_EXPECTED}`,
    tags: {
      tagKey1: "tagValue1",
    },
    identity: {
      type: `${IDENTITY_TYPE_SYSTEM_USER_ASSIGNED_EXPECTED}`,
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1":
          {
            principalId: `${PRINCIPAL_ID_EXPECTED}`,
            clientId: `${CLIENT_ID_EXPECTED}`,
          },
      },
      principalId: `${PRINCIPAL_ID_EXPECTED}`,
      tenantId: `${TENANT_ID_EXPECTED}`,
    },
    properties: {
      provisioningState: "Succeeded",
    },
  };

  const createExpectedIdentity = {
    type: `${IDENTITY_TYPE_SYSTEM_ASSIGNED_EXPECTED}`,
  };

  const updateExpectedIdentity = {
    type: `${IDENTITY_TYPE_SYSTEM_USER_ASSIGNED_EXPECTED}`,
    userAssignedIdentities: {
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1":
        {},
    },
  };

  // managed identity tracked resource
  it("should get models commonTypes managedIdentityTrackedResources", async () => {
    const endPoint = `${serverBasePath}/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Azure.ResourceManager.Models.CommonTypes.ManagedIdentity/managedIdentityTrackedResources/identity`;
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
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, validSystemAssignedManagedIdentityResource);
  });

  it("should put models commonTypes managedIdentityTrackedResources", async () => {
    const endPoint = `${serverBasePath}/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Azure.ResourceManager.Models.CommonTypes.ManagedIdentity/managedIdentityTrackedResources/identity`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {
          identity: createExpectedIdentity,
          location: LOCATION_REGION_EXPECTED,
          tags: { tagKey1: "tagValue1" },
        },
        config: {
          params: {
            "api-version": "2023-12-01-preview",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, validSystemAssignedManagedIdentityResource);
  });

  it("should patch models commonTypes managedIdentityTrackedResources", async () => {
    const endPoint = `${serverBasePath}/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Azure.ResourceManager.Models.CommonTypes.ManagedIdentity/managedIdentityTrackedResources/identity`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.patch, {
      endPoint,
      options: {
        requestBody: {
          identity: updateExpectedIdentity,
          location: LOCATION_REGION_EXPECTED,
          tags: { tagKey1: "tagValue1" },
        },
        config: {
          params: {
            "api-version": "2023-12-01-preview",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, validUserAssignedAndSystemAssignedManagedIdentityResource);
  });
});
