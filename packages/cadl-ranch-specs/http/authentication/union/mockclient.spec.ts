import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("authentication/union endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("valid key", async () => {
    const endPoint = `${serverBasePath}/authentication/union/validkey`;
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

  it("valid token", async () => {
    const endPoint = `${serverBasePath}/authentication/union/validtoken`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          headers: {
            authorization: "Bearer https://security.microsoft.com/.default",
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });
});
