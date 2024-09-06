import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("encode/numeric endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("safeint testing", async () => {
    const endPoint = `${serverBasePath}/encode/numeric/property/safeint`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          value: "10000000000",
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, { value: "10000000000" });
  });

  it("uint32 testing", async () => {
    const endPoint = `${serverBasePath}/encode/numeric/property/uint32`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        requestBody: {
          value: "1",
        },
      },
    });
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.data, { value: "1" });
  });
});
