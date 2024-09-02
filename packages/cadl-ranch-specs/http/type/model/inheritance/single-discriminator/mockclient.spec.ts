import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("type/model/inheritance/single-discriminator service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  const validBody = {
    wingspan: 1,
    kind: "sparrow",
  };
  const validRecursiveBody = {
    wingspan: 5,
    kind: "eagle",
    partner: {
      wingspan: 2,
      kind: "goose",
    },
    friends: [
      {
        wingspan: 2,
        kind: "seagull",
      },
    ],
    hate: {
      key3: {
        wingspan: 1,
        kind: "sparrow",
      },
    },
  };

  it("should get model with single discriminator", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/single-discriminator/model`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, validBody);
  });

  it("should put model with single discriminator", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/single-discriminator/model`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: validBody,
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get recursive model with single discriminator", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/single-discriminator/recursivemodel`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, validRecursiveBody);
  });

  it("should put recursive model with single discriminator", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/single-discriminator/recursivemodel`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: validRecursiveBody,
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get if missing discriminator", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/single-discriminator/missingdiscriminator`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, { wingspan: 1 } as any);
  });

  it("should get if wrong discriminator", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/single-discriminator/wrongdiscriminator`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, { wingspan: 1, kind: "wrongKind" } as any);
  });

  it("should get legacy model", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/single-discriminator/legacy-model`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, { size: 20, kind: "t-rex" });
  });
});
