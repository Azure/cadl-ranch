import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("client/naming service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should work with property client", async () => {
    const endPoint = `${serverBasePath}/client/naming/property/client`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: { defaultName: true },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should work with property language", async () => {
    const endPoint = `${serverBasePath}/client/naming/property/language`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: { defaultName: true },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should work with property compatible-with-encoded-name", async () => {
    const endPoint = `${serverBasePath}/client/naming/property/compatible-with-encoded-name`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: { wireName: true },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should work with operation", async () => {
    const endPoint = `${serverBasePath}/client/naming/operation`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
    });
    assert.strictEqual(response.status, 204);
  });

  it("should work with parameter", async () => {
    const endPoint = `${serverBasePath}/client/naming/parameter`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        config: {
          params: { defaultName: "true" },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should post header request ", async () => {
    const endPoint = `${serverBasePath}/client/naming/header`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        config: {
          headers: { "default-name": "true" },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get header response", async () => {
    const endPoint = `${serverBasePath}/client/naming/header`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 204);
  });

  it("should work with model client", async () => {
    const endPoint = `${serverBasePath}/client/naming/model/client`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: { defaultName: true },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should work with model language", async () => {
    const endPoint = `${serverBasePath}/client/naming/model/language`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: { defaultName: true },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should work with union enum name", async () => {
    const endPoint = `${serverBasePath}/client/naming/union-enum/union-enum-name`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: "value1",
        config: {
          headers: {
            "Content-Type": "text/plain",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should work with union enum member name", async () => {
    const endPoint = `${serverBasePath}/client/naming/union-enum/union-enum-member-name`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: "value1",
        config: {
          headers: {
            "Content-Type": "text/plain",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });
});
