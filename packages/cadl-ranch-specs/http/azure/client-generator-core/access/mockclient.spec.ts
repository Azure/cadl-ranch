import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("azure/client-generator-core/access endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should get no decorator in public operation", async () => {
    const endPoint = `${serverBasePath}/azure/client-generator-core/access/publicOperation/noDecoratorInPublic`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: { name: "myname" },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, "myname");
  });

  it("should get public decorator in public operation", async () => {
    const endPoint = `${serverBasePath}/azure/client-generator-core/access/publicOperation/publicDecoratorInPublic`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: { name: "myname" },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, "myname");
  });

  it("should get no decorator in internal operation", async () => {
    const endPoint = `${serverBasePath}/azure/client-generator-core/access/internalOperation/noDecoratorInInternal`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: { name: "myname" },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, "myname");
  });

  it("should get internal decorator in internal operation", async () => {
    const endPoint = `${serverBasePath}/azure/client-generator-core/access/internalOperation/internalDecoratorInInternal`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: { name: "myname" },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, "myname");
  });

  it("should get public decorator in internal operation", async () => {
    const endPoint = `${serverBasePath}/azure/client-generator-core/access/internalOperation/publicDecoratorInInternal`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: { name: "myname" },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, "myname");
  });

  it("should get public shared model in operation", async () => {
    const endPoint = `${serverBasePath}/azure/client-generator-core/access/sharedModelInOperation/public`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: { name: "myname" },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, "myname");
  });

  it("should get internal shared model in operation", async () => {
    const endPoint = `${serverBasePath}/azure/client-generator-core/access/sharedModelInOperation/internal`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: { name: "myname" },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, "myname");
  });

  it("should get relative model in operation", async () => {
    const endPoint = `${serverBasePath}/azure/client-generator-core/access/relativeModelInOperation/operation`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: { name: "Madge", inner: { name: "Madge" } },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, "Madge");
    assert.strictEqual(response.data.inner.name, "Madge");
  });

  it("should get relative model in discriminator", async () => {
    const endPoint = `${serverBasePath}/azure/client-generator-core/access/relativeModelInOperation/discriminator`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          params: { name: "Madge", kind: "real" },
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.name, "Madge");
    assert.strictEqual(response.data.kind, "real");
  });
});
