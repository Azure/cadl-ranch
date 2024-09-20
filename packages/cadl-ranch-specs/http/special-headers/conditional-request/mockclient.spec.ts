import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("special-headers/conditional-request service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should validate the correct if-match header", async () => {
    const endPoint = `${serverBasePath}/special-headers/conditional-request/if-match`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        config: {
          headers: {
            "if-match": '"valid"',
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });

  it("should validate the correct if-none-match header", async () => {
    const endPoint = `${serverBasePath}/special-headers/conditional-request/if-none-match`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.post, {
      endPoint,
      options: {
        config: {
          headers: {
            "if-none-match": '"invalid"',
          },
        },
      },
    });
    assert.strictEqual(response.status, 204);
  });
});
