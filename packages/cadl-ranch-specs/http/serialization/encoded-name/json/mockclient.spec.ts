import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("serialization/encoded-name/json service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should post json property", async () => {
    const endPoint = `${serverBasePath}/serialization/encoded-name/json/property`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: { wireName: true },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should get json property", async () => {
    const endPoint = `${serverBasePath}/serialization/encoded-name/json/property`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.wireName, true);
  });
});
