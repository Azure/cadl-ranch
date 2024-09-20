import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("azure/core/scalar endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should get an Azure Location value", async () => {
    const endPoint = `${serverBasePath}/azure/core/scalar/azureLocation`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data, "eastus");
  });

  it("should put an Azure Location value", async () => {
    const endPoint = `${serverBasePath}/azure/core/scalar/azureLocation`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: "eastus",
        config: {
          headers: {
            "Content-Type": "text/plain",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should post an Azure Location value", async () => {
    const endPoint = `${serverBasePath}/azure/core/scalar/azureLocation`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: { location: "eastus" },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, { location: "eastus" });
  });

  it("should post an Azure Location value with header", async () => {
    const endPoint = `${serverBasePath}/azure/core/scalar/azureLocation/header`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        config: {
          headers: {
            region: "eastus",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should post an Azure Location with query", async () => {
    const endPoint = `${serverBasePath}/azure/core/scalar/azureLocation/query`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        config: {
          params: { region: "eastus" },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });
});
