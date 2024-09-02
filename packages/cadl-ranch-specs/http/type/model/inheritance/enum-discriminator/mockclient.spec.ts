import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("type/model/inheritance/enum-discriminator service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  const validBody = {
    weight: 10,
    kind: "golden",
  };

  const validFixedEnumBody = {
    length: 10,
    kind: "cobra",
  };

  it("should get extensible enum", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/enum-discriminator/extensible-enum`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, validBody);
  });

  it("should put extensible enum", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/enum-discriminator/extensible-enum`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: validBody,
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get extensible enum if missing discriminator", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/enum-discriminator/extensible-enum/missingdiscriminator`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, { weight: 10 } as any);
  });

  it("should get extensible enum if wrong discriminator", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/enum-discriminator/extensible-enum/wrongdiscriminator`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, { weight: 8, kind: "wrongKind" });
  });

  it("should get fixed enum", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/enum-discriminator/fixed-enum`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, validFixedEnumBody);
  });

  it("should put fixed enum", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/enum-discriminator/fixed-enum`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: validFixedEnumBody,
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get fixed enum if missing discriminator", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/enum-discriminator/fixed-enum/missingdiscriminator`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, { length: 10 } as any);
  });

  it("should get fixed enum if wrong discriminator", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/enum-discriminator/fixed-enum/wrongdiscriminator`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, { length: 8, kind: "wrongKind" });
  });
});
