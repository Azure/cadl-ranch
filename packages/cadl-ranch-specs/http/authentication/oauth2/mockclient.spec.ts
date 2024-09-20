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

  it("valid grant", async () => {
    const endPoint = `${serverBasePath}/authentication/oauth2/valid`;
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

  it("invalid grant", async () => {
    const endPoint = `${serverBasePath}/authentication/oauth2/invalid`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.get, {
      endPoint,
      options: {
        config: {
          validateStatus: (status) => status === 403,
        },
      },
    });
    assert.strictEqual(response.status, 403);
    assert.deepEqual(response.data, { error: "invalid-grant" });
  });
});
