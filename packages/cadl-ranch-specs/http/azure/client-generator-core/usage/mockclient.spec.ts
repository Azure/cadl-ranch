import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("azure/client-generator-core/usage endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should post input usage model in operation", async () => {
    const endPoint = `${serverBasePath}/azure/client-generator-core/usage/inputToInputOutput`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: { name: "Madge" },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get usage model in operation", async () => {
    const endPoint = `${serverBasePath}/azure/client-generator-core/usage/outputToInputOutput`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, "Madge");
  });

  it("should put usage model in operation", async () => {
    const endPoint = `${serverBasePath}/azure/client-generator-core/usage/modelInReadOnlyProperty`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: {},
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.result.name, "Madge");
  });
});
