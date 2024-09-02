import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("type/model/inheritance/not-discriminated service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  const validBody = { name: "abc", age: 32, smart: true };
  it("should get valid", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/not-discriminated/valid`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, validBody);
  });

  it("should put valid", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/not-discriminated/valid`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.put, {
      endPoint,
      options: {
        requestBody: validBody,
      },
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, validBody);
  });

  it("should post valid", async () => {
    const endPoint = `${serverBasePath}/type/model/inheritance/not-discriminated/valid`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: validBody,
      },
    });
    assert.strictEqual(response.status, 204);
  });
});
