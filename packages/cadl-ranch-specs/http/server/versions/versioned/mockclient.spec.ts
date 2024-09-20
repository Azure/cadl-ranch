import { assert } from "chai";
import { describe } from "mocha";
import { makeServiceCall, SERVICE_CALL_TYPE } from "../../../helper-server-test.js";

import * as dotenv from "dotenv";
dotenv.config();

describe("server/versions/versioned service endpoint", () => {
  let serverBasePath: string | undefined;

  beforeEach(() => {
    serverBasePath = process.env["SERVER_BASE_PATH"];
  });

  it("should work with no param", async () => {
    const endPoint = `${serverBasePath}/server/versions/versioned/without-api-version`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.head, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
  });

  it("should work with param", async () => {
    const endPoint = `${serverBasePath}/server/versions/versioned/with-query-api-version`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.head, {
      endPoint,
      options: {
        config: {
          params: {
            "api-version": "2022-12-01-preview",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });

  it("should work with path param", async () => {
    const endPoint = `${serverBasePath}/server/versions/versioned/with-path-api-version/2022-12-01-preview`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.head, {
      endPoint,
    });
    assert.strictEqual(response.status, 200);
  });

  it("should work with old param", async () => {
    const endPoint = `${serverBasePath}/server/versions/versioned/with-query-old-api-version`;
    const response = await makeServiceCall(SERVICE_CALL_TYPE.head, {
      endPoint,
      options: {
        config: {
          params: {
            "api-version": "2021-01-01-preview",
          },
        },
      },
    });
    assert.strictEqual(response.status, 200);
  });
});
