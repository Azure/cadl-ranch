import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../helper.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("authentication/api-key service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should return 204 when the apiKey is valid", async () => {
    const endPoint = `${serverBasePath}/authentication/api-key/valid`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          headers: {
            "x-ms-api-key": "valid-key",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should return 403 when the apiKey is invalid", async () => {
    const endPoint = `${serverBasePath}/authentication/api-key/invalid`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          headers: {
            "x-ms-api-key": "valid-key",
          },
          validateStatus: function (status: number) {
            return (status >= 200 && status < 300) || status == 403;
          },
        },
      },
    });
    assert.strictEqual(response.status, 403);
    if (response.status === 403) {
      assert.strictEqual(response.data.error, "invalid-api-key");
    }
  });
});
