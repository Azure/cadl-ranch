import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("server/versions/not-versioned service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should work with no param", async () => {
    const endPoint = `${serverBasePath}/server/versions/not-versioned/without-api-version`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.head, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
  });

  it("should work with param", async () => {
    const endPoint = `${serverBasePath}/server/versions/not-versioned/with-query-api-version`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.head, {
      endPoint,
      options: {
        config: {
          params: {
            "api-version": "v1.0",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should work with path param", async () => {
    const endPoint = `${serverBasePath}/server/versions/not-versioned/with-path-api-version/v1.0`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.head, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
  });
});
